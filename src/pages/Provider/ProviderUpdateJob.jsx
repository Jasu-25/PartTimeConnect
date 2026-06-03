import { ProviderHeader } from './ProviderHeader';
import './ProviderUpdateJob.css';
export default function ProviderUpdateJob() {
    return (
        <>
            <ProviderHeader/>
            <div className="providerupdatejob-main-content">
                <div className="providerupdatejob-container">
                    <section className="providerupdatejob-company-header">
                        <div className="providerupdatejob-company-logo-container">
                            <h3 className="providerupdatejob-company-logo"></h3>
                        </div>
                        <div className="providerupdatejob-company-info">
                            <h1 className="providerupdatejob-company-name providerupdatejob-namecompany">TechStart Solutions</h1>
                            <div className="providerupdatejob-company-details">
                                <span className="providerupdatejob-company-rating">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star-half-alt"></i>
                                    <span className="providerupdatejob-rating-text">4.5 (127 reviews)</span>
                                </span>
                                <span className="providerupdatejob-company-size">
                                    <i className="fas fa-users"></i>
                                    50-100 employees
                                </span>
                                <span className="providerupdatejob-company-location">
                                    <i className="fas fa-map-marker-alt"></i>
                                    San Francisco, CA
                                </span>
                            </div>
                        </div>
                    </section>

                    <section className="providerupdatejob-job-form-section">
                        <div className="providerupdatejob-form-header">
                            <h2>
                                <i className="fas fa-plus-circle"></i>
                                Update Job
                            </h2>
                        </div>

                        <form className="providerupdatejob-job-form" onSubmit={(e) => e.preventDefault()} id="jobPostingForm">
                                <div className="providerupdatejob-form-section">
                                <h3 className="providerupdatejob-section-title">
                                    <i className="fas fa-info-circle"></i>
                                    Basic Job Information
                                </h3>

                                <div className="providerupdatejob-form-row">
                                    <div className="providerupdatejob-form-group">
                                        <label htmlFor="jobTitle" className="providerupdatejob-form-label">
                                            Job Title <span className="providerupdatejob-required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="jobTitle"
                                            name="jobTitle"
                                            className="providerupdatejob-form-input"
                                            placeholder="e.g., Part-Time Marketing Assistant"
                                            required
                                        />
                                        <div className="providerupdatejob-input-hint">Enter a clear and descriptive job title</div>
                                    </div>
                                </div>

                                <div className="providerupdatejob-form-row">
                                    <div className="providerupdatejob-form-group">
                                        <label htmlFor="jobType" className="providerupdatejob-form-label">
                                            Job Type <span className="providerupdatejob-required">*</span>
                                        </label>
                                        <select id="jobType" name="jobType" className="providerupdatejob-form-select" required>
                                            <option value="">Select job type</option>
                                            <option value="part-time">Part-Time</option>
                                            <option value="full-time">Full-Time</option>
                                            <option value="internship">Internship</option>
                                            <option value="remote">Remote</option>
                                            <option value="contract">Contract</option>
                                            <option value="freelance">Freelance</option>
                                        </select>
                                        <div className="providerupdatejob-input-hint">Choose the employment type</div>
                                    </div>

                                    <div className="providerupdatejob-form-group">
                                        <label htmlFor="location" className="providerupdatejob-form-label">
                                            Location <span className="providerupdatejob-required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="location"
                                            name="location"
                                            className="providerupdatejob-form-input"
                                            placeholder="e.g., San Francisco, CA or Remote"
                                            required
                                        />
                                        <div className="providerupdatejob-input-hint">City, state or "Remote" for remote positions</div>
                                    </div>
                                </div>
                            </div>

                            <div className="providerupdatejob-form-section">
                                <h3 className="providerupdatejob-section-title">
                                    <i className="fas fa-dollar-sign"></i>
                                    Compensation Details
                                </h3>

                                <div className="providerupdatejob-form-row">
                                    <div className="providerupdatejob-form-group">
                                        <label htmlFor="salaryAmount" className="providerupdatejob-form-label">
                                            Salary Amount <span className="providerupdatejob-required">*</span>
                                        </label>
                                        <div className="providerupdatejob-input-group">
                                            <span className="providerupdatejob-input-prefix">₹</span>
                                            <input
                                                type="number"
                                                id="salaryAmount"
                                                name="salaryAmount"
                                                className="providerupdatejob-form-input"
                                                placeholder="25000"
                                                min="1"
                                                step="1000"
                                                required
                                            />
                                        </div>
                                        <div className="providerupdatejob-input-hint">Enter the salary amount in rupees</div>
                                    </div>

                                    <div className="providerupdatejob-form-group">
                                        <label htmlFor="salaryPeriod" className="providerupdatejob-form-label">
                                            Salary Period <span className="providerupdatejob-required">*</span>
                                        </label>
                                        <select id="salaryPeriod" name="salaryPeriod" className="providerupdatejob-form-select" required>
                                            <option value="">Select period</option>
                                            <option value="per-day">Per Day</option>
                                            <option value="per-week">Per Week</option>
                                            <option value="per-month">Per Month</option>
                                            <option value="per-year">Per Year</option>
                                            <option value="hourly">Per Hour</option>
                                        </select>
                                        <div className="providerupdatejob-input-hint">How often the salary is paid</div>
                                    </div>
                                </div>
                            </div>

                            <div className="providerupdatejob-form-section">
                                <h3 className="providerupdatejob-section-title">
                                    <i className="fas fa-clock"></i>
                                    Working Hours
                                </h3>

                                <div className="providerupdatejob-form-row">
                                    <div className="providerupdatejob-form-group">
                                        <label htmlFor="workload" className="providerupdatejob-form-label">
                                            Work Load<span className="providerupdatejob-required">*</span>
                                        </label>
                                        <div className="providerupdatejob-input-group">
                                            <span className="providerupdatejob-input-prefix" style={{ color: 'var(--blue)' }}><i className="fas fa-clock"></i></span>
                                            <input
                                                type="number"
                                                id="workload"
                                                name="workload"
                                                className="providerupdatejob-form-input"
                                                placeholder="2hours"
                                                min="1"
                                                step="1000"
                                                required
                                            />
                                        </div>
                                        <div className="providerupdatejob-input-hint">Enter How much work </div>
                                    </div>

                                    <div className="providerupdatejob-form-group">
                                        <label htmlFor="workPeriod" className="providerupdatejob-form-label">
                                            Work Period <span className="providerupdatejob-required">*</span>
                                        </label>
                                        <select id="workPeriod" name="workPeriod" className="providerupdatejob-form-select" required>
                                            <option value="">Select period</option>
                                            <option value="per-day">Per Day</option>
                                            <option value="per-week">Per Week</option>
                                            <option value="per-month">Per Month</option>
                                            <option value="hourly">Per Hour</option>
                                        </select>
                                        <div className="providerupdatejob-input-hint">work per period</div>
                                    </div>
                                </div>
                            </div>

                            <div className="providerupdatejob-form-section">
                                <h3 className="providerupdatejob-section-title">
                                    <i className="fas fa-graduation-cap"></i>
                                    Job Requirements
                                </h3>

                                <div className="providerupdatejob-form-row">
                                    <div className="providerupdatejob-form-group">
                                        <label htmlFor="experienceRequired" className="providerupdatejob-form-label">
                                            Experience Required <span className="providerupdatejob-required">*</span>
                                        </label>
                                        <select id="experienceRequired" name="experienceRequired" className="providerupdatejob-form-select" required>
                                            <option value="">Select experience level</option>
                                            <option value="entry-level">Entry Level (0-1 years)</option>
                                            <option value="junior">Junior (1-2 years)</option>
                                            <option value="mid-level">Mid Level (2-5 years)</option>
                                            <option value="senior">Senior (5+ years)</option>
                                            <option value="no-experience">No Experience Required</option>
                                        </select>
                                        <div className="providerupdatejob-input-hint">Minimum experience required for this role</div>
                                    </div>

                                    <div className="providerupdatejob-form-group">
                                        <label htmlFor="postedDate" className="providerupdatejob-form-label">
                                            Posted Date <span className="providerupdatejob-required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="postedDate"
                                            name="postedDate"
                                            className="providerupdatejob-form-input"
                                            placeholder="25-05-2008"
                                            required
                                        />
                                        <div className="providerupdatejob-input-hint">When this job posting should go live</div>
                                    </div>
                                </div>
                            </div>

                            <div className="providerupdatejob-form-section">
                                <h3 className="providerupdatejob-section-title">
                                    <i className="fas fa-file-alt"></i>
                                    Job Description
                                </h3>

                                <div className="providerupdatejob-form-row">
                                    <div className="providerupdatejob-form-group providerupdatejob-full-width">
                                        <label htmlFor="jobDescription" className="providerupdatejob-form-label">
                                            Job Description <span className="providerupdatejob-required">*</span>
                                        </label>
                                        <textarea
                                            id="jobDescription"
                                            name="jobDescription"
                                            className="providerupdatejob-form-textarea"
                                            rows="8"
                                            placeholder="Describe the role, responsibilities, and requirements in detail. Include:&#10;• Key responsibilities&#10;• Required skills and qualifications&#10;• Day-to-day tasks&#10;• Team structure&#10;• Growth opportunities"
                                            required
                                        ></textarea>
                                        <div className="providerupdatejob-character-count">
                                            <span id="descriptionCount">0</span> / 2000 characters
                                        </div>
                                        <div className="providerupdatejob-input-hint">Provide a comprehensive description of the job role</div>
                                    </div>
                                </div>
                            </div>

                            <div className="providerupdatejob-form-section">
                                <h3 className="providerupdatejob-section-title">
                                    <i className="fas fa-gift"></i>
                                    What We Offer
                                </h3>

                                <div className="providerupdatejob-form-row">
                                    <div className="providerupdatejob-form-group providerupdatejob-full-width">
                                        <label htmlFor="whatTheyOffer" className="providerupdatejob-form-label">
                                            Benefits & Perks <span className="providerupdatejob-required">*</span>
                                        </label>
                                        <textarea
                                            id="whatTheyOffer"
                                            name="whatTheyOffer"
                                            className="providerupdatejob-form-textarea"
                                            rows="6"
                                            placeholder="List the benefits, perks, and facilities you offer:&#10;• Competitive salary with performance bonuses&#10;• Flexible working hours&#10;• Health insurance coverage&#10;• Free meals and snacks&#10;• Professional development opportunities&#10;• Remote work options&#10;• Paid time off"
                                            required
                                        ></textarea>
                                        <div className="providerupdatejob-character-count">
                                            <span id="offersCount">0</span> / 1000 characters
                                        </div>
                                        <div className="providerupdatejob-input-hint">Highlight what makes your company attractive to candidates</div>
                                    </div>
                                </div>

                                <div className="providerupdatejob-form-row">
                                    <div className="providerupdatejob-form-group providerupdatejob-full-width">
                                        <label className="providerupdatejob-form-label">Quick Add Benefits</label>
                                        <div className="providerupdatejob-benefits-grid">
                                            <button type="button" className="providerupdatejob-benefit-tag" data-benefit="Flexible working hours">
                                                <i className="fas fa-clock"></i> Flexible Hours
                                            </button>
                                            <button type="button" className="providerupdatejob-benefit-tag" data-benefit="Health insurance coverage">
                                                <i className="fas fa-heart"></i> Health Insurance
                                            </button>
                                            <button type="button" className="providerupdatejob-benefit-tag" data-benefit="Free meals and snacks">
                                                <i className="fas fa-utensils"></i> Free Meals
                                            </button>
                                            <button type="button" className="providerupdatejob-benefit-tag" data-benefit="Remote work options">
                                                <i className="fas fa-home"></i> Remote Work
                                            </button>
                                            <button type="button" className="providerupdatejob-benefit-tag" data-benefit="Professional development opportunities">
                                                <i className="fas fa-graduation-cap"></i> Learning & Development
                                            </button>
                                            <button type="button" className="providerupdatejob-benefit-tag" data-benefit="Paid time off">
                                                <i className="fas fa-calendar-alt"></i> Paid Time Off
                                            </button>
                                            <button type="button" className="providerupdatejob-benefit-tag" data-benefit="Performance bonuses">
                                                <i className="fas fa-trophy"></i> Performance Bonuses
                                            </button>
                                            <button type="button" className="providerupdatejob-benefit-tag" data-benefit="Team building activities">
                                                <i className="fas fa-users"></i> Team Building
                                            </button>
                                        </div>
                                        <div className="providerupdatejob-input-hint">Click on benefits to add them to your description</div>
                                    </div>
                                </div>
                            </div>
                            <div className="providerupdatejob-form-actions">
                                <button type="button" className="providerupdatejob-btn-preview">
                                    <i className="fas fa-save"></i>
                                    update Job
                                </button>

                            </div>
                        </form>
                    </section>

                </div>
            </div>
        </>
    )
}
