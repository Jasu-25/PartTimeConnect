import { ProviderHeader } from './ProviderHeader'
import './ProviderJobsOverview.css'

export function ProviderJobsOverview() {
    return (
        <div className="providerjobsoverview">
            <ProviderHeader/>
            <div className="main-content">
                <div className="container">
                    <section className="company-header">
                        <div className="company-logo-container">
                            <h3 className="company-logo"></h3>
                        </div>
                        <div className="company-info">
                            <h1 className="company-name">TechStart Solutions</h1>
                            <p className="company-tagline">Innovating the future, one solution at a time.</p>
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


                            <a href="job-details-applicants.html?jobId=2" className="job-card">
                                <div className="job-card-header">
                                    <h3 className="job-title">Remote Customer Support Specialist</h3>
                                    <span className="job-type">Remote</span>
                                </div>
                                <div className="job-card-details">
                                    <p className="job-salary"><i className="fas fa-dollar-sign"></i> ₹20,000 / month</p>
                                    <p className="job-location"><i className="fas fa-globe"></i> Remote</p>
                                    <p className="job-posted-date"><i className="fas fa-calendar-alt"></i> Posted 5 days ago</p>
                                </div>
                                <div className="job-card-footer">
                                    <span className="applicants-count"><i className="fas fa-users"></i> 22 Applied</span>
                                    <span className="job-status active"><i className="fas fa-circle"></i> Active</span>
                                </div>
                            </a>


                            <a href="job-details-applicants.html?jobId=3" className="job-card">
                                <div className="job-card-header">
                                    <h3 className="job-title">Internship - Software Development</h3>
                                    <span className="job-type">Internship</span>
                                </div>
                                <div className="job-card-details">
                                    <p className="job-salary"><i className="fas fa-dollar-sign"></i> ₹10,000 / month</p>
                                    <p className="job-location"><i className="fas fa-map-marker-alt"></i> Bengaluru, India</p>
                                    <p className="job-posted-date"><i className="fas fa-calendar-alt"></i> Posted 1 week ago</p>
                                </div>
                                <div className="job-card-footer">
                                    <span className="applicants-count"><i className="fas fa-users"></i> 30 Applied</span>
                                    <span className="job-status active"><i className="fas fa-circle"></i> Active</span>
                                </div>
                            </a>


                            <a href="job-details-applicants.html?jobId=4" className="job-card">
                                <div className="job-card-header">
                                    <h3 className="job-title">Full-Time Data Analyst</h3>
                                    <span className="job-type">Full-Time</span>
                                </div>
                                <div className="job-card-details">
                                    <p className="job-salary"><i className="fas fa-dollar-sign"></i> ₹45,000 / month</p>
                                    <p className="job-location"><i className="fas fa-map-marker-alt"></i> New York, NY</p>
                                    <p className="job-posted-date"><i className="fas fa-calendar-alt"></i> Posted 3 weeks ago</p>
                                </div>
                                <div className="job-card-footer">
                                    <span className="applicants-count"><i className="fas fa-users"></i> 18 Applied</span>
                                    <span className="job-status inactive"><i className="fas fa-circle"></i> Closed</span>
                                </div>
                            </a>


                            <a href="job-details-applicants.html?jobId=5" className="job-card">
                                <div className="job-card-header">
                                    <h3 className="job-title">Part-Time Graphic Designer</h3>
                                    <span className="job-type">Part-Time</span>
                                </div>
                                <div className="job-card-details">
                                    <p className="job-salary"><i className="fas fa-dollar-sign"></i> ₹18,000 / month</p>
                                    <p className="job-location"><i className="fas fa-map-marker-alt"></i> London, UK</p>
                                    <p className="job-posted-date"><i className="fas fa-calendar-alt"></i> Posted 1 month ago</p>
                                </div>
                                <div className="job-card-footer">
                                    <span className="applicants-count"><i className="fas fa-users"></i> 10 Applied</span>
                                    <span className="job-status active"><i className="fas fa-circle"></i> Active</span>
                                </div>
                            </a>


                            <a href="job-details-applicants.html?jobId=6" className="job-card">
                                <div className="job-card-header">
                                    <h3 className="job-title">Remote Content Writer</h3>
                                    <span className="job-type">Remote</span>
                                </div>
                                <div className="job-card-details">
                                    <p className="job-salary"><i className="fas fa-dollar-sign"></i> ₹22,000 / month</p>
                                    <p className="job-location"><i className="fas fa-globe"></i> Remote</p>
                                    <p className="job-posted-date"><i className="fas fa-calendar-alt"></i> Posted 2 months ago</p>
                                </div>
                                <div className="job-card-footer">
                                    <span className="applicants-count"><i className="fas fa-users"></i> 12 Applied</span>
                                    <span className="job-status inactive"><i className="fas fa-circle"></i> Closed</span>
                                </div>
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
