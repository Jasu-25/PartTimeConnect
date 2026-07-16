import React, { useContext, useEffect, useState } from 'react';
import { ProviderHeader } from './ProviderHeader';
import './ProviderPostJob.css';
import { Providerddata } from '../../main';
import { getInitials } from '../../Utils/seekerutils';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import SomethingWentWrong from '../landingpage/SomethingWentWrong';

const getTodayDate = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 10);
};

export default function ProviderPostJob() {
    const [form, setForm] = useState({
        jobTitle: '',
        jobType: '',
        location: '',
        salaryAmount: '',
        salaryPeriod: '',
        workload: '',
        workPeriod: '',
        postedDate: getTodayDate(),
        jobDescription: '',
        whatTheyOffer: ''
    });
    const [errors, setErrors] = useState({});
    const [previewOpen, setPreviewOpen] = useState(false);
    const [successStatus, setSuccessStatus] = useState(false)
    const [isPosting, setIsPosting] = useState(false);
    const [isUpdateJob, setIsUpdateJob] = useState(false)
    const [somethingWrong, setSomethingWrong] = useState(false)
    let { providerData: Providerdata} = useContext(Providerddata);
    let UpdateJobId = useParams().jobid
    const dashboardNavigate = useNavigate();


    // validators for each field
    const validators = {
        jobTitle: v => v && v.trim() ? '' : 'Job title is required.',
        jobType: v => v ? '' : 'Select a job type.',
        location: v => v && v.trim() ? '' : 'Location is required.',
        salaryAmount: v => v && Number(v) > 0 ? '' : 'Enter a valid salary.',
        salaryPeriod: v => v ? '' : 'Select salary period.',
        workload: v => v && Number(v) > 0 ? '' : 'Enter work load.',
        workPeriod: v => v ? '' : 'Select work period.',
        postedDate: v => v ? '' : 'Select a posted date.',
        jobDescription: v => v && v.trim().length >= 20 ? '' : 'Description must be at least 20 characters.',
    };

    const setUpdateJobIDFeilds = async (updateJobId) => {
        try {
            let result = await axios.post('/PartTimeConnect-Backend/getidjob.php',
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    'jobId': updateJobId
                }
            )
            setForm({
                jobTitle: result?.data[0]?.job_title,
                jobType: result?.data[0]?.job_type,
                location: result?.data[0]?.job_location,
                salaryAmount: result?.data[0]?.job_salary,
                salaryPeriod: result?.data[0]?.job_salary_time,
                workload: result?.data[0]?.workload,
                workPeriod: result?.data[0]?.workperiod,
                postedDate: getTodayDate(),
                jobDescription: result?.data[0]?.job_description,
            })
        } catch (e) {
            console.log(e);
        }
    }

    const clearfields = () => {
        setForm(
            {
                jobTitle: '',
                jobType: '',
                location: '',
                salaryAmount: '',
                salaryPeriod: '',
                workload: '',
                workPeriod: '',
                postedDate: getTodayDate(),
                jobDescription: '',
            });
    }
    const validateField = (name, value) => {
        const fn = validators[name];
        if (!fn) return true;
        const message = fn(value);
        setErrors(prev => ({ ...prev, [name]: message }));
        return !message;
    };

    const validateAll = () => {
        let allValid = true;
        Object.keys(validators).forEach(key => {
            const ok = validateField(key, form[key]);
            if (!ok) allValid = false;
        });
        return allValid;
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const closePreview = () => setPreviewOpen(false);
    const closeSucess = () => {
        setSuccessStatus(false);
        clearfields();
    }

    const handlePreview = (e) => {
        e && e.preventDefault();
        const ok = validateAll();
        if (ok) setPreviewOpen(true);
    };

    const submitFromPreview = async () => {
        if (!validateAll()) return;
        setIsPosting(true);
        if (isUpdateJob) {
            let result;
            try {
                result = await axios.post("/PartTimeConnect-Backend/updateidjob.php", {
                    'jobid': UpdateJobId,
                    'jobTitle': form?.jobTitle,
                    'jobType': form?.jobType,
                    'location': form?.location,
                    'postedDate': form?.postedDate,
                    'salaryAmount': form?.salaryAmount,
                    'salaryPeriod': form?.salaryPeriod,
                    'workload': form?.workload,
                    'workperiod': form?.workPeriod,
                    'jobDescription': form?.jobDescription,
                })

            } catch (e) {
                console.log(e);
            }

            if (result.data.status === "success") {
                setTimeout(() => {
                    setIsPosting(false);
                    setPreviewOpen(false);
                    setSuccessStatus(true);
                }, 2000)              
            }
            else{
                setTimeout(() => {
                    setIsPosting(false);
                    setPreviewOpen(false);
                    setSomethingWrong(true)
                }, 2000)
            }
        }
        else{
            let result ; 
            try{
                result = await axios.post('/PartTimeConnect-Backend/add_jobs.php',{
                    'jobTitle': form?.jobTitle,
                    'jobType': form?.jobType,
                    'location': form?.location,
                    'postedDate': form?.postedDate,
                    'salaryAmount': form?.salaryAmount,
                    'salaryPeriod': form?.salaryPeriod,
                    'workload': form?.workload,
                    'workperiod': form?.workPeriod,
                    'jobDescription': form?.jobDescription,
                },{
                    withCredentials:true
                });
                console.log(result.data);
            }catch(e){
                console.log(e);
            }

            if (result.data.status === "success") {
                setTimeout(() => {
                    setIsPosting(false);
                    setPreviewOpen(false);
                    setSuccessStatus(true);
                }, 2000)              
            }
            else{
                setTimeout(() => {
                    setIsPosting(false);
                    setPreviewOpen(false);
                    setSomethingWrong(true)
                }, 2000)
            }
        }

        
    };



    useEffect(() => {
        if (UpdateJobId) {
            setIsUpdateJob(true);
            setUpdateJobIDFeilds(UpdateJobId)
        }
    }, [UpdateJobId])

    return (
        <>
            <ProviderHeader />
            <div className="providerpostjob-main-content">
                <div className="providerpostjob-container">
                    <section className="providerpostjob-company-header">
                        <div className="providerpostjob-company-logo-container">
                            <h3 className="providerpostjob-company-logo">{getInitials(Providerdata?.company_name) ? getInitials(Providerdata?.company_name) : "!"}</h3>
                        </div>
                        <div className="providerpostjob-company-info">
                            <h1 className="providerpostjob-company-name">{Providerdata?.company_name ? Providerdata?.company_name : "Loading"}</h1>
                            <div className="providerpostjob-company-details">
                                <span className="providerpostjob-company-location">
                                    <i className="fas fa-map-marker-alt"></i>
                                    {Providerdata?.location ? Providerdata?.location : ""}
                                </span>
                            </div>
                        </div>
                    </section>
                    <section className="providerpostjob-job-form-section">
                        <div className="providerpostjob-form-header">
                            <h2>
                                <i className="fas fa-plus-circle"></i>
                                Post a New Job
                            </h2>
                            <p>Fill out the details below to post your job opportunity and attract the best candidates.</p>
                        </div>

                        <form className="providerpostjob-job-form" id="jobPostingForm" >
                            <div className="providerpostjob-form-section">
                                <h3 className="providerpostjob-section-title">
                                    <i className="fas fa-info-circle"></i>
                                    Basic Job Information
                                </h3>

                                <div className="providerpostjob-form-row">
                                    <div className="providerpostjob-form-group">
                                        <label htmlFor="jobTitle" className="providerpostjob-form-label">
                                            Job Title <span className="providerpostjob-required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="jobTitle"
                                            name="jobTitle"
                                            className="providerpostjob-form-input"
                                            placeholder="e.g., Part-Time Marketing Assistant"
                                            value={form.jobTitle}
                                            onChange={handleChange}
                                        />
                                        {errors.jobTitle && <span className="error">{errors.jobTitle}</span>}
                                        <div className="providerpostjob-input-hint">Enter a clear and descriptive job title</div>
                                    </div>
                                    <div className="providerpostjob-form-group">
                                        <label htmlFor="jobType" className="providerpostjob-form-label">
                                            Job Type <span className="providerpostjob-required">*</span>
                                        </label>
                                        <select id="jobType" name="jobType" className="providerpostjob-form-select" value={form.jobType} onChange={handleChange}>
                                            <option value="">Select job type</option>
                                            <option value="part-time">Part-Time</option>
                                            <option value="full-time">Full-Time</option>
                                        </select>
                                        {errors.jobType && <span className="error">{errors.jobType}</span>}
                                        <div className="providerpostjob-input-hint">Choose the employment type</div>
                                    </div>
                                </div>

                                <div className="providerpostjob-form-row">
                                    <div className="providerpostjob-form-group">
                                        <label htmlFor="location" className="providerpostjob-form-label">
                                            Location <span className="providerpostjob-required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="location"
                                            name="location"
                                            className="providerpostjob-form-input"
                                            placeholder="e.g., San Francisco, CA or Remote"
                                            value={form.location}
                                            onChange={handleChange}
                                        />
                                        {errors.location && <span className="error">{errors.location}</span>}
                                        <div className="providerpostjob-input-hint">City, state or "Remote" for remote positions</div>
                                    </div>
                                    <div className="providerpostjob-form-row">
                                        <div className="providerpostjob-form-group">
                                            <label htmlFor="postedDate" className="providerpostjob-form-label">
                                                Posted Date <span className="providerpostjob-required">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                id="postedDate"
                                                name="postedDate"
                                                className="providerpostjob-form-input"
                                                value={form.postedDate}
                                                onChange={handleChange}
                                            />
                                            {errors.postedDate && <span className="error">{errors.postedDate}</span>}
                                            <div className="providerpostjob-input-hint">When this job posting should go live</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="providerpostjob-form-section">
                                <h3 className="providerpostjob-section-title">
                                    <i className="fas fa-dollar-sign"></i>
                                    Compensation Details
                                </h3>

                                <div className="providerpostjob-form-row">
                                    <div className="providerpostjob-form-group">
                                        <label htmlFor="salaryAmount" className="providerpostjob-form-label">
                                            Salary Amount <span className="providerpostjob-required">*</span>
                                        </label>
                                        <div className="providerpostjob-input-group">
                                            <span className="providerpostjob-input-prefix">₹</span>
                                            <input
                                                type="number"
                                                id="salaryAmount"
                                                name="salaryAmount"
                                                className="providerpostjob-form-input"
                                                placeholder="25000"
                                                min="1"
                                                step="1000"
                                                value={form.salaryAmount}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        {errors.salaryAmount && <span className="error">{errors.salaryAmount}</span>}
                                        <div className="providerpostjob-input-hint">Enter the salary amount in rupees</div>
                                    </div>

                                    <div className="providerpostjob-form-group">
                                        <label htmlFor="salaryPeriod" className="providerpostjob-form-label">
                                            Salary Period <span className="providerpostjob-required">*</span>
                                        </label>
                                        <select id="salaryPeriod" name="salaryPeriod" className="providerpostjob-form-select" value={form.salaryPeriod} onChange={handleChange}>
                                            <option value="">Select period</option>
                                            <option value="per-day">Per Day</option>
                                            <option value="per-week">Per Week</option>
                                            <option value="per-month">Per Month</option>
                                            <option value="per-year">Per Year</option>
                                            <option value="hourly">Per Hour</option>
                                        </select>
                                        {errors.salaryPeriod && <span className="error">{errors.salaryPeriod}</span>}
                                        <div className="providerpostjob-input-hint">How often the salary is paid</div>
                                    </div>
                                </div>
                            </div>
                            <div className="providerpostjob-form-section">
                                <h3 className="providerpostjob-section-title">
                                    <i className="fas fa-clock"></i>
                                    Working Hours
                                </h3>

                                <div className="providerpostjob-form-row">
                                    <div className="providerpostjob-form-group">
                                        <label htmlFor="salaryAmount" className="providerpostjob-form-label">
                                            Work Load<span className="providerpostjob-required">*</span>
                                        </label>
                                        <div className="providerpostjob-input-group">
                                            <span className="providerpostjob-input-prefix" style={{ color: 'var(--blue)' }}><i className="fas fa-clock"></i></span>
                                            <input
                                                type="number"
                                                id="workload"
                                                name="workload"
                                                className="providerpostjob-form-input"
                                                placeholder="2 hours"
                                                min="1"
                                                step="1"
                                                value={form.workload}
                                                onChange={handleChange}
                                            />                                        </div>
                                        {errors.workload && <span className="error">{errors.workload}</span>}
                                        <div className="providerpostjob-input-hint">Enter How much work </div>
                                    </div>

                                    <div className="providerpostjob-form-group">
                                        <label htmlFor="salaryPeriod" className="providerpostjob-form-label">
                                            Work Period <span className="providerpostjob-required">*</span>
                                        </label>
                                        <select id="workPeriod" name="workPeriod" className="providerpostjob-form-select" value={form.workPeriod} onChange={handleChange}>
                                            <option value="">Select period</option>
                                            <option value="per-day">Per Day</option>
                                            <option value="per-week">Per Week</option>
                                            <option value="per-month">Per Month</option>
                                            <option value="hourly">Per Hour</option>
                                        </select>
                                        {errors.workPeriod && <span className="error">{errors.workPeriod}</span>}
                                        <div className="providerpostjob-input-hint">work per period</div>
                                    </div>
                                </div>
                            </div>
                            <div className="providerpostjob-form-section">
                                <h3 className="providerpostjob-section-title">
                                    <i className="fas fa-file-alt"></i>
                                    Job Description
                                </h3>

                                <div className="providerpostjob-form-row">
                                    <div className="providerpostjob-form-group providerpostjob-full-width">
                                        <label htmlFor="jobDescription" className="providerpostjob-form-label">
                                            Job Description <span className="providerpostjob-required">*</span>
                                        </label>
                                        <textarea
                                            id="jobDescription"
                                            name="jobDescription"
                                            className="providerpostjob-form-textarea"
                                            rows="8"
                                            placeholder="Describe the role, responsibilities, and requirements in detail. Include:&#10;• Key responsibilities&#10;• Required skills and qualifications&#10;• Day-to-day tasks&#10;• Team structure&#10;• Growth opportunities"
                                            value={form.jobDescription.trim()}
                                            onChange={handleChange}
                                        ></textarea>
                                        {errors.jobDescription && <span className="error">{errors.jobDescription}</span>}
                                        <div className="providerpostjob-character-count">
                                            <span id="descriptionCount">{form.jobDescription.split("").length}</span>characters
                                        </div>
                                        <div className="providerpostjob-input-hint">Provide a comprehensive description of the job role</div>
                                    </div>
                                </div>
                            </div>


                            <div className="providerpostjob-form-actions">
                                <button type="button" className="providerpostjob-btn-preview" onClick={handlePreview}>
                                    <i className="fas fa-eye"></i>
                                    Preview Job
                                </button>
                                <button
                                    type="submit"
                                    name="submit"
                                    className={`providerpostjob-btn-primary ${isPosting ? 'providerpostjob-btn-loading' : ''}`}
                                    disabled={isPosting}
                                    onClick={handlePreview}
                                >
                                    {isPosting ? 'Posting...' : 'Post Job'}
                                    <i className={`fas ${isPosting ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
                                </button>
                            </div>
                        </form>
                    </section>
                    {previewOpen && (
                        <div id="jobPreviewModal" className="providerpostjob-modal active">
                            <div className="providerpostjob-modal-content active">
                                <div className="providerpostjob-modal-header">
                                    <h3>Job Preview</h3>
                                    <button type="button" className="providerpostjob-modal-close" onClick={closePreview}>
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                                <div className="providerpostjob-modal-body" id="jobPreviewContent">
                                    <div className="providerpostjob-job-preview">
                                        <div className="providerpostjob-preview-header">
                                            <div className="providerpostjob-preview-company">
                                                <div>
                                                    <h2>{form.jobTitle}</h2>
                                                    <p>{Providerdata?.company_name ? Providerdata?.company_name : "Loading"}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="providerpostjob-preview-details">
                                            <div className="providerpostjob-detail-grid">
                                                <div className="providerpostjob-detail-item">
                                                    <strong>Job Type:</strong>
                                                    <div>{form?.jobType}</div>
                                                </div>
                                                <div className="providerpostjob-detail-item">
                                                    <strong>Location:</strong>
                                                    <div>{form?.location}</div>
                                                </div>
                                                <div className="providerpostjob-detail-item">
                                                    <strong>Salary:</strong>
                                                    <div>₹{form?.salaryAmount} {form.salaryPeriod}</div>
                                                </div>
                                                <div className="providerpostjob-detail-item">
                                                    <strong>Posted:</strong>
                                                    <div>{form?.postedDate}</div>
                                                </div>
                                                <div className="providerpostjob-detail-item">
                                                    <strong>Work:</strong>
                                                    <div>{form?.workload} hrs {form.workPeriod}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="providerpostjob-preview-section">
                                            <h3>Job Description</h3>
                                            <div className="providerpostjob-preview-content">{form.jobDescription}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="providerpostjob-modal-footer">
                                    <button type="button" className="providerpostjob-btn-secondary" onClick={closePreview}>
                                        <i className="fas fa-edit"></i>
                                        Edit Job
                                    </button>
                                    <button
                                        type="button"
                                        className={`providerpostjob-btn-primary ${isPosting ? 'providerpostjob-btn-loading' : ''}`}
                                        onClick={submitFromPreview}
                                        disabled={isPosting}
                                    >
                                        {isPosting ? 'Posting...' : 'Post Job'}
                                        <i className={`fas ${isPosting ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {successStatus && (
                        <div id="successModal" className="providerpostjob-modal active">
                            <div className="providerpostjob-modal-content providerpostjob-success-modal">
                                <div className="providerpostjob-success-icon">
                                    <i className="fas fa-check-circle"></i>
                                </div>
                                <h3>{`Job ${isUpdateJob? 'Updated' :'Posted'} Successfully!`}</h3>
                                <p>Your job posting has been published and is now live on PartTimeConnect.</p>
                                
                                <div className="providerpostjob-success-actions">
                                    <button type="button" className="providerpostjob-btn-secondary" onClick={closeSucess}>
                                        <i className="fas fa-plus"></i>
                                        Post Another Job
                                    </button>
                                    <button type="button" className="providerpostjob-btn-primary" onClick={() => (dashboardNavigate('/providerdashboard'))} >
                                        <i className="fas fa-tachometer-alt"></i>
                                        View Dashboard
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {
                        somethingWrong && <SomethingWentWrong retryFunction={()=>(setSomethingWrong(false))} />
                    }
                </div>
            </div>

        </>
    )
}
