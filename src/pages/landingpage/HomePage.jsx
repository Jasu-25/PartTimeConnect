import {Link} from 'react-router';
import './HomePage.css';
export function HomePage() {

    return (
        <>    
        <title>PartTimeConnect - Find Your Perfect Part-Time Job</title>
        <div className="homepage">
            <nav className="navbar">
                <div className="nav-container">
                    <div className="nav-logo">
                        <h1><Link to="/" className='company-name'>PartTimeConnect</Link></h1>
                    </div>
                    <div className="nav-menu">
                        <a href="#how-it-works" className="nav-link">How It Works</a>
                        <a href="#features" className="nav-link">Features</a>
                        <a href="#benefits" className="nav-link">Testimonials</a>
                        <Link to="/login" className="nav-link login-link">Login</Link>
                        <Link to="/signup" className="btn btn-primary nav-cta">Sign Up</Link>
                    </div>
                    <div className="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
            <section className="hero">
                <div className="hero-background">
                    <img src="images/background.jpg" alt="Professional workplace" className="hero-bg-image" />
                    <div className="hero-overlay"></div>
                </div>
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1 className="hero-title">Find Your Perfect Part-Time Job, Locally</h1>
                            <p className="hero-subtitle">Connect with opportunities in your area. Whether you're seeking flexible work or looking to hire local talent, we make it simple.</p>

                            <div className="hero-search">
                                <div className="search-container">
                                    <i className="fas fa-search search-icon"></i>
                                    <input type="text" placeholder="Search jobs near me..." className="search-input" />
                                    <button className="search-btn">Search</button>
                                </div>
                            </div>

                            <div className="hero-ctas">
                                <a href="#" className="btn btn-primary btn-large">Find Jobs</a>
                                <a href="#" className="btn btn-secondary btn-large">Post Jobs</a>
                            </div>

                            <div className="trust-indicator">
                                <p><i className="fas fa-users"></i> Join 10,000+ local professionals</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="how-it-works" className="how-it-works">
                <div className="container">
                    <div className="section-header">
                        <h2>How It Works</h2>
                        <p>Simple steps to connect job seekers with employers</p>
                    </div>

                    <div className="user-type-tabs">
                        <button className="tab-btn active" data-tab="job-seekers">For Job Seekers</button>
                        <button className="tab-btn" data-tab="employers">For Employers</button>
                    </div>

                    <div className="tab-content active" id="job-seekers">
                        <div className="steps-grid">
                            <div className="step-card">
                                <div className="step-icon">
                                    <i className="fas fa-search"></i>
                                </div>
                                <h3>Search & Discover</h3>
                                <p>Browse part-time jobs in your area with our location-based search</p>
                            </div>
                            <div className="step-card">
                                <div className="step-icon">
                                    <i className="fas fa-file-alt"></i>
                                </div>
                                <h3>Apply Easily</h3>
                                <p>Apply with one click using your profile or LinkedIn integration</p>
                            </div>
                            <div className="step-card">
                                <div className="step-icon">
                                    <i className="fas fa-handshake"></i>
                                </div>
                                <h3>Get Hired</h3>
                                <p>Connect directly with employers and start your new part-time role</p>
                            </div>
                        </div>
                    </div>

                    <div className="tab-content" id="employers">
                        <div className="steps-grid">
                            <div className="step-card">
                                <div className="step-icon">
                                    <i className="fas fa-plus"></i>
                                </div>
                                <h3>Post Your Job</h3>
                                <p>Create detailed job listings with location, schedule, and requirements</p>
                            </div>
                            <div className="step-card">
                                <div className="step-icon">
                                    <i className="fas fa-users"></i>
                                </div>
                                <h3>Review Applications</h3>
                                <p>Browse qualified local candidates and review their profiles</p>
                            </div>
                            <div className="step-card">
                                <div className="step-icon">
                                    <i className="fas fa-star"></i>
                                </div>
                                <h3>Hire the Best</h3>
                                <p>Connect with your chosen candidate and onboard them quickly</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="features" className="features">
                <div className="container">
                    <div className="section-header">
                        <h2>Key Features</h2>
                        <p>Everything you need for successful part-time job connections</p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-image">
                                <img src="images/location-feature.png" alt="Location-based matching" />
                            </div>
                            <div className="feature-content">
                                <h3>Find Opportunities Near You</h3>
                                <p>Our smart location matching connects you with jobs and talent within your preferred distance, reducing commute time and increasing convenience.</p>
                            </div>
                        </div>

                        <div className="feature-card reverse">
                            <div className="feature-image">
                                <img src="images/dual-user-feature.png" alt="Dual user experience" />
                            </div>
                            <div className="feature-content">
                                <h3>Tailored for Both Sides</h3>
                                <p>Separate, optimized experiences for job seekers and employers, ensuring everyone gets exactly what they need.</p>
                            </div>
                        </div>

                        <div className="feature-card">
                            <div className="feature-image">
                                <img src="images/quick-application.png" alt="Quick applications" />
                            </div>
                            <div className="feature-content">
                                <h3>Apply in Seconds</h3>
                                <p>Streamlined application process with profile auto-fill and one-click applications. No more lengthy forms.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="benefits" id="benefits">
                <div className="container">
                    <div className="benefits-grid">
                        <div className="benefits-column">
                            <h3>For Job Seekers</h3>
                            <div className="benefit-item">
                                <i className="fas fa-clock"></i>
                                <div>
                                    <h4>Flexible Scheduling</h4>
                                    <p>Find part-time work that fits your lifestyle</p>
                                </div>
                            </div>
                            <div className="benefit-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <div>
                                    <h4>Local Opportunities</h4>
                                    <p>Reduce commute time with nearby positions</p>
                                </div>
                            </div>
                            <div className="benefit-item">
                                <i className="fas fa-bolt"></i>
                                <div>
                                    <h4>Quick Matching</h4>
                                    <p>Get matched with relevant jobs instantly</p>
                                </div>
                            </div>
                        </div>

                        <div className="benefits-column">
                            <h3>For Employers</h3>
                            <div className="benefit-item">
                                <i className="fas fa-user-check"></i>
                                <div>
                                    <h4>Quality Candidates</h4>
                                    <p>Access pre-screened local talent</p>
                                </div>
                            </div>
                            <div className="benefit-item">
                                <i className="fas fa-stopwatch"></i>
                                <div>
                                    <h4>Reduced Hiring Time</h4>
                                    <p>Fill positions faster with our streamlined process</p>
                                </div>
                            </div>
                            <div className="benefit-item">
                                <i className="fas fa-dollar-sign"></i>
                                <div>
                                    <h4>Cost-Effective</h4>
                                    <p>Lower recruitment costs compared to traditional methods</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="cta">
                <div className="cta-background">
                    <img src="images/cta-background.jpg" alt="Call to action background" />
                    <div className="cta-overlay"></div>
                </div>
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Get Started?</h2>
                        <p>Join thousands of professionals already using PartTimeConnect</p>
                        <div className="cta-buttons">
                            <a href="#" className="btn btn-primary btn-large">Sign Up as Job Seeker</a>
                            <a href="#" className="btn btn-secondary btn-large">Sign Up as Employer</a>
                        </div>
                        <p className="cta-note">No fees, no commitments. Start connecting today.</p>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h3>PartTimeConnect</h3>
                            <p>Your local part-time job connection platform</p>
                            <div className="social-links">
                                <a href="#"><i className="fab fa-linkedin"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                                <a href="#"><i className="fab fa-facebook"></i></a>
                            </div>
                        </div>

                        <div className="footer-section">
                            <h4>Company</h4>
                            <ul>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">How It Works</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h4>For Job Seekers</h4>
                            <ul>
                                <li><a href="#">Browse Jobs</a></li>
                                <li><a href="#">Career Resources</a></li>
                                <li><a href="#">Success Stories</a></li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h4>For Employers</h4>
                            <ul>
                                <li><a href="#">Post a Job</a></li>
                                <li><a href="#">Hiring Tips</a></li>
                                <li><a href="#">Pricing</a></li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h4>Legal</h4>
                            <ul>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms of Service</a></li>
                                <li><a href="#">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>&copy; 2025 PartTimeConnect. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
        </>
    )
}