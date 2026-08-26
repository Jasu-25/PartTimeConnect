import { useContext, useEffect, useRef, useState } from "react";
import { SeekerHeader } from "./SeekerHeader"
import './SeekerSearch.css'
import './SeekerDashboard.css'
import axios from "axios";
import { Requireddata } from "../../main";
import LoadJobs from "./Components/LoadJobs";
export const SeekerSearch = () => {
    const { seekerData: Seekerdata, refreshSeeker: setSeeker } = useContext(Requireddata);
    const searchInputRef = useRef(null);
    let [Jobs, setJobs] = useState([]);
    let [SavedJobs, setSavedJobs] = useState([]);
    let [knownLocations, setKnownLocations] = useState([]);
    let [locationInput, setLocationInput] = useState('');
    let [isSearchDisplayed, setIsSearchDisplayed] = useState(true);
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

    function isSearchJobsAvaiable() {
        let searchArray = [];
        searchArray = Jobs.filter((job) => {
            if (
                Seekerdata?.location &&
                job?.job_location &&
                job?.job_status === 'open' &&
                job.job_location.toLowerCase().includes((locationInput.toLowerCase() !== '' ? locationInput.toLowerCase() : Seekerdata.location.toLowerCase())) &&
                isLocationAvailable(Seekerdata.location)
            ) {
                return job
            }
        })
        if (searchArray.length !== 0) {
            setIsSearchDisplayed(true)
        }
        else{
            setIsSearchDisplayed(false)
        }
    }


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        storeloactions();
        isSearchJobsAvaiable();
    }, [Jobs]);

    useEffect(() => {
        isSearchJobsAvaiable();
    }, [locationInput])


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
                            <input ref={searchInputRef} type="text" className="seekersearch-sub-input" placeholder="Search for Jobs in Your Location..." onChange={(e) => (setLocationInput(e.target.value))}/>
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

                        {!isSearchDisplayed ?
                            <div class="Nolocation-container">
                                <div class="Nolocation-box">
                                    <div class="Nolocation-icon-wrapper">
                                        <i class="fas fa-map-marker-alt Nolocation-icon"></i>
                                    </div>

                                    <h3 class="Nolocation-title">no jobs found in your location</h3>

                                    <button class="Nolocation-action-btn" id="Nolocation-action-button" onClick={() => searchInputRef.current?.focus()}>
                                        <i class="fas fa-search-location Nolocation-btn-icon"></i>
                                        <span>try another location</span>
                                    </button>
                                </div>
                            </div> : ''}

                    </div>
                </main>
            </div>
        );
    }
}
