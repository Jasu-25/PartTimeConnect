import axios from 'axios';
import LoadJobs from './Components/LoadJobs';
import { SeekerHeader } from './SeekerHeader'
import { useContext, useEffect, useState } from 'react';
import { Requireddata } from '../../main';
import './SeekerSaved.css'
import './SeekerDashboard.css'
import { useNavigate } from 'react-router';
export function SeekerSaved() {
    const { seekerData: Seekerdata, refreshSeeker: setSeeker } = useContext(Requireddata);
    let [Jobs, setJobs] = useState([]);
    let [SavedJobs, setSavedJobs] = useState([]);
    let [knownLocations, setKnownLocations] = useState([]);
    let [isSavedJobsDisplayed, setIsSavedJobsDisplayed] = useState(false);
    let savedJobsNavigatiopon = useNavigate();
    async function fetchData() {
        let jobsdata = await axios.get('PartTimeConnect-Backend/get-jobs.php');
        setJobs(jobsdata.data);
        let saveddata = await axios.get('PartTimeConnect-Backend/getsaveddata.php', {
            withCredentials: true
        });
        setSavedJobs(saveddata.data);
    }

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

    function isSavedJobsAvaiable() {
        let savedArray = [];
        savedArray = Jobs.filter((job) => {
            if (
                issaved(job.jobs_id) && Seekerdata?.location &&
                job?.job_location &&
                job.job_location.toLowerCase().includes(Seekerdata.location.toLowerCase()) &&
                isLocationAvailable(Seekerdata.location)
            ) {
                return job
            }
        })

        if (savedArray.length !== 0) {
            setIsSavedJobsDisplayed(true)
        }

    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        storeloactions();
        isSavedJobsAvaiable();
    }, [Jobs]);

    if (!Seekerdata) {
        setSeeker();
    }
    else {
        return (
            <div className="seekersaved-body">

                <SeekerHeader />
                <main className="seekersaved-container">
                    <section className="seekersaved-hero">
                        <h1 className="seekersaved-welcome-title">Welcome back! <span className='Name-SpanTag'>{Seekerdata?.name}</span></h1>
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

                        {
                            !isSavedJobsDisplayed ?
                                <div class="Noapplication-container">
                                    <div class="Noapplication-box">
                                        <div class="Noapplication-icon-wrapper">
                                            <i class="fas fa-bookmark Noapplication-icon"></i>
                                        </div>

                                        <h3 class="Noapplication-title">no Saved Jobs found</h3>

                                        <button class="Noapplication-action-btn" id="Noapplication-save-button" onClick={()=>(savedJobsNavigatiopon('/seekersearch'))} >
                                            <i class="fas fa-heart Noapplication-btn-icon"></i>
                                            <span>save a job</span>
                                        </button>
                                    </div>
                                </div> : ''
                        }
                    </div>
                </main>
            </div>
        );
    }
}