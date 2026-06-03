import axios from 'axios';
import { getInitials } from '../../Utils/seekerutils'
import { ProviderHeader } from './ProviderHeader'
import './ProviderProfile.css'
import { useContext, useEffect, useState } from 'react';
import { Providerddata } from '../../main';
export function ProviderProfile() {

    let { providerData: Providerdata } = useContext(Providerddata);
    let [providerJobs, setProviderJobs] = useState([]);


    async function FetchproviderJobs() {
        try {
            let result = await axios.get('/backend/getprovider-jobs.php', {
                withCredentials: true
            });
            setProviderJobs(result.data);
        } catch (error) {
            console.error("Error fetching provider profile:", error);
        }
    }

    useEffect(() => {
        FetchproviderJobs();
    }, [])

    return (
        <div className="providerprofile">
            <ProviderHeader />
            <div className="main-container">
                <div className="company-header">
                    <div className="company-info-horizontal">
                        <div className="company-logo-container">
                            <div className="company-logo-circle">
                                <h3 className="company-logo-name">{getInitials(Providerdata?.company_name)}</h3>
                            </div>
                        </div>
                        <div className="company-details">
                            <h1 className="company-name">{Providerdata?.company_name}</h1>
                            <div className="company-meta">

                                <div className="location">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span className="company-loaction">{Providerdata?.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="profile-section">
                    <div className="seeker-profile-header">
                        <h2 className="section-title">Profile</h2>
                        <button className="edit-button" onClick={() => (window.location.href = "/providerprofileupdate")} >
                            <i className="fas fa-edit"></i>
                            Edit
                        </button>
                    </div>

                    <div className="profile-content">
                        <div className="profile-grid">

                            <div className="info-card">
                                <div className="info-label">Name:</div>
                                <div className="info-value-name">{Providerdata?.company_name}</div>
                            </div>

                            <div className="info-card">
                                <div className="info-label">Email:</div>
                                <div className="info-value-email">{Providerdata?.email}</div>
                            </div>

                            <div className="info-card">
                                <div className="info-label">Contact:</div>
                                <div className="info-value-location">{Providerdata?.contact_number}</div>
                            </div>
                            <div className="info-card">
                                <div className="info-label">Location:</div>
                                <div className="info-value-location">{Providerdata?.location}</div>
                            </div>

                            <div className="info-card full-width">
                                <div className="info-label">Company Description:</div>
                                <div className="info-value-description">
                                    {Providerdata?.company_description || "No description provided."}
                                </div>
                            </div>
                            <div className="info-card full-width">
                                <div className="info-label">Company Address:</div>
                                <div className="info-value-description">
                                    {Providerdata?.address || "No Address provided."}
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div className="posted-jobs-section">
                    <div className="section-header">
                        <h2 className="section-title">Your Posted Jobs</h2>
                    </div>

                    <div className="jobs-grid">

                        {providerJobs.length === 0 ? (<div className="no-jobs-message">No jobs posted yet.</div>) : (
                            providerJobs.map((job) => (
                                <div className="job-card">
                                    <div className="job-header">
                                        <h3 className="job-title">{job?.job_title}</h3>
                                        <span className="job-type part-time">{job?.job_type}</span>
                                    </div>
                                    <div className="job-details">
                                        <div className="job-info">
                                            <i className="fas fa-dollar-sign"></i>
                                            <span className="job-salary">{job?.job_salary}/ {job.job_salary_time}</span>
                                        </div>
                                        <div className="job-info">
                                            <i className="fas fa-map-marker-alt"></i>
                                            <span className="job-location">{job?.job_location}</span>
                                        </div>
                                        <div className="job-info">
                                            <i className="fas fa-calendar-alt"></i>
                                            <span className="job-date">Posted on {job?.job_posted}</span>
                                        </div>
                                    </div>
                                    <button className="view-applicants-btn" data-jobid={job?.jobs_id}>
                                        <i className="fas fa-users"></i>
                                        View Applicants
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}
