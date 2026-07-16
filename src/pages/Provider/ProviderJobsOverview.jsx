import { useContext, useEffect, useState } from 'react';
import { ProviderHeader } from './ProviderHeader'
import './ProviderJobsOverview.css'
import axios from 'axios';
import { Providerddata } from '../../main';
import { getInitials } from '../../Utils/seekerutils';
import { Link, useNavigate } from 'react-router';
import ProviderJobs from './Components/ProviderJobs';

export function ProviderJobsOverview() {
    let { providerData: Providerdata, refreshProvider: refreshProvider } = useContext(Providerddata);
    let [providerJobs, setProviderJobs] = useState([]);
    const [jobsRequiredData, setJobsRequiredData] = useState({})
    const DashboardNavigate = useNavigate()

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
    const fetchJobRequiredData = async () => {
        let result;
        try {
            result = await axios.get('/PartTimeConnect-Backend/get-required-data.php', {
                withCredentials: true
            })
            setJobsRequiredData({
                'totalJobs': result?.data?.totalJobs,
                'activeJobs': result?.data?.active,
                'totalApplicants': result?.data?.count
            })
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        FetchJobs();
        fetchJobRequiredData();
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
                                    <span className="stat-number posted-jobs">{jobsRequiredData?.totalJobs ? jobsRequiredData?.totalJobs : 0}</span>
                                    <span className="stat-label">Jobs Posted</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number applicants-num ">{jobsRequiredData?.totalApplicants ? jobsRequiredData?.totalApplicants : 0}</span>
                                    <span className="stat-label">Total Applicants</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number active-jobs "> {jobsRequiredData?.activeJobs ? jobsRequiredData?.activeJobs : 0} </span>
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
                            <button className="btn-primary" onClick={() => (DashboardNavigate('/providerpostjob'))}>
                                <i className="fas fa-plus-circle"></i> Post New Job
                            </button>
                        </div>

                        <div className="job-grid">
                            {
                                (providerJobs?.length !== 0 ?
                                    (
                                        providerJobs.map((jobs) => (
                                            <ProviderJobs jobs={jobs}/>
                                        ))
                                    )
                                    : <>
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
