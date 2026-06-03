import React, { useState, useRef } from 'react';
import { ProviderHeader } from './ProviderHeader';
import './ProviderPostJob.css';
export default function ProviderPostJob() {
    const [form, setForm] = useState({
        jobTitle: '',
        jobType: '',
        location: '',
        salaryAmount: '',
        salaryPeriod: '',
        workload: '',
        workPeriod: '',
        experienceRequired: '',
        postedDate: '',
        jobDescription: '',
        whatTheyOffer: ''
    });
    const [offers, setOffers] = useState([]);
    const [offerInput, setOfferInput] = useState('');
    const [errors, setErrors] = useState({});
    const offerInputRef = useRef(null);

    const validators = {
        jobTitle: v => v.trim() ? '' : 'Job title is required.',
        jobType: v => v ? '' : 'Select a job type.',
        location: v => v.trim() ? '' : 'Location is required.',
        salaryAmount: v => v && Number(v) > 0 ? '' : 'Enter a valid salary.',
        salaryPeriod: v => v ? '' : 'Select salary period.',
        workload: v => v && Number(v) > 0 ? '' : 'Enter work load.',
        workPeriod: v => v ? '' : 'Select work period.',
        experienceRequired: v => v ? '' : 'Select experience level.',
        postedDate: v => v ? '' : 'Select a posted date.',
        jobDescription: v => v.trim().length >= 20 ? '' : 'Description must be at least 20 characters.',
        whatTheyOffer: v => v.trim() ? '' : 'Add at least one benefit.'
    };

    const validateField = (name, value) => {
        const fn = validators[name];
        return fn ? fn(value) : '';
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        const err = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: err }));
    };

    const addOffer = (offer) => {
        if (!offer) return;
        setOffers((prev) => {
            if (prev.includes(offer)) {
                return prev.filter((o) => o !== offer);
            } else {
                return [...prev, offer];
            }
        });
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = offerInput.trim();
            if (val) {
                addOffer(val);
                setOfferInput('');
            }
        }
    };

    const handleAddClick = () => {
        const val = offerInput.trim();
        if (val) {
            addOffer(val);
            setOfferInput('');
        }
    };

    const handleTextareaChange = (e) => {
        const lines = e.target.value
            .split(/\r?\n/)
            .map((l) => l.trim())
            .filter(Boolean);
        setOffers(lines);
        // also update form field since controlled
        setForm(prev => ({ ...prev, whatTheyOffer: lines.join('\n') }));
        setErrors(prev => ({ ...prev, whatTheyOffer: validateField('whatTheyOffer', lines.join('\n')) }));
    };

    const validateAll = () => {
        const errs = {};
        if (offers.length === 0) {
            errs.offers = 'Please add at least one benefit.';
            if (offerInputRef.current) offerInputRef.current.focus();
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateAll()) return;
        // gather payload
        const payload = { ...form, whatTheyOffer: offers.join('\n') };
        console.log('submit payload', payload);
        // TODO: axios post
    };

    return (
        <>
            <ProviderHeader />
            <div className="providerpostjob-main-content">
                <div className="providerpostjob-container">
                    <section className="providerpostjob-company-header">
                        <div className="providerpostjob-company-logo-container">
                            <h3 className="providerpostjob-company-logo"></h3>
                        </div>
                        <div className="providerpostjob-company-info">
                            <h1 className="providerpostjob-company-name">TechStart Solutions</h1>
                            <div className="providerpostjob-company-details">
                                <span className="providerpostjob-company-rating">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star-half-alt"></i>
                                    <span className="providerpostjob-rating-text">4.5 (127 reviews)</span>
                                </span>
                                <span className="providerpostjob-company-size">
                                    <i className="fas fa-users"></i>
                                    50-100 employees
                                </span>
                                <span className="providerpostjob-company-location">
                                    <i className="fas fa-map-marker-alt"></i>
                                    San Francisco, CA
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

                        <form className="providerpostjob-job-form" id="jobPostingForm" onSubmit={handleSubmit}>
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
                                            required
                                        />
                                        {errors.jobTitle && <span className="error">{errors.jobTitle}</span>}
                                        <div className="providerpostjob-input-hint">Enter a clear and descriptive job title</div>
                                    </div>
                                </div>

                                <div className="providerpostjob-form-row">
                                    <div className="providerpostjob-form-group">
                                        <label htmlFor="jobType" className="providerpostjob-form-label">
                                            Job Type <span className="providerpostjob-required">*</span>
                                        </label>
                                        <select id="jobType" name="jobType" className="providerpostjob-form-select" value={form.jobType} onChange={handleChange} required>
                                            <option value="">Select job type</option>
                                            <option value="part-time">Part-Time</option>
                                            <option value="full-time">Full-Time</option>
                                            <option value="internship">Internship</option>
                                            <option value="remote">Remote</option>
                                            <option value="contract">Contract</option>
                                            <option value="freelance">Freelance</option>
                                        </select>
                                        {errors.jobType && <span className="error">{errors.jobType}</span>}
                                        <div className="providerpostjob-input-hint">Choose the employment type</div>
                                    </div>

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
                                            required
                                        />
                                        {errors.location && <span className="error">{errors.location}</span>}
                                        <div className="providerpostjob-input-hint">City, state or "Remote" for remote positions</div>
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
                                                required
                                            />                                            {errors.salaryAmount && <span className="error">{errors.salaryAmount}</span>}
                                        </div>
                                        <div className="providerpostjob-input-hint">Enter the salary amount in rupees</div>
                                    </div>

                                    <div className="providerpostjob-form-group">
                                        <label htmlFor="salaryPeriod" className="providerpostjob-form-label">
                                            Salary Period <span className="providerpostjob-required">*</span>
                                        </label>
                                        <select id="salaryPeriod" name="salaryPeriod" className="providerpostjob-form-select" value={form.salaryPeriod} onChange={handleChange} required>
                                            <option value="">Select period</option>
                                            <option value="per-day">Per Day</option>
                                            <option value="per-week">Per Week</option>
                                            <option value="per-month">Per Month</option>
                                            <option value="per-year">Per Year</option>
                                            <option value="hourly">Per Hour</option>
                                        </select>
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
                                                required
                                            />                                            {errors.workload && <span className="error">{errors.workload}</span>}                                        </div>
                                        <div className="providerpostjob-input-hint">Enter How much work </div>
                                    </div>

                                    <div className="providerpostjob-form-group">
                                        <label htmlFor="salaryPeriod" className="providerpostjob-form-label">
                                            Work Period <span className="providerpostjob-required">*</span>
                                        </label>
                                        <select id="workPeriod" name="workPeriod" className="providerpostjob-form-select" value={form.workPeriod} onChange={handleChange} required>
                                            <option value="">Select period</option>
                                            <option value="per-day">Per Day</option>
                                            <option value="per-week">Per Week</option>
                                            <option value="per-month">Per Month</option>
                                            <option value="hourly">Per Hour</option>
                                        </select>
                                        <div className="providerpostjob-input-hint">work per period</div>
                                    </div>
                                </div>
                            </div>
                            <div className="providerpostjob-form-section">
                                <h3 className="providerpostjob-section-title">
                                    <i className="fas fa-graduation-cap"></i>
                                    Job Requirements
                                </h3>

                                <div className="providerpostjob-form-row">
                                    <div className="providerpostjob-form-group">
                                        <label htmlFor="experienceRequired" className="providerpostjob-form-label">
                                            Experience Required <span className="providerpostjob-required">*</span>
                                        </label>
                                        <select id="experienceRequired" name="experienceRequired" className="providerpostjob-form-select" value={form.experienceRequired} onChange={handleChange} required>
                                            <option value="">Select experience level</option>
                                            <option value="entry-level">Entry Level (0-1 years)</option>
                                            <option value="junior">Junior (1-2 years)</option>
                                            <option value="mid-level">Mid Level (2-5 years)</option>
                                            <option value="senior">Senior (5+ years)</option>
                                            <option value="no-experience">No Experience Required</option>
                                        </select>
                                        <div className="providerpostjob-input-hint">Minimum experience required for this role</div>
                                    </div>

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
                                            required
                                        />
                                        {errors.postedDate && <span className="error">{errors.postedDate}</span>}
                                        <div className="providerpostjob-input-hint">When this job posting should go live</div>
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
                                            value={form.jobDescription}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                        {errors.jobDescription && <span className="error">{errors.jobDescription}</span>}
                                        <div className="providerpostjob-character-count">
                                            <span id="descriptionCount">0</span> / 2000 characters
                                        </div>
                                        <div className="providerpostjob-input-hint">Provide a comprehensive description of the job role</div>
                                    </div>
                                </div>
                            </div>
                            <div className="providerpostjob-form-section">
                                <h3 className="providerpostjob-section-title">
                                    <i className="fas fa-gift"></i>
                                    What We Offer
                                </h3>

                                <div className="providerpostjob-form-row">
                                    <div className="providerpostjob-form-group providerpostjob-full-width">
                                        <label htmlFor="whatTheyOffer" className="providerpostjob-form-label">
                                            Benefits & Perks <span className="providerpostjob-required">*</span>
                                        </label>
                                        <textarea
                                            id="whatTheyOffer"
                                            name="whatTheyOffer"
                                            className="providerpostjob-form-textarea"
                                            rows="6"
                                            placeholder="List the benefits, perks, and facilities you offer:&#10;• Competitive salary with performance bonuses&#10;• Flexible working hours&#10;• Health insurance coverage&#10;• Free meals and snacks&#10;• Professional development opportunities&#10;• Remote work options&#10;• Paid time off"
                                            value={offers.join('\n')}
                                            onChange={handleTextareaChange}
                                        />
                                        <div className="providerpostjob-offer-input">
                                            <input
                                                type="text"
                                                ref={offerInputRef}
                                                value={offerInput}
                                                onChange={(e) => setOfferInput(e.target.value)}
                                                onKeyDown={handleInputKeyDown}
                                                placeholder="Type benefit and press Enter or click Add"
                                            />
                                            <button type="button" onClick={handleAddClick}>Add</button>
                                        </div>
                                        {errors.offers && <span className="error">{errors.offers}</span>}
                                        <div className="providerpostjob-input-hint">Highlight what makes your company attractive to candidates</div>
                                    </div>
                                </div>
                                <div className="providerpostjob-form-row">
                                    <div className="providerpostjob-form-group providerpostjob-full-width">
                                        <label className="providerpostjob-form-label">Quick Add Benefits</label>
                                        <div className="providerpostjob-benefits-grid">
                                            <button type="button" className={`providerpostjob-benefit-tag ${offers.includes('Flexible working hours') ? 'selected' : ''}`} onClick={() => addOffer('Flexible working hours')}>
                                                <i className="fas fa-clock"></i> Flexible Hours
                                            </button>
                                            <button type="button" className={`providerpostjob-benefit-tag ${offers.includes('Health insurance coverage') ? 'selected' : ''}`} onClick={() => addOffer('Health insurance coverage')}>
                                                <i className="fas fa-heart"></i> Health Insurance
                                            </button>
                                            <button type="button" className={`providerpostjob-benefit-tag ${offers.includes('Free meals and snacks') ? 'selected' : ''}`} onClick={() => addOffer('Free meals and snacks')}>
                                                <i className="fas fa-utensils"></i> Free Meals
                                            </button>
                                            <button type="button" className={`providerpostjob-benefit-tag ${offers.includes('Remote work options') ? 'selected' : ''}`} onClick={() => addOffer('Remote work options')}>
                                                <i className="fas fa-home"></i> Remote Work
                                            </button>
                                            <button type="button" className={`providerpostjob-benefit-tag ${offers.includes('Paid time off') ? 'selected' : ''}`} onClick={() => addOffer('Paid time off')}>
                                                <i className="fas fa-calendar-alt"></i> Paid Time Off
                                            </button>
                                            <button type="button" className={`providerpostjob-benefit-tag ${offers.includes('Performance bonuses') ? 'selected' : ''}`} onClick={() => addOffer('Performance bonuses')}>
                                                <i className="fas fa-trophy"></i> Performance Bonuses
                                            </button>
                                            <button type="button" className={`providerpostjob-benefit-tag ${offers.includes('Team building activities') ? 'selected' : ''}`} onClick={() => addOffer('Team building activities')}>
                                                <i className="fas fa-users"></i> Team Building
                                            </button>
                                        </div>
                                        <div className="providerpostjob-input-hint">Click on benefits to add them to your description</div>
                                    </div>
                                </div>
                            </div>

                            <div className="providerpostjob-form-actions">
                                <button type="button" className="providerpostjob-btn-preview" >
                                    <i className="fas fa-eye"></i>
                                    Preview Job
                                </button>
                                <button type="submit" name="submit" className="providerpostjob-btn-primary">
                                    <i className="fas fa-paper-plane"></i>
                                    Post Job
                                </button>
                            </div>
                        </form>
                    </section>
                    <div id="jobPreviewModal" className="providerpostjob-modal ">
                        <div className="providerpostjob-modal-content">
                            <div className="providerpostjob-modal-header">
                                <h3>Job Preview</h3>
                                <button type="button" className="providerpostjob-modal-close" >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                            <div className="providerpostjob-modal-body" id="jobPreviewContent">
                                <div className="providerpostjob-job-preview">
                                    <div className="providerpostjob-preview-header">
                                        <div className="providerpostjob-preview-company">
                                            <div>
                                                <h2></h2>
                                                <p>TechStart Solutions</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="providerpostjob-preview-details">
                                        <div className="providerpostjob-detail-grid">
                                            <div className="providerpostjob-detail-item">
                                                <strong>Job Type:</strong>
                                            </div>
                                            <div className="providerpostjob-detail-item">
                                                <strong>Location:</strong>
                                            </div>
                                            <div className="providerpostjob-detail-item">
                                                <strong>Salary:</strong>
                                            </div>
                                            <div className="providerpostjob-detail-item">
                                                <strong>Experience:</strong>
                                            </div>
                                            <div className="providerpostjob-detail-item">
                                                <strong>Posted:</strong>
                                            </div>
                                            <div className="providerpostjob-detail-item">
                                                <strong>Work:</strong>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="providerpostjob-preview-section">
                                        <h3>Job Description</h3>
                                        <div className="providerpostjob-preview-content"></div>
                                    </div>

                                    <div className="providerpostjob-preview-section">
                                        <h3>What We Offer</h3>
                                        <div className="providerpostjob-preview-content"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="providerpostjob-modal-footer">
                                <button type="button" className="providerpostjob-btn-secondary" >
                                    <i className="fas fa-edit"></i>
                                    Edit Job
                                </button>
                                <button type="button" className="providerpostjob-btn-primary" >
                                    <i className="fas fa-paper-plane"></i>
                                    Post Job
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id="successModal" className="providerpostjob-modal">
                        <div className="providerpostjob-modal-content providerpostjob-success-modal">
                            <div className="providerpostjob-success-icon">
                                <i className="fas fa-check-circle"></i>
                            </div>
                            <h3>Job Posted Successfully!</h3>
                            <p>Your job posting has been published and is now live on PartTimeConnect.</p>
                            <div className="providerpostjob-success-stats">
                                <div className="providerpostjob-stat-item">
                                    <span className="providerpostjob-stat-number">24/7</span>
                                    <span className="providerpostjob-stat-label">Visibility</span>
                                </div>
                                <div className="providerpostjob-stat-item">
                                    <span className="providerpostjob-stat-number">1000+</span>
                                    <span className="providerpostjob-stat-label">Daily Visitors</span>
                                </div>
                                <div className="providerpostjob-stat-item">
                                    <span className="providerpostjob-stat-number">85%</span>
                                    <span className="providerpostjob-stat-label">Match Rate</span>
                                </div>
                            </div>
                            <div className="providerpostjob-success-actions">
                                <button type="button" className="providerpostjob-btn-secondary" >
                                    <i className="fas fa-plus"></i>
                                    Post Another Job
                                </button>
                                <button type="button" className="providerpostjob-btn-primary" >
                                    <i className="fas fa-tachometer-alt"></i>
                                    View Dashboard
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
