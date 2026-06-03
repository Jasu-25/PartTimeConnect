import { useEffect, useState } from 'react';
import { ProviderHeader } from './ProviderHeader'
import './ProviderPostings.css'
import axios from 'axios';

export function ProviderPostings() {

    let [PostedJobs, setPostedJobs] = useState([]);

    async function fetchPostedJobs() {
        try {
            const response = await axios.get('/backend/getprovider-jobs.php', {
                withCredentials: true
            });
            console.log(response.data);
            setPostedJobs(response.data);
        } catch (error) {
            console.error('Error fetching posted jobs:', error);
        }
    }


    useEffect(() => {
        fetchPostedJobs();
    }, [])

    return (
        <div className="providerpostings">

            <ProviderHeader />

            <div className="page-container">

                <div className="page-header-container">
                    <div className="job-heading">
                        <h2>My Job Postings</h2>
                        <p className="subtext-description">Manager your active and past job postings.</p>
                    </div>
                    <div className="post-job-btn-wrapper">
                        <button className="btn-post" onClick={() => (window.location.href = '/providerpostjob')}>
                            <span className="material-symbols-outlined icon-post">add_circle</span>
                            Post New Job
                        </button>
                    </div>
                </div>

                <div className="posted-jobs-section">
                    <div className="section-header">
                        <h2 className="section-title">Your Active Posted Jobs</h2>
                        <div className="header-divider"></div>
                    </div>

                    <div className="jobs-grid">

                        {PostedJobs.length > 0 ? (
                            PostedJobs.map((job) => {
                                return (
                                    <div className="job-card" key={job?.jobs_id}>
                                        <div className="job-header">
                                            <h3 className="job-title">{job?.job_title}</h3>
                                            <span className="job-type full-time">{job?.job_type}</span>
                                        </div>
                                        <div className="job-details">
                                            <div className="job-info">
                                                <span className="material-symbols-outlined icon-detail">payments</span>
                                                <span className="job-salary">{job?.job_salary} / {job?.job_salary_time}</span>
                                            </div>
                                            <div className="job-info">
                                                <span className="material-symbols-outlined icon-detail">location_on</span>
                                                <span className="job-location">{job?.job_location}</span>
                                            </div>
                                            <div className="job-info">
                                                <span className="material-symbols-outlined icon-detail">calendar_today</span>
                                                <span className="job-date">Posted on {job?.job_posted}</span>
                                            </div>
                                        </div>
                                        <button className="view-applicants-btn" data-jobid={job?.jobs_id}>
                                            <span className="material-symbols-outlined icon-btn">group</span>
                                            View Applicants ({job?.Total_Applicants})
                                        </button>
                                    </div>
                                )
                            })
                        ) : (
                            <p className="no-jobs-message">You have not posted any jobs yet. Click "Post New Job" to create your first job posting.</p>
                        )}


                    </div>
                </div>


            </div>
        </div>
    )
}
