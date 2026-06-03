import { useEffect, useState } from "react";
import { getInitials } from "../../../Utils/seekerutils";
import axios from "axios";
import { useNavigate } from "react-router";

export default function LoadJobs({ job, savedstate, setSavedJobs }) {

    let [isSaved, setIsSaved] = useState(savedstate);
    let applynow = useNavigate();
    useEffect(() => {
        setIsSaved(savedstate);
    }, [savedstate]);
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
            await setSavedJobs();
        }
    }

    function handleapplynow(event) {
        console.log(event.currentTarget.dataset.jobid);
        applynow(`/seekerapplieddetails/${event.currentTarget.dataset.jobid}`);
    }


    return (
        <>
            <div className="seekerdashboard-job-card">
                <div className="seekerdashboard-card-top">
                    <div className="seekerdashboard-company-logo">{getInitials(job.company_name)}</div>
                    <button className="seekerdashboard-favorite-btn" onClick={handleSaveJob}>{isSaved === true ? <i className="fa-solid fa-heart"></i> : <i className="far fa-heart"></i>}</button>
                </div>
                <h3 className="seekerdashboard-job-name">{job.job_title ? job.job_title : ""}</h3>
                <p className="seekerdashboard-company-name">{job.company_name ? job.company_name : ""}</p>
                <div className="seekerdashboard-meta-tags">
                    <span><i className="fas fa-map-marker-alt"></i> {job.job_location ? job.job_location : ""}</span>
                    <span className="seekerdashboard-tag-outline">{job.job_type ? job.job_type : ""}</span>
                </div>
                <div className="seekerdashboard-details-row">
                    <span className="seekerdashboard-price">₹ {job.job_salary ? job.job_salary : "0"}/{job.job_salary_time ? job.job_salary_time : ""}</span>
                    <span className="seekerdashboard-hours"><i className="far fa-clock"></i> {job.workload ? job.workload : "0"} hours/{job.workperiod ? job.workperiod : ""}</span>
                </div>
                <p className="seekerdashboard-job-description">{job.job_description ? job.job_description : ""}</p>
                <div className="seekerdashboard-card-footer">
                    <span className="seekerdashboard-post-date">Posted on {job.job_posted ? job.job_posted : ""}</span>
                    <button className="seekerdashboard-apply-btn" data-jobid={job.jobs_id} onClick={handleapplynow} >Apply Now</button>
                </div>
            </div>
        </>
    )
}
