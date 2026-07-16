import { useContext, useEffect, useState } from 'react';
import { ProviderHeader } from './ProviderHeader';
import { Providerddata } from '../../main';
import axios from 'axios';
import { getInitials } from '../../Utils/seekerutils';
import { useNavigate } from 'react-router';
export function ProviderDashboard() {
    let { providerData: Providerdata, refreshProvider: refreshProvider } = useContext(Providerddata);
    let [providerJobs, setProviderJobs] = useState([]);
    let [recentApplicants, setRecentApplicants] = useState([]);
    let [requiredData, setRequiredData] = useState({});
    let [loading, setloading] = useState(false)
    let DashboardNavigate = useNavigate();

    async function FetchJobs() {
        setloading(true)
        if (!Providerdata) {
            refreshProvider();
        }
        try {
            let result = await axios.get('/PartTimeConnect-Backend/getprovider-jobs.php', {
                withCredentials: true
            });
            setProviderJobs(result.data);

        } catch (err) {
            console.error(err);
        }
        finally {
            setloading(false)
        }
    }

    async function FetchRecentApplicants() {
        try {
            let result = await axios.get('/PartTimeConnect-Backend/get_recent_applications.php', {
                withCredentials: true
            });
            setRecentApplicants(result.data.applications);
        } catch (err) {
            console.log(err);
        }
    }

    async function FetchRequireddata() {
        try {
            let result = await axios.get('/PartTimeConnect-Backend/get-required-data.php', {
                withCredentials: true
            });
            setRequiredData(result.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        FetchJobs();
        FetchRecentApplicants();
        FetchRequireddata();
    }, [])
    return (
        <div className="providerdashboard-body">

            <div className="providerdashboard-wrapper">

                <ProviderHeader />

                <main className="providerdashboard-container">

                    <section className="providerdashboard-hero">
                        <h1 className="providerdashboard-welcome">Welcome back ! {Providerdata?.company_name || "Company Name"} </h1>
                        <p className="providerdashboard-lead">Manage your job postings and find the perfect candidates</p>
                    </section>

                    <div className="providerdashboard-stats-grid">
                        <div className="providerdashboard-stat-card">
                            <div className="providerdashboard-stat-icon-box providerdashboard-bg-blue">
                                <i className="fas fa-briefcase"></i>
                            </div>
                            <div className="providerdashboard-stat-info">
                                <span className="providerdashboard-stat-count">{requiredData?.active || 0}</span>
                                <span className="providerdashboard-stat-name">Active Jobs</span>
                            </div>
                        </div>
                        <div className="providerdashboard-stat-card">
                            <div className="providerdashboard-stat-icon-box providerdashboard-bg-purple">
                                <i className="fas fa-users"></i>
                            </div>
                            <div className="providerdashboard-stat-info">
                                <span className="providerdashboard-stat-count">{requiredData?.count || 0}</span>
                                <span className="providerdashboard-stat-name">Applicants</span>
                            </div>
                        </div>
                        <div className="providerdashboard-stat-card">
                            <div className="providerdashboard-stat-icon-box providerdashboard-bg-green">
                                <i className="fas fa-user-check"></i>
                            </div>
                            <div className="providerdashboard-stat-info">
                                <span className="providerdashboard-stat-count">{requiredData?.hired || 0}</span>
                                <span className="providerdashboard-stat-name">Hired</span>
                            </div>
                        </div>
                    </div>

                    <section className="providerdashboard-section">
                        <div className="providerdashboard-section-header">
                            <h2 className="providerdashboard-section-heading">Recent Applications</h2>
                            <a className="providerdashboard-link-view" onClick={()=>{DashboardNavigate('/providerjobsoverview')}}>View All Applications</a>
                        </div>
                        {
                            recentApplicants.length !== 0 ? (
                                recentApplicants.map((applicant, index) => {
                                    return (
                                        <div className="providerdashboard-application-item" key={index}>
                                            <div className="providerdashboard-app-content">
                                                <div className="providerdashboard-app-user">
                                                    <div className="providerdashboard-app-avatar">{getInitials(applicant.name)}</div>
                                                    <div className="providerdashboard-app-details">
                                                        <h4 className="providerdashboard-app-name">{applicant.name}</h4>
                                                        <p className="providerdashboard-app-subtext">Applied for: {applicant.job_title}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="providerdashboard-app-content">
                                                <div className="providerdashboard-app-meta">
                                                    <span className="providerdashboard-badge-new">New</span>
                                                    <span className="providerdashboard-app-date">{applicant.applied_date}</span>
                                                </div>
                                            </div>
                                            <button className="providerdashboard-btn-profile" data-seekerid={applicant.seeker_id}>View Profile</button>
                                        </div>
                                    )
                                })
                            ) : <>
                                <div className="empty-card-container">
                                    <div className="empty-card-box">
                                        <div className="empty-card-icon-wrapper">
                                            <i className="fas fa-user-clock empty-card-icon"></i>
                                        </div>

                                        <h3 className="empty-card-title">No Recent Applications</h3>
                                        <p className="empty-card-subtitle">When candidates apply to your jobs, they will appear here.</p>
                                    </div>
                                </div>
                            </>
                        }
                    </section>

                    <section className="providerdashboard-section">
                        <div className="providerdashboard-section-header">
                            <h2 className="providerdashboard-section-heading">Active Jobs</h2>
                            <button className="providerdashboard-btn-post-inline" onClick={()=>{DashboardNavigate('/providerpostjob')}}>
                                Post New Job <i className="fas fa-plus"></i> 
                            </button>
                        </div>

                        <div className="providerdashboard-jobs-grid">

                            {providerJobs.length !== 0 ? (
                                providerJobs.map((job, index) => {
                                    return (
                                        <div className="providerdashboard-job-card" key={index}>
                                            <div className="providerdashboard-job-header">
                                                <h3 className="providerdashboard-job-title">{job.job_title}</h3>
                                                {job.job_status === "open" ? (<span className="providerdashboard-status-pill providerdashboard-status-active">Active</span>) : (<span className="providerdashboard-status-pill providerdashboard-status-closed">Closed</span>)}
                                            </div>
                                            <div className="providerdashboard-job-tags">
                                                <span className="providerdashboard-tag-outline">{job.job_type}</span>
                                                <span className="providerdashboard-job-pay">$ {job.job_salary} / {job.job_salary_time}</span>
                                            </div>
                                            <div className="providerdashboard-job-stats">
                                                <span><i className="fas fa-users"></i> {job.Total_Applicants} applicants</span>
                                                <span><i className="fas fa-calendar-alt"></i> Posted on {job.job_posted}</span>
                                            </div>
                                            <p className="providerdashboard-job-desc">
                                                {job.job_description}
                                            </p>
                                            <div className="providerdashboard-job-footer">
                                                <button className="providerdashboard-btn-edit"><i className="fas fa-edit" data-jobid={job.jobs_id} ></i> Edit</button>
                                                <button className="providerdashboard-btn-view"><i className="fas fa-eye"></i> View
                                                    Applicants</button>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : <>
                                <div className="empty-card-container">
                                    <div className="empty-card-box">
                                        <div className="empty-card-icon-wrapper">
                                            <i className="fas fa-briefcase empty-card-icon"></i>
                                        </div>

                                        <h3 className="empty-card-title">No Jobs Posted Yet</h3>
                                        <p className="empty-card-subtitle">Get started by creating your very first part-time job listing to find local talent quickly.</p>

                                        <button className="providerdashboard-btn-post-inline" onClick={()=>{DashboardNavigate('/providerpostjob')}}>
                                            Post Job <span className="empty-card-plus-sign">+</span>
                                        </button>
                                    </div>
                                </div>
                            </>}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )

}