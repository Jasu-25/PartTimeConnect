import { ProviderHeader } from './ProviderHeader'
import './ProviderJobsOverview.css'

export default function ProviderJobApplicants() {
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
                        </div>
                    </section>

                    <section className="job-details-section">
                        <div className="section-header">
                            <h2>
                                <i className="fas fa-briefcase"></i>
                                Job Details
                            </h2>
                            <div className="job-actions">
                                <button className="btn-secondary" >
                                    <i className="fas fa-edit"></i> Edit Job
                                </button>
                                <button className="btn-danger">
                                    <i className="fas fa-times-circle"></i> Close Job
                                </button>
                            </div>
                        </div>

                        <div className="job-details-card">
                            <div className="job-header">
                                <div className="job-title-section">
                                    <h3 className="job-title" id="jobTitle">Part-Time Marketing Assistant</h3>
                                    <span className="job-type" id="jobType">Part-Time</span>
                                </div>
                                <div className="job-meta">
                                    <span className="job-status active"><i className="fas fa-circle"></i> Active</span>
                                    <span className="job-posted-date"><i className="fas fa-calendar-alt"></i> Posted 2 days ago</span>
                                </div>
                            </div>

                            <div className="job-info-grid">
                                <div className="job-info-item">
                                    <i className="fas fa-dollar-sign"></i>
                                    <div>
                                        <span className="info-label">Salary</span>
                                        <span className="info-value" id="jobSalary">₹25,000 / month</span>
                                    </div>
                                </div>
                                <div className="job-info-item">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <div>
                                        <span className="info-label">Location</span>
                                        <span className="info-value" id="jobLocation">San Francisco, CA</span>
                                    </div>
                                </div>
                                <div className="job-info-item">
                                    <i className="fas fa-clock"></i>
                                    <div>
                                        <span className="info-label">Job Type</span>
                                        <span className="info-value" id="jobTypeDetail">Part-Time (20-25 hours/week)</span>
                                    </div>
                                </div>
                                <div className="job-info-item">
                                    <i className="fas fa-graduation-cap"></i>
                                    <div>
                                        <span className="info-label">Experience</span>
                                        <span className="info-value" id="jobExperience">1-2 years required</span>
                                    </div>
                                </div>
                                <div className="job-info-item">
                                    <i className="fas fa-users"></i>
                                    <div>
                                        <span className="info-label">Applicants</span>
                                        <span className="info-value" id="applicantsCount">15 Applied</span>
                                    </div>
                                </div>
                                <div className="job-info-item">
                                    <i className="fas fa-eye"></i>
                                    <div>
                                        <span className="info-label">Views</span>
                                        <span className="info-value" id="jobViews">127 Views</span>
                                    </div>
                                </div>
                            </div>

                            <div className="job-description">
                                <h4><i className="fas fa-file-alt"></i> Job Description</h4>
                                <div className="description-content" id="jobDescription">
                                    <p>We are seeking a dynamic and creative Part-Time Marketing Assistant to join our growing team at TechStart Solutions. This role is perfect for someone looking to gain valuable experience in digital marketing while maintaining flexibility in their schedule.</p>

                                    <h5>Key Responsibilities:</h5>
                                    <ul>
                                        <li>Assist in developing and implementing social media marketing strategies</li>
                                        <li>Create engaging content for various social media platforms</li>
                                        <li>Conduct market research and analyze competitor activities</li>
                                        <li>Support email marketing campaigns and newsletter creation</li>
                                        <li>Help organize and coordinate marketing events and webinars</li>
                                        <li>Assist with SEO optimization and content marketing efforts</li>
                                        <li>Prepare marketing reports and performance analytics</li>
                                    </ul>

                                    <h5>Required Qualifications:</h5>
                                    <ul>
                                        <li>Bachelor's degree in Marketing, Communications, or related field</li>
                                        <li>1-2 years of experience in digital marketing or related role</li>
                                        <li>Proficiency in social media platforms (Facebook, Instagram, LinkedIn, Twitter)</li>
                                        <li>Basic knowledge of marketing tools (Google Analytics, Mailchimp, Canva)</li>
                                        <li>Excellent written and verbal communication skills</li>
                                        <li>Strong attention to detail and organizational abilities</li>
                                        <li>Ability to work independently and meet deadlines</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="job-offers">
                                <h4><i className="fas fa-gift"></i> What We Offer</h4>
                                <div className="offers-content" id="jobOffers">
                                    <ul>
                                        <li>Competitive salary with performance-based bonuses</li>
                                        <li>Flexible working hours (20-25 hours per week)</li>
                                        <li>Remote work options available</li>
                                        <li>Professional development opportunities</li>
                                        <li>Health insurance coverage</li>
                                        <li>Paid time off and holidays</li>
                                        <li>Collaborative and innovative work environment</li>
                                        <li>Opportunity for career growth within the company</li>
                                    </ul>
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
                            <div className="jobapplicant-card">
                                <div className="applicant-header">
                                    <img src="../app/profile/assets/images/default-user-avatar.png" alt="Sarah Johnson" className="applicant-avatar" />
                                    <div className="applicant-info">
                                        <h4 className="applicant-name">Sarah Johnson</h4>
                                        <p className="applicant-title">Digital Marketing Specialist</p>
                                        <div className="applicant-meta">
                                            <span className="application-date"><i className="fas fa-calendar-alt"></i> Applied 1 day ago</span>
                                            <span className="applicant-status new"><i className="fas fa-circle"></i> New</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="applicant-bio">
                                    <p>Experienced marketing professional with 3+ years in digital marketing. Skilled in social media management, content creation, and analytics. Looking for flexible part-time opportunities to balance work and personal commitments.</p>
                                </div>
                                <div className="applicant-skills">
                                    <span className="skill-tag">Social Media Marketing</span>
                                    <span className="skill-tag">Content Creation</span>
                                    <span className="skill-tag">Google Analytics</span>
                                    <span className="skill-tag">SEO</span>
                                </div>
                                <div className="applicant-actions">
                                    <button className="btn-primary">
                                        <i className="fas fa-envelope"></i> Contact
                                    </button>
                                    <button className="btn-secondary" >
                                        <i className="fas fa-user"></i> View Profile
                                    </button>
                                    <button className="btn-success">
                                        <i className="fas fa-star"></i> Shortlist
                                    </button>
                                </div>
                            </div>

                            <div className="jobapplicant-card">
                                <div className="applicant-header">
                                    <img src="../app/profile/assets/images/default-user-avatar.png" alt="Michael Chen" className="applicant-avatar" />
                                    <div className="applicant-info">
                                        <h4 className="applicant-name">Michael Chen</h4>
                                        <p className="applicant-title">Marketing Coordinator</p>
                                        <div className="applicant-meta">
                                            <span className="application-date"><i className="fas fa-calendar-alt"></i> Applied 2 days ago</span>
                                            <span className="applicant-status reviewed"><i className="fas fa-circle"></i> Reviewed</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="applicant-bio">
                                    <p>Recent marketing graduate with internship experience at tech startups. Passionate about digital marketing trends and data-driven strategies. Seeking part-time role to gain more industry experience.</p>
                                </div>
                                <div className="applicant-skills">
                                    <span className="skill-tag">Email Marketing</span>
                                    <span className="skill-tag">Canva</span>
                                    <span className="skill-tag">Market Research</span>
                                    <span className="skill-tag">Adobe Creative Suite</span>
                                </div>
                                <div className="applicant-actions">
                                    <button className="btn-primary">
                                        <i className="fas fa-envelope"></i> Contact
                                    </button>
                                    <button className="btn-secondary">
                                        <i className="fas fa-user"></i> View Profile
                                    </button>
                                    <button className="btn-success">
                                        <i className="fas fa-star"></i> Shortlist
                                    </button>
                                </div>
                            </div>

                            <div className="jobapplicant-card">
                                <div className="applicant-header">
                                    <img src="../app/profile/assets/images/default-user-avatar.png" alt="Emily Rodriguez" className="applicant-avatar" />
                                    <div className="applicant-info">
                                        <h4 className="applicant-name">Emily Rodriguez</h4>
                                        <p className="applicant-title">Social Media Manager</p>
                                        <div className="applicant-meta">
                                            <span className="application-date"><i className="fas fa-calendar-alt"></i> Applied 3 days ago</span>
                                            <span className="applicant-status shortlisted"><i className="fas fa-circle"></i> Shortlisted</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="applicant-bio">
                                    <p>Creative social media expert with 2+ years managing brand accounts. Proven track record of increasing engagement and follower growth. Available for part-time remote work with flexible scheduling.</p>
                                </div>
                                <div className="applicant-skills">
                                    <span className="skill-tag">Instagram Marketing</span>
                                    <span className="skill-tag">Facebook Ads</span>
                                    <span className="skill-tag">Content Strategy</span>
                                    <span className="skill-tag">Influencer Outreach</span>
                                </div>
                                <div className="applicant-actions">
                                    <button className="btn-primary">
                                        <i className="fas fa-envelope"></i> Contact
                                    </button>
                                    <button className="btn-secondary">
                                        <i className="fas fa-user"></i> View Profile
                                    </button>
                                    <button className="btn-warning">
                                        <i className="fas fa-calendar-check"></i> Schedule Interview
                                    </button>
                                </div>
                            </div>

                            <div className="jobapplicant-card">
                                <div className="applicant-header">
                                    <img src="../app/profile/assets/images/default-user-avatar.png" alt="David Kim" className="applicant-avatar" />
                                    <div className="applicant-info">
                                        <h4 className="applicant-name">David Kim</h4>
                                        <p className="applicant-title">Content Marketing Specialist</p>
                                        <div className="applicant-meta">
                                            <span className="application-date"><i className="fas fa-calendar-alt"></i> Applied 1 week ago</span>
                                            <span className="applicant-status reviewed"><i className="fas fa-circle"></i> Reviewed</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="applicant-bio">
                                    <p>Freelance content creator with expertise in blog writing, email campaigns, and SEO optimization. Strong analytical skills and experience with marketing automation tools. Seeking stable part-time position.</p>
                                </div>
                                <div className="applicant-skills">
                                    <span className="skill-tag">Content Writing</span>
                                    <span className="skill-tag">SEO Optimization</span>
                                    <span className="skill-tag">Mailchimp</span>
                                    <span className="skill-tag">WordPress</span>
                                </div>
                                <div className="applicant-actions">
                                    <button className="btn-primary">
                                        <i className="fas fa-envelope"></i> Contact
                                    </button>
                                    <button className="btn-secondary">
                                        <i className="fas fa-user"></i> View Profile
                                    </button>
                                    <button className="btn-success">
                                        <i className="fas fa-star"></i> Shortlist
                                    </button>
                                </div>
                            </div>

                            <div className="jobapplicant-card">
                                <div className="applicant-header">
                                    <img src="../app/profile/assets/images/default-user-avatar.png" alt="Lisa Thompson" className="applicant-avatar" />
                                    <div className="applicant-info">
                                        <h4 className="applicant-name">Lisa Thompson</h4>
                                        <p className="applicant-title">Marketing Assistant</p>
                                        <div className="applicant-meta">
                                            <span className="application-date"><i className="fas fa-calendar-alt"></i> Applied 1 week ago</span>
                                            <span className="applicant-status new"><i className="fas fa-circle"></i> New</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="applicant-bio">
                                    <p>Entry-level marketing professional with strong academic background and internship experience. Eager to learn and contribute to a dynamic team. Available for flexible part-time hours including evenings and weekends.</p>
                                </div>
                                <div className="applicant-skills">
                                    <span className="skill-tag">Microsoft Office</span>
                                    <span className="skill-tag">Social Media</span>
                                    <span className="skill-tag">Research</span>
                                    <span className="skill-tag">Communication</span>
                                </div>
                                <div className="applicant-actions">
                                    <button className="btn-primary">
                                        <i className="fas fa-envelope"></i> Contact
                                    </button>
                                    <button className="btn-secondary">
                                        <i className="fas fa-user"></i> View Profile
                                    </button>
                                    <button className="btn-success">
                                        <i className="fas fa-star"></i> Shortlist
                                    </button>
                                </div>
                            </div>

                            <div className="jobapplicant-card">
                                <div className="applicant-header">
                                    <img src="../app/profile/assets/images/default-user-avatar.png" alt="James Wilson" className="applicant-avatar" />
                                    <div className="applicant-info">
                                        <h4 className="applicant-name">James Wilson</h4>
                                        <p className="applicant-title">Digital Marketing Analyst</p>
                                        <div className="applicant-meta">
                                            <span className="application-date"><i className="fas fa-calendar-alt"></i> Applied 2 weeks ago</span>
                                            <span className="applicant-status shortlisted"><i className="fas fa-circle"></i> Shortlisted</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="applicant-bio">
                                    <p>Data-driven marketing professional with expertise in analytics and performance optimization. Experience with A/B testing, conversion tracking, and ROI analysis. Looking for part-time role to supplement consulting work.</p>
                                </div>
                                <div className="applicant-skills">
                                    <span className="skill-tag">Google Analytics</span>
                                    <span className="skill-tag">Data Analysis</span>
                                    <span className="skill-tag">A/B Testing</span>
                                    <span className="skill-tag">Excel</span>
                                </div>
                                <div className="applicant-actions">
                                    <button className="btn-primary">
                                        <i className="fas fa-envelope"></i> Contact
                                    </button>
                                    <button className="btn-secondary">
                                        <i className="fas fa-user"></i> View Profile
                                    </button>
                                    <button className="btn-warning">
                                        <i className="fas fa-calendar-check"></i> Schedule Interview
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
