import { AuthenticationHeader } from './AuthenticationHeader'
import './login-page.css'
import { Link } from 'react-router'
export function LoginRoleSelection() {
    return (
        <div className="login">

            <div className="auth-content">
                <div className="auth-logo">
                    <h2>PartTimeConnect</h2>
                    <p>find a job perfect for you</p>
                </div>

                <div className="role-selection" id="roleSelection">
                    <h3>Join PartTimeConnect</h3>
                    <p>Choose your account type to get started</p>

                    <div className="role-cards">
                        <Link to="/jobseekerlogin" className="role-card">
                            <div className="role-icon">
                                <i className="fas fa-user"></i>
                            </div>
                            <h4>Job Seeker</h4>
                        </Link>

                        <Link to="/jobproviderlogin" className="role-card">
                            <div className="role-icon">
                                <i className="fas fa-building"></i>
                            </div>
                            <h4>Job Provider</h4>
                        </Link>
                    </div>
                </div>
            </div>
            <AuthenticationHeader />
        </div>
    )
}