import axios from 'axios';
import LoadJobs from './Components/LoadJobs';
import { SeekerHeader } from './SeekerHeader'
import { useContext, useEffect, useState } from 'react';
import { Requireddata } from '../../main';
import './SeekerSaved.css'
import './SeekerDashboard.css'
export function SeekerSaved() {
    const { seekerData: Seekerdata, refreshSeeker: setSeeker } = useContext(Requireddata);
    let [Jobs, setJobs] = useState([]);
    let [SavedJobs, setSavedJobs] = useState([]);
    let [knownLocations, setKnownLocations] = useState([]);
    async function fetchData() {
        let jobsdata = await axios.get('backend/get-jobs.php');
        setJobs(jobsdata.data);
        let saveddata = await axios.get('backend/getsaveddata.php', {
            withCredentials: true
        });
        setSavedJobs(saveddata.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        storeloactions();
    }, [Jobs]);

    function issaved(id) {
        let savedjobids = false;
        SavedJobs.forEach((data) => {
            if (data.job_id === id) {
                savedjobids = true;
            }
        })
        if (savedjobids) {
            return true;
        }
        else {
            return false;
        }

    }

    function storeloactions() {
        let settedlocation = new Set();
        Jobs.forEach((data) => {
            let state = `${data.job_location}`.toLowerCase();
            settedlocation.add(state);
        });
        settedlocation = Array.from(settedlocation);
        setKnownLocations(settedlocation);
    }
    function isLocationAvailable(locationInput) {
        const input = locationInput.toLowerCase();

        return knownLocations.some(loc => {
            const parts = loc.toLowerCase().split(',').map(p => p.trim());
            return parts.includes(input);
        });
    }
    if (!Seekerdata) {
        setSeeker();
    }
    else {
        return (
            <div className="seekersaved-body">

                <SeekerHeader />
                <main className="seekersaved-container">
                    <section className="seekersaved-hero">
                        <h1 className="seekersaved-welcome-title">Welcome back!</h1>
                        <p className="seekersaved-welcome-subtitle">Take a look at the jobs you've saved — they're still waiting for you!</p>
                    </section>

                    <div className="seekersaved-job-grid">
                        {Jobs.map((job) => {
                            if (
                                issaved(job.jobs_id) && Seekerdata?.location &&
                                job?.job_location &&
                                job.job_location.toLowerCase().includes(Seekerdata.location.toLowerCase()) &&
                                isLocationAvailable(Seekerdata.location)
                            ) {
                                let savesatus = issaved(job.jobs_id);
                                return (
                                    <LoadJobs key={job.job_id} job={job} savedstate={savesatus} setSavedJobs={fetchData} />
                                )
                            }
                        })}
                    </div>
                </main>
            </div>
        );
    }
}