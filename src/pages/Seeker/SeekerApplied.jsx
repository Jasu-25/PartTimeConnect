import { SeekerHeader } from './SeekerHeader'
import axios from 'axios';
import { LoadAppliedjobs } from './Components/LoadAppliedjobs';
import { useContext, useEffect, useState } from 'react';
import { Requireddata } from '../../main';
import './SeekerApplied.css'
import { useNavigate } from 'react-router';
export function SeekerApplied() {

    const { seekerData: Seekerdata, refreshSeeker: setSeeker } = useContext(Requireddata);
    const applliedJobsNavigation = useNavigate();


    async function FetchRequiredData() {

        let saveddata = await axios.get('PartTimeConnect-Backend/getsaveddata.php', {
            withCredentials: true
        });
        setSavedJobs(saveddata.data);
        let result = await axios.get('/PartTimeConnect-Backend/getappliedjob.php', {
            withCredentials: true
        });
        setAppliedJobs(result.data);
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

    let [SavedJobs, setSavedJobs] = useState([]);
    let [AplliedJobs, setAppliedJobs] = useState([]);

    useEffect(() => {
        FetchRequiredData();
    }, [])


    if (!Seekerdata) {
        setSeeker();
    }
    else {
        return (
            <>
                <SeekerHeader />

                <main className="seekerapplied-container">
                    <section className="seekerapplied-hero">
                        <h1 className="seekerapplied-title">Welcome back! <span className='Name-SpanTag'>{Seekerdata?.name}</span> </h1>
                        <p className="seekerapplied-subtitle">You've been making moves! Check out where you've already applied and
                            what's next.</p>
                    </section>

                    <div className="seekerapplied-job-grid">
                        {AplliedJobs.length !== 0 ? AplliedJobs.map((job) => {

                            return <LoadAppliedjobs key={job.id} job={job} savedSatuts={issaved(job.jobs_id)} />
                        }) :

                            <div class="Noapplication-container">
                                <div class="Noapplication-box">
                                    <div class="Noapplication-icon-wrapper">
                                        <i class="fas fa-file-alt Noapplication-icon"></i>
                                    </div>

                                    <h3 class="Noapplication-title">no application found</h3>

                                    <button class="Noapplication-action-btn" id="Noapplication-action-button" onClick={()=>(applliedJobsNavigation('/seekersearch'))}>
                                        <i class="fas fa-briefcase Noapplication-btn-icon"></i>
                                        <span>apply job</span>
                                    </button>
                                </div>
                            </div>
                        }

                    </div>
                </main>
            </>
        )
    }
}