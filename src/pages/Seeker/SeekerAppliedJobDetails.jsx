import { SeekerHeader } from './SeekerHeader';
import './SeekerAppliedJobDetails.css';
import { useParams } from 'react-router';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { getInitials } from '../../Utils/seekerutils';
import { Requireddata } from '../../main';
export function SeekerAppliedJobDetails() {


    const { seekerData: Seekerdata, refreshSeeker: setSeeker } = useContext(Requireddata);
    let [jobDetails, setJobDetails] = useState([]);
    let [isapplied, setIsApplied] = useState(false);
    let [isSaved, setIsSaved] = useState(false);
    let [appliedDate, setAppliedDate] = useState(null);
    let [isLoading, setIsLoading] = useState(false);

    let JobId = useParams().jobid;
    async function fetchJobDetails() {
        if (!JobId) return;
        try {
            let result = await axios.post('/PartTimeConnect-Backend/getidjob.php', {
                jobId: JobId
            },
                {
                    withCredentials: true
                }
            );
            setJobDetails(result.data || []);
        } catch (error) {
            console.error('Error fetching job details:', error);
            setJobDetails([]);
        }
    }

    async function checkIfApplied() {

        try {
            let appliedresult = await axios.get('/PartTimeConnect-Backend/getappliedjob.php', {
                withCredentials: true
            });
            let seekerappliedjobs = appliedresult.data;
            seekerappliedjobs.forEach((job) => {
                if (String(job.jobs_id) === String(JobId)) {
                    setIsApplied(true);
                    setAppliedDate(job.applied_date);
                }
            });

            let savedresult = await axios.get('/PartTimeConnect-Backend/getsaveddata.php', {
                withCredentials: true
            });
            setIsSaved(false);
            savedresult.data.forEach((job) => {
                if (String(job.job_id) === String(JobId)) {
                    setIsSaved(true);
                }
            });
        } catch (error) {
            console.error('Error checking applied/saved status:', error);
        }

    }

    async function applyForJob() {
        setIsLoading(true);
        try {
            let result = await axios.post('/PartTimeConnect-Backend/applyjob.php', {
                jobid: JobId,
                companyid: jobDetails[0].provider_name,
                companyname: jobDetails[0].company_name
            },
                {
                    withCredentials: true
                });

            console.log(result.data);
            setTimeout(async () => {
                setIsLoading(false);
                setIsApplied(true);
                await checkIfApplied();
            }, 2000);

        } catch (error) {
            console.error('Error applying for job:', error);
        }
    }

    async function handleSaveJob() {

        let result = await axios.post('/PartTimeConnect-Backend/add_savedjob.php',
            {
                id: jobDetails[0].jobs_id,
                title: jobDetails[0].job_title,
                state: (!isSaved) ? 'save' : 'unsave'
            },
            {
                withCredentials: true
            }
        );  
        let data = result.data;
        if (data.status === 'success') {
            await checkIfApplied();
        }
    }

    useEffect(() => {
        if (JobId == null)
            return;
        fetchJobDetails();
        checkIfApplied();
    }, [JobId]);

    if (!Seekerdata) {
        setSeeker();
    }
    else {
        return (
            <>
                <SeekerHeader />
                <div className="seekerappliedjob-main-content">
                    {jobDetails.map((job) => {

                        let jobbentifits = job.job_benifits ? job.job_benifits.split('\n').map(benefit => benefit.trim()) : [];
                        return (
                            <div className="seekerappliedjob-container">
                                <div className="seekerappliedjob-job-header">
                                    <div className="seekerappliedjob-job-title-section">
                                        <div className="seekerappliedjob-company-logo">
                                            <p className="seekerappliedjob-logo-image">
                                                {getInitials(job.company_name)}
                                            </p>
                                        </div>
                                        <div className="seekerappliedjob-job-title-info">
                                            <h1 className="seekerappliedjob-job-title">{job.job_title}</h1>
                                            <div className="seekerappliedjob-company-info">
                                                <h2 className="seekerappliedjob-company-name">{job.company_name}</h2>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="seekerappliedjob-job-actions">
                                        {isSaved ? (
                                            <button className="seekerappliedjob-action-btn seekerappliedjob-save-btn" onClick={()=>(handleSaveJob())}>
                                                <i className="fas fa-bookmark"></i>
                                                Saved
                                            </button>
                                        ) : (
                                            <button className="seekerappliedjob-action-btn" onClick={()=>(handleSaveJob())}>
                                                <i className="fas fa-bookmark"></i>
                                                Save Job
                                            </button>
                                        )}
                                        <button className="seekerappliedjob-action-btn seekerappliedjob-share-btn" >
                                            <i className="fas fa-share-alt"></i>
                                            Share
                                        </button>
                                    </div>
                                </div>

                                <div className="seekerappliedjob-job-details-card">
                                    <div className="seekerappliedjob-card-header">
                                        <h3>
                                            <i className="fas fa-info-circle"></i>
                                            Job Details
                                        </h3>
                                        <div className="seekerappliedjob-job-status">
                                            {job.job_status === "open" ? (
                                                <span className="seekerappliedjob-status-badge seekerappliedjob-active">
                                                    <i className="fas fa-circle" style={{ color: '#28a745' }}></i>
                                                    Actively Hiring
                                                </span>
                                            ) : (
                                                <span className="seekerappliedjob-status-badge seekerappliedjob-inactive">
                                                    <i className="fas fa-circle" style={{ color: '#dc3545' }}></i>
                                                    Closed
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="seekerappliedjob-job-details-grid">
                                        <div className="seekerappliedjob-detail-item">
                                            <div className="seekerappliedjob-detail-icon">
                                                <i className="fas fa-rupee-sign"></i>
                                            </div>
                                            <div className="seekerappliedjob-detail-content">
                                                <span className="seekerappliedjob-detail-label">Salary</span>
                                                <span className="seekerappliedjob-detail-value">₹{job.job_salary}/ {job.job_salary_time}</span>
                                                <span className="seekerappliedjob-detail-extra">Plus performance bonus</span>
                                            </div>
                                        </div>

                                        <div className="seekerappliedjob-detail-item">
                                            <div className="seekerappliedjob-detail-icon">
                                                <i className="fas fa-clock"></i>
                                            </div>
                                            <div className="seekerappliedjob-detail-content">
                                                <span className="seekerappliedjob-detail-label">Job Type</span>
                                                <span className="seekerappliedjob-detail-value">{job.job_type}</span>
                                                <span className="seekerappliedjob-detail-extra">{job.workload} hours / {job.workperiod}</span>
                                            </div>
                                        </div>

                                        <div className="seekerappliedjob-detail-item">
                                            <div className="seekerappliedjob-detail-icon">
                                                <i className="fas fa-map-marker-alt"></i>
                                            </div>
                                            <div className="seekerappliedjob-detail-content">
                                                <span className="seekerappliedjob-detail-label">Location</span>
                                                <span className="seekerappliedjob-detail-value">{job.job_location}</span>
                                            </div>
                                        </div>

                                        <div className="seekerappliedjob-detail-item">
                                            <div className="seekerappliedjob-detail-icon">
                                                <i className="fas fa-graduation-cap"></i>
                                            </div>
                                            <div className="seekerappliedjob-detail-content">
                                                <span className="seekerappliedjob-detail-label">Experience Required</span>
                                                <span className="seekerappliedjob-detail-value">{job.job_experience === "entry-level" ? "Entry Level" : job.job_experience}</span>
                                            </div>
                                        </div>

                                        <div className="seekerappliedjob-detail-item">
                                            <div className="seekerappliedjob-detail-icon">
                                                <i className="fas fa-calendar-alt"></i>
                                            </div>
                                            <div className="seekerappliedjob-detail-content">
                                                <span className="seekerappliedjob-detail-label">Posted Date</span>
                                                <span className="seekerappliedjob-detail-value">{job.job_posted}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="seekerappliedjob-job-description">
                                    <div className="seekerappliedjob-section-header">
                                        <h3>
                                            <i className="fas fa-file-alt"></i>
                                            Job Description
                                        </h3>
                                        <div className="seekerappliedjob-reading-time">
                                            <i className="fas fa-clock"></i>
                                            3 min read
                                        </div>
                                    </div>
                                    <div className="seekerappliedjob-description-content">
                                        <div className="seekerappliedjob-description-section">
                                            <h4>About the Role</h4>
                                            <p>{job.job_description}</p>
                                        </div>


                                        <div className="seekerappliedjob-description-section">
                                            <h4>What We Offer</h4>
                                            <div className="seekerappliedjob-benefits-grid">
                                                {jobbentifits.map((benefit) => {
                                                    return (
                                                        <div className="seekerappliedjob-benefit-item">
                                                            <i className="fa-solid fa-medal"></i>
                                                            <span>{benefit}</span>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        <div className="seekerappliedjob-description-section">
                                            <h4>About TechStart Solutions</h4>
                                            <p>{job.companydescription}</p>
                                        </div>
                                    </div>
                                </div>

                                <section className="seekerappliedjob-application-section">
                                    <div className="seekerappliedjob-application-card">
                                        <div className="seekerappliedjob-application-header">
                                            <h3>
                                                <i className="fas fa-paper-plane"></i>
                                                Ready to Apply?
                                            </h3>
                                            <p>Join TechStart Solutions and kickstart your marketing career with us!</p>
                                        </div>

                                        {!isapplied ? (<button className={`seekerappliedjob-apply-now-btn ${isLoading ? 'seekerappliedjob-loading' : ''}`} onClick={applyForJob} disabled={isLoading} >
                                            {isLoading ? 'Applying...' : 'Apply Now'}
                                            <i className={`fas ${isLoading ? 'fa-spinner' : 'fa-paper-plane'}`}></i>
                                        </button>) : (<button className="seekerappliedjob-apply-now-btn">
                                            <i className="fas fa-check-circle seekerapplied-success-icon"></i> Applied on {appliedDate}

                                        </button>)}

                                        <div className="seekerappliedjob-application-note">
                                            <i className="fas fa-info-circle"></i>
                                            <span>Your profile shows you're a great match for this role!</span>
                                        </div>
                                    </div>
                                </section>

                            </div>
                        )
                    })}

                </div >
            </>
        );
    }
}

