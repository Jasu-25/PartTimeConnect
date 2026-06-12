import { useContext, useEffect, useState } from "react";
import { SeekerHeader } from "./SeekerHeader"
import './SeekerSearch.css'
import './SeekerDashboard.css'
import axios from "axios";
import { Requireddata } from "../../main";
import LoadJobs from "./Components/LoadJobs";
export const SeekerSearch = () => {
    const { seekerData: Seekerdata, refreshSeeker: setSeeker } = useContext(Requireddata);
    let [Jobs, setJobs] = useState([]);
    let [SavedJobs, setSavedJobs] = useState([]);
    let [knownLocations, setKnownLocations] = useState([]);
    let [locationInput, setLocationInput] = useState('');
    async function fetchData() {
        let jobsdata = await axios.get('PartTimeConnect-Backend/get-jobs.php');
        setJobs(jobsdata.data);
        let saveddata = await axios.get('PartTimeConnect-Backend/getsaveddata.php', {
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
            <div className="seekersearch-body">
                <SeekerHeader />

                <main className="seekersearch-container">
                    <div className="seekersearch-sub-search-wrapper">
                        <div className="seekersearch-sub-search-box">
                            <input type="text" className="seekersearch-sub-input" placeholder="Search for your saved jobs..." onChange={(e) => (setLocationInput(e.target.value))} />
                            <button className="seekersearch-sub-btn"><i className="fas fa-search"></i> Search</button>
                        </div>
                    </div>

                    <section className="seekersearch-hero">
                        <h2 className="seekersearch-hero-title">JOBS FOR YOU</h2>
                        <p className="seekersearch-hero-subtitle">Take a look at the jobs in your location</p>
                    </section>

                    <div className="seekersearch-job-grid">
                        {Jobs.map((job) => {
                            if (
                                Seekerdata?.location &&
                                job?.job_location &&
                                job?.job_status === 'open' &&
                                job.job_location.toLowerCase().includes((locationInput.toLowerCase() !== '' ? locationInput.toLowerCase() : Seekerdata.location.toLowerCase())) &&
                                isLocationAvailable(Seekerdata.location)
                            ) {
                                let savesatus = issaved(job.jobs_id);
                                return (
                                    <LoadJobs key={job.job_id} job={job} savedstate={savesatus} />
                                )
                            }
                        })}

                    </div>
                </main>
            </div>
        );
    }
}
