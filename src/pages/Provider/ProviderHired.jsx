import { ProviderHeader } from './ProviderHeader';
import './ProviderHired.css';
export default function ProviderHired() {
    return (
        <>
            <ProviderHeader/>
            <main className="providerhired-dashboard-container">
                <header className="providerhired-dashboard-header">
                    <h1 className="providerhired-main-heading">Hired Employees</h1>
                    <p className="providerhired-sub-heading">A central dashboard to view and manage all talent across the organization.</p>
                </header>

                <section className="providerhired-employee-grid">
                    <div className="providerhired-employee-card" data-name="Aarav Sharma" data-role="Senior Frontend Developer">
                        <div className="providerhired-card-header">
                            <div className="providerhired-avatar providerhired-bg-blue-light">AS</div>
                            <div className="providerhired-name-role">
                                <h2 className="providerhired-name">Aarav Sharma</h2>
                                <p className="providerhired-role providerhired-blue-accent">Senior Frontend Developer</p>
                            </div>
                        </div>
                        <div className="providerhired-card-details">
                            <p className="providerhired-detail-item"><i className="ri-briefcase-line"></i>Full-Time</p>
                            <p className="providerhired-detail-item"><i className="ri-time-line"></i>8 hours per day</p>
                            <p className="providerhired-detail-item"><i className="ri-money-rupee-circle-line"></i>₹1,25,000 per month</p>
                            <p className="providerhired-detail-item"><i className="ri-calendar-line"></i>2023-01-15</p>
                        </div>
                        <div className="providerhired-card-actions">
                            <button className="providerhired-btn providerhired-btn-contact">Contact</button>
                            <button className="providerhired-btn providerhired-btn-view-profile">View Profile</button>
                            <button className="providerhired-btn providerhired-btn-fire providerhired-bg-red" title="Terminate Employment">Fire</button>
                        </div>
                    </div>
                    <div className="providerhired-employee-card" data-name="Aarav Sharma" data-role="Senior Frontend Developer">
                        <div className="providerhired-card-header">
                            <div className="providerhired-avatar providerhired-bg-blue-light">AS</div>
                            <div className="providerhired-name-role">
                                <h2 className="providerhired-name">Aarav Sharma</h2>
                                <p className="providerhired-role providerhired-blue-accent">Senior Frontend Developer</p>
                            </div>
                        </div>
                        <div className="providerhired-card-details">
                            <p className="providerhired-detail-item"><i className="ri-briefcase-line"></i>Full-Time</p>
                            <p className="providerhired-detail-item"><i className="ri-time-line"></i>8 hours per day</p>
                            <p className="providerhired-detail-item"><i className="ri-money-rupee-circle-line"></i>₹1,25,000 per month</p>
                            <p className="providerhired-detail-item"><i className="ri-calendar-line"></i>2023-01-15</p>
                        </div>
                        <div className="providerhired-card-actions">
                            <button className="providerhired-btn providerhired-btn-contact">Contact</button>
                            <button className="providerhired-btn providerhired-btn-view-profile">View Profile</button>
                            <button className="providerhired-btn providerhired-btn-fire providerhired-bg-red" title="Terminate Employment">Fire</button>
                        </div>
                    </div>
                    <div className="providerhired-employee-card" data-name="Aarav Sharma" data-role="Senior Frontend Developer">
                        <div className="providerhired-card-header">
                            <div className="providerhired-avatar providerhired-bg-blue-light">AS</div>
                            <div className="providerhired-name-role">
                                <h2 className="providerhired-name">Aarav Sharma</h2>
                                <p className="providerhired-role providerhired-blue-accent">Senior Frontend Developer</p>
                            </div>
                        </div>
                        <div className="providerhired-card-details">
                            <p className="providerhired-detail-item"><i className="ri-briefcase-line"></i>Full-Time</p>
                            <p className="providerhired-detail-item"><i className="ri-time-line"></i>8 hours per day</p>
                            <p className="providerhired-detail-item"><i className="ri-money-rupee-circle-line"></i>₹1,25,000 per month</p>
                            <p className="providerhired-detail-item"><i className="ri-calendar-line"></i>2023-01-15</p>
                        </div>
                        <div className="providerhired-card-actions">
                            <button className="providerhired-btn providerhired-btn-contact">Contact</button>
                            <button className="providerhired-btn providerhired-btn-view-profile">View Profile</button>
                            <button className="providerhired-btn providerhired-btn-fire providerhired-bg-red" title="Terminate Employment">Fire</button>
                        </div>
                    </div>

                    <div className="providerhired-employee-card" data-name="Priya Patel" data-role="UX/UI Designer">
                        <div className="providerhired-card-header">
                            <div className="providerhired-avatar providerhired-bg-blue-light">PP</div>
                            <div className="providerhired-name-role">
                                <h2 className="providerhired-name">Priya Patel</h2>
                                <p className="providerhired-role providerhired-blue-accent">UX/UI Designer</p>
                            </div>
                        </div>
                        <div className="providerhired-card-details">
                            <p className="providerhired-detail-item"><i className="ri-briefcase-line"></i>Full-Time</p>
                            <p className="providerhired-detail-item"><i className="ri-time-line"></i>8 hours per day</p>
                            <p className="providerhired-detail-item"><i className="ri-money-rupee-circle-line"></i>₹95,000 per month</p>
                            <p className="providerhired-detail-item"><i className="ri-calendar-line"></i>2023-02-20</p>
                        </div>
                        <div className="providerhired-card-actions">
                            <button className="providerhired-btn providerhired-btn-contact">Contact</button>
                            <button className="providerhired-btn providerhired-btn-view-profile">View Profile</button>
                            <button className="providerhired-btn providerhired-btn-fire providerhired-bg-red" title="Terminate Employment">Fire</button>
                        </div>
                    </div>

                    <div className="providerhired-employee-card" data-name="Rohan Das" data-role="Backend Engineer">
                        <div className="providerhired-card-header">
                            <div className="providerhired-avatar providerhired-bg-blue-light">RD</div>
                            <div className="providerhired-name-role">
                                <h2 className="providerhired-name">Rohan Das</h2>
                                <p className="providerhired-role providerhired-blue-accent">Backend Engineer</p>
                            </div>
                        </div>
                        <div className="providerhired-card-details">
                            <p className="providerhired-detail-item"><i className="ri-briefcase-line"></i>Full-Time</p>
                            <p className="providerhired-detail-item"><i className="ri-time-line"></i>8 hours per day</p>
                            <p className="providerhired-detail-item"><i className="ri-money-rupee-circle-line"></i>₹1,10,000 per month</p>
                            <p className="providerhired-detail-item"><i className="ri-calendar-line"></i>2023-03-10</p>
                        </div>
                        <div className="providerhired-card-actions">
                            <button className="providerhired-btn providerhired-btn-contact">Contact</button>
                            <button className="providerhired-btn providerhired-btn-view-profile">View Profile</button>
                            <button className="providerhired-btn providerhired-btn-fire providerhired-bg-red" title="Terminate Employment">Fire</button>
                        </div>
                    </div>

                    <div className="providerhired-employee-card" data-name="Sneha Verma" data-role="Content Writer">
                        <div className="providerhired-card-header">
                            <div className="providerhired-avatar providerhired-bg-blue-light">SV</div>
                            <div className="providerhired-name-role">
                                <h2 className="providerhired-name">Sneha Verma</h2>
                                <p className="providerhired-role providerhired-blue-accent">Content Writer</p>
                            </div>
                        </div>
                        <div className="providerhired-card-details">
                            <p className="providerhired-detail-item"><i className="ri-briefcase-line"></i>Part-Time</p>
                            <p className="providerhired-detail-item"><i className="ri-time-line"></i>4 hours per day</p>
                            <p className="providerhired-detail-item"><i className="ri-money-rupee-circle-line"></i>₹30,000 per month</p>
                            <p className="providerhired-detail-item"><i className="ri-calendar-line"></i>2023-04-05</p>
                        </div>
                        <div className="providerhired-card-actions">
                            <button className="providerhired-btn providerhired-btn-contact">Contact</button>
                            <button className="providerhired-btn providerhired-btn-view-profile">View Profile</button>
                            <button className="providerhired-btn providerhired-btn-fire providerhired-bg-red" title="Terminate Employment">Fire</button>
                        </div>
                    </div>


                </section>

            </main>
        </>
    )
}
