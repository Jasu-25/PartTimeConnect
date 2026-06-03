import axios from "axios";
import { useEffect, useState } from "react";
import { getInitials } from "../../../Utils/seekerutils";

export function LoadAppliedjobs({ job, savedSatuts }) {

    let [isSaved, setIsSaved] = useState(savedSatuts);
    useEffect(() => {
        setIsSaved(savedSatuts);
    }, [savedSatuts]);
    async function handleSaveJob() {

        console.log(job);

        let result = await axios.post('/backend/add_savedjob.php',
            {
                id: job.jobs_id,
                title: job.job_title,
                state: (!isSaved) ? 'save' : 'unsave'
            },
            {
                withCredentials: true
            }
        );
        let data = result.data;
        if (data.status === 'success') {
            setIsSaved(!isSaved);
        }
    }
    return (
        <>
            <div className="seekerapplied-job-card">
                <div className="seekerapplied-card-top">
                    <div className="seekerapplied-company-logo">{getInitials(job.company_name)}</div>
                    <button className="seekerdashboard-favorite-btn" onClick={handleSaveJob}>{isSaved === true ? <i className="fa-solid fa-heart"></i> : <i className="far fa-heart"></i>}</button>
                </div>
                <h3 className="seekerapplied-job-name">{job.job_title}</h3>
                <p className="seekerapplied-company-name">{job.company_name}</p>

                <div className="seekerapplied-meta-tags">
                    <span><i className="fas fa-map-marker-alt"></i> {job.job_location} </span>
                    <span className="seekerapplied-tag-outline"> {job.job_type} </span>
                </div>

                <div className="seekerapplied-details-column">
                    <div className="seekerapplied-detail-item">
                        <i className="fas fa-indian-rupee-sign"></i> <span>{job.job_salary}/{job.job_salary_time}</span>
                    </div>
                    <div className="seekerapplied-detail-item">
                        <i className="far fa-clock"></i> <span>{job.workload}/{job.workperiod}</span>
                    </div>
                </div>

                <div className="seekerapplied-status-row">
                    <i className="fas fa-check-circle seekerapplied-success-icon"></i>
                    <span className="seekerapplied-status-text">Applied Successfully</span>
                </div>

                <p className="seekerapplied-applied-date">Applied on {job.applied_date}</p>
                <button className="seekerapplied-view-more-btn" onClick={() => window.location.href = `/seekerapplieddetails/${job.jobs_id}`}>View More</button>
            </div>
        </>
    )
}
