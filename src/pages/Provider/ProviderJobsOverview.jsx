import { useContext, useEffect, useState } from 'react';
import { ProviderHeader } from './ProviderHeader'
import './ProviderJobsOverview.css'
import axios from 'axios';
import { Providerddata } from '../../main';
import { getInitials } from '../../Utils/seekerutils';

export function ProviderJobsOverview() {
    let { providerData: Providerdata, refreshProvider: refreshProvider } = useContext(Providerddata);
    let [providerJobs, setProviderJobs] = useState([]);

    async function FetchJobs() {
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

    }
    useEffect(() => {
        FetchJobs();
    }, []);
    return (
        <div className="providerjobsoverview">
            <ProviderHeader />
            <div className="main-content">
                <div className="container">
                    <section className="company-header">
                        <div className="company-logo-container">
                            <h3 className="company-logo">{getInitials(Providerdata?.company_name || 'Loading')}</h3>
                        </div>
                        <div className="company-info">
                            <h1 className="company-name">{Providerdata?.company_name || 'Loading'}</h1>
                            <div className="company-stats">
                                <div className="stat-item">
                                    <span className="stat-number posted-jobs">12</span>
                                    <span className="stat-label">Jobs Posted</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number applicants-num ">85</span>
                                    <span className="stat-label">Total Applicants</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number active-jobs ">7</span>
                                    <span className="stat-label">Active Jobs</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="posted-jobs-section">
                        <div className="section-header">
                            <h2>
                                <i className="fas fa-briefcase"></i>
                                Your Posted Jobs
                            </h2>
                            <button className="btn-primary" onClick={() => (location.href = 'post-job.html')}>
                                <i className="fas fa-plus-circle"></i> Post New Job
                            </button>
                        </div>

                        <div className="job-grid">
                            {
                                (providerJobs?.length !== 0 ? <>
                                    <a href="job-details-applicants.html?jobId=1" className="job-card">
                                        <div className="job-card-header">
                                            <h3 className="job-title">Part-Time Marketing Assistant</h3>
                                            <span className="job-type">Part-Time</span>
                                        </div>
                                        <div className="job-card-details">
                                            <p className="job-salary"><i className="fas fa-dollar-sign"></i> ₹25,000 / month</p>
                                            <p className="job-location"><i className="fas fa-map-marker-alt"></i> San Francisco, CA</p>
                                            <p className="job-posted-date"><i className="fas fa-calendar-alt"></i> Posted 2 days ago</p>
                                        </div>
                                        <div className="job-card-footer">
                                            <span className="applicants-count"><i className="fas fa-users"></i> 15 Applied</span>
                                            <span className="job-status active"><i className="fas fa-circle"></i> Active</span>
                                        </div>
                                    </a>
                                </> : <>
                                    <div className="empty-card-container">
                                        <div className="empty-card-box">
                                            <div className="empty-card-icon-wrapper">
                                                <i className="fas fa-briefcase empty-card-icon"></i>
                                            </div>

                                            <h3 className="empty-card-title">No Jobs Posted Yet</h3>
                                            <p className="empty-card-subtitle">Get started by creating your very first part-time job listing to find local talent quickly.</p>

                                            <button className="providerdashboard-btn-post-inline" onClick={() => { DashboardNavigate('/providerpostjob') }}>
                                                Post Job <span className="empty-card-plus-sign">+</span>
                                            </button>
                                        </div>
                                    </div>
                                </>)
                            }
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
