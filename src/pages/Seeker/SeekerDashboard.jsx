import { useContext, useEffect, useState } from "react";
import { SeekerHeader } from "./SeekerHeader";
import { Requireddata } from "../../main";
import axios from "axios";
import LoadJobs from "./Components/LoadJobs";
import { Uiloader } from "../landingpage/Ui-loader";

export function SeekerDashboard() {

    const { seekerData: Seekerdata, refreshSeeker: setSeeker } = useContext(Requireddata);
    let [Jobs, setJobs] = useState([]);
    let [SavedJobs, setSavedJobs] = useState([]);
    let [knownLocations, setKnownLocations] = useState([]);
    let [RequiredData, setRequiredData] = useState({ applications_count: 0, saved_count: 0 });
    let [loading, setloading] = useState(false);
    async function fetchData() {
        setloading(true);
        if (!Seekerdata) {
            setSeeker();
        }
        let jobsdata = await axios.get('backend/get-jobs.php', {
            withCredentials: true
        });
        setJobs(jobsdata.data);
        let saveddata = await axios.get('backend/getsaveddata.php', {
            withCredentials: true
        });
        setSavedJobs(saveddata.data);
        setloading(false)
    }

    async function GetRequireddata() {
        let result = await axios.get('backend/get-s-requireddata.php', {
            withCredentials: true
        });
        setRequiredData({
            applications_count: result.data.applications_count,
            saved_count: result.data.saved_jobs_count
        });
        console.log(RequiredData);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        storeloactions();
    }, [Jobs]);

    useEffect(() => {
        GetRequireddata();
    }, [SavedJobs]);

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

    return (
        <>
            {loading ? <Uiloader /> :
                <div div className="seekerdashboard-body" >

                    <SeekerHeader />
                    <main className="seekerdashboard-container">
                        <section className="seekerdashboard-welcome-section">
                            <div className="seekerdashboard-welcome-text">
                                <h1 className="seekerdashboard-title">Welcome back, {Seekerdata ? Seekerdata.name : "Guest"}</h1>
                                <p className="seekerdashboard-subtitle">Find your perfect part-time opportunity in {Seekerdata ? Seekerdata.location : "your location"}
                                </p>
                            </div>
                            <div className="seekerdashboard-stats-group">
                                <div className="seekerdashboard-stat-card">
                                    <div className="seekerdashboard-stat-icon blue">
                                        <i className="fas fa-paper-plane"></i>
                                    </div>
                                    <div className="seekerdashboard-stat-info">
                                        <span className="seekerdashboard-stat-number">{RequiredData.applications_count}</span>
                                        <span className="seekerdashboard-stat-label">Applications</span>
                                    </div>
                                </div>
                                <div className="seekerdashboard-stat-card">
                                    <div className="seekerdashboard-stat-icon heart-red">
                                        <i className="fas fa-heart"></i>
                                    </div>
                                    <div className="seekerdashboard-stat-info">
                                        <span className="seekerdashboard-stat-number">{RequiredData.saved_count}</span>
                                        <span className="seekerdashboard-stat-label">Saved jobs</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <h2 className="seekerdashboard-section-heading">Recommended Jobs for You</h2>

                        <div className="seekerdashboard-job-grid">

                            {Jobs.map((job) => {
                                if (
                                    Seekerdata?.location &&
                                    job?.job_location &&
                                    job?.job_status === 'open' &&
                                    job.job_location.toLowerCase().includes(Seekerdata.location.toLowerCase()) &&
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
            }
        </>

    )


}