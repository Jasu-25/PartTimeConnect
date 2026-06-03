import { SeekerHeader } from './SeekerHeader'
import axios from 'axios';
import { LoadAppliedjobs } from './Components/LoadAppliedjobs';
import { useContext, useEffect, useState } from 'react';
import { Requireddata } from '../../main';
import './SeekerApplied.css'
export function SeekerApplied() {

    const { seekerData: Seekerdata, refreshSeeker: setSeeker } = useContext(Requireddata);


    async function FetchRequiredData() {

        let saveddata = await axios.get('backend/getsaveddata.php', {
            withCredentials: true
        });
        setSavedJobs(saveddata.data);
        let result = await axios.get('/backend/getappliedjob.php', {
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

    console.log(AplliedJobs);

    if (!Seekerdata) {
        setSeeker();
    }
    else {
        return (
            <>
                <SeekerHeader />

                <main className="seekerapplied-container">
                    <section className="seekerapplied-hero">
                        <h1 className="seekerapplied-title">Welcome back!</h1>
                        <p className="seekerapplied-subtitle">You've been making moves! Check out where you've already applied and
                            what's next.</p>
                    </section>

                    <div className="seekerapplied-job-grid">
                        {AplliedJobs.map((job) => {

                            return <LoadAppliedjobs key={job.id} job={job} savedSatuts={issaved(job.jobs_id)} />
                        })}

                    </div>
                </main>
            </>
        )
    }
}