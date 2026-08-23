import { useContext, useEffect, useState } from 'react';
import { ProviderHeader } from './ProviderHeader'
import './ProviderJobsOverview.css'
import { Providerddata } from '../../main';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { getInitials } from '../../Utils/seekerutils';
import PostedJobApplicants from './Components/PostedJobApplicants';


export default function ProviderJobApplicants() {
    let { providerData: Providerdata, refreshProvider: refreshProvider } = useContext(Providerddata);
    const [providerJobIdData, setProviderJobIdData] = useState()
    const [providerJobIdApplicants, setProviderJobIdApplicants] = useState();
    const [isOpen, setIsOpen] = useState(true);
    const [isClose, setIsClose] = useState(false);
    const providerJobId = useParams().jobid;
    const editJobnavigation = useNavigate();
    const fetchProviderJobDetails = async () => {
        if (!Providerdata) {
            refreshProvider();
        }
        try {
            let result = await axios.post('/PartTimeConnect-Backend/getidjob.php',
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    'jobId': providerJobId
                }
            )
            setProviderJobIdData(result.data[0])
        } catch (e) {
            console.log(e);
        }
    }

    const fetchJobIdApplicants = async () => {
        try {
            let result = await axios.post('/PartTimeConnect-Backend/getappliedapplicants.php',
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    'jobid': providerJobId
                }
            )
            setProviderJobIdApplicants(result.data)
        } catch (e) {
            console.log(e);
        }
    }

    const openJob = async () => {
        try {
            const respose = await axios.post('/PartTimeConnect-Backend/updateJobstatus.php', {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
                'jobid': providerJobId,
                'status': 'open'
            });

            if (respose.data?.status === 'success') {
                setIsOpen(true);
                setIsClose(false);
            }

        } catch (e) {
            console.log(e);
        }
    }
    const closeJob = async () => {
        try {
            const respose = await axios.post('/PartTimeConnect-Backend/updateJobstatus.php', {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
                'jobid': providerJobId,
                'status': 'close'
            });
            if (respose.data?.status === 'success') {
                setIsClose(true);
                setIsOpen(false);
            }

        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchProviderJobDetails()
        fetchJobIdApplicants();
    }, [providerJobId])
    return (
        <div className="providerjobsoverview">
            <ProviderHeader />
            <div className="main-content">
                <div className="container">
                    <section className="company-header">
                        <div className="company-logo-container">
                            <h3 className="company-logo">{getInitials(Providerdata?.company_name ? Providerdata?.company_name : '!')}</h3>
                        </div>
                        <div className="company-info">
                            <h1 className="company-name">{Providerdata?.company_name ? Providerdata?.company_name : 'NA'}</h1>
                        </div>
                    </section>

                    <section className="job-details-section">
                        <div className="section-header">
                            <h2>
                                <i className="fas fa-briefcase"></i>
                                Job Details
                            </h2>
                            <div className="job-actions">
                                <button className="btn-secondary" onClick={()=>(editJobnavigation(`/providerpostjob/${providerJobId}`))} >
                                    <i className="fas fa-edit"></i> Edit Job
                                </button>
                                {isOpen ?
                                    <button className="btn-danger" onClick={closeJob}>
                                        <i class="fas fa-door-closed"></i> Close Job
                                    </button> :
                                    <button className="btn-safe" onClick={openJob}>
                                        <i class="fas fa-door-open"></i> Open Job
                                    </button>
                                }
                            </div>
                        </div>

                        <div className="job-details-card">
                            <div className="job-header">
                                <div className="job-title-section">
                                    <h3 className="job-title" id="jobTitle">{providerJobIdData?.job_title ? providerJobIdData?.job_title : 'NA'}</h3>
                                    <span className="job-type" id="jobType">{providerJobIdData?.job_type ? providerJobIdData?.job_type : 'NA'}</span>
                                </div>
                                <div className="job-meta">
                                    {
                                        isOpen ? <span className="job-status active"><i className="fas fa-circle"></i> Active</span>
                                        : <span className="job-status inactive"><i className="fas fa-circle"></i> CLosed</span>
                                    }
                                    <span className="job-posted-date"><i className="fas fa-calendar-alt"></i> Posted {providerJobIdData?.job_posted ? providerJobIdData?.job_posted : 'NA'}</span>
                                </div>
                            </div>

                            <div className="job-info-grid">
                                <div className="job-info-item">
                                    <i className="fas fa-dollar-sign"></i>
                                    <div>
                                        <span className="info-label">Salary</span>
                                        <span className="info-value" id="jobSalary">₹{providerJobIdData?.job_salary ? providerJobIdData?.job_salary : 'NA'} / {providerJobIdData?.job_salary_time ? providerJobIdData?.job_salary_time : 'NA'}</span>
                                    </div>
                                </div>
                                <div className="job-info-item">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <div>
                                        <span className="info-label">Location</span>
                                        <span className="info-value" id="jobLocation">{providerJobIdData?.job_location ? providerJobIdData?.job_location : 'NA'}</span>
                                    </div>
                                </div>
                                <div className="job-info-item">
                                    <i className="fa-solid fa-briefcase"></i>
                                    <div>
                                        <span className="info-label">Job Type</span>
                                        <span className="info-value" id="jobTypeDetail">{providerJobIdData?.job_type ? providerJobIdData?.job_type : 'NA'} </span>
                                    </div>
                                </div>
                                <div className="job-info-item">
                                    <i className="fas fa-clock"></i>
                                    <div>
                                        <span className="info-label">Working Hours</span>
                                        <span className="info-value" id="jobExperience">{providerJobIdData?.workload ? providerJobIdData?.workload : 'NA'} hours/ {providerJobIdData?.workperiod ? providerJobIdData?.workperiod : 'NA'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="job-description">
                                <h4><i className="fas fa-file-alt"></i> Job Description</h4>
                                <div className="description-content" id="jobDescription">
                                    <p>{providerJobIdData?.job_description ? providerJobIdData?.job_description : 'NA'}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="applicants-section">
                        <div className="section-header">
                            <h2>
                                <i className="fas fa-users"></i>
                                Applied Applicants
                            </h2>
                        </div>

                        <div className="applicants-grid">
                            {providerJobIdApplicants?.length > 0 ? (
                                providerJobIdApplicants.map((applicant) => (
                                    <PostedJobApplicants applicant={applicant} jobName={providerJobIdData?.job_title} />
                                ))

                            ) : (
                                <div className="empty-card-container">
                                    <div className="empty-card-box">
                                        <div className="empty-card-icon-wrapper">
                                            <i className="fas fa-user-clock empty-card-icon"></i>
                                        </div>

                                        <h3 className="empty-card-title">No Recent Applications</h3>
                                        <p className="empty-card-subtitle">
                                            When candidates apply to your jobs, they will appear here.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
