import axios from 'axios';
import { use, useEffect, useRef, useState } from 'react';
import { Providerddata } from '../../main';
import { Link, useNavigate } from 'react-router';
import './ProviderDashboard.css';
import { getInitials } from '../../Utils/seekerutils';
export function ProviderHeader() {
    let [Dropdown, setDropdown] = useState(false);
    let { providerData: Providerdata } = use(Providerddata);
    const userNavRef = useRef(null);
    let searchnavigate = useNavigate();
    async function logoutprovider() {
        await axios.get('PartTimeConnect-Backend/provider_logout.php');
        searchnavigate('/jobproviderlogin');
    }
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                userNavRef.current &&
                !userNavRef.current.contains(event.target)
            ) {
                setDropdown(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <>
            <header className="providerdashboard-header">
                <div className="providerdashboard-logo" onClick={() => searchnavigate('/providerdashboard')}>
                    PartTime<span className="providerdashboard-logo-accent">Connect</span>
                </div>

                <div className="providerdashboard-nav-center">
                    <button className="providerdashboard-btn-nav-post" onClick={()=>(searchnavigate('/providerpostjob'))}>
                        <i className="fas fa-plus"></i> Post New Job
                    </button>
                </div>

                <div className="providerdashboard-nav-right">
                    <div className="providerdashboard-user-container" ref={userNavRef} onClick={()=>(setDropdown(!Dropdown))}>
                        <div className="providerdashboard-user-profile" >
                            <div className="providerdashboard-avatar"> {getInitials(Providerdata?.company_name)}</div>
                            <span className="providerdashboard-username">{Providerdata?.company_name||"Company Name"}</span>
                            <i className="fas fa-chevron-down providerdashboard-icon-sm"></i>
                        </div>

                        {Dropdown ? (
                            <div className="providerdashboard-dropdown active" id="userDropdown">
                                <Link to="/providerdashboard" className="providerdashboard-dropdown-item">
                                    <i className="fas fa-home"></i> Home
                                </Link>
                                <Link to="/providerprofile" className="providerdashboard-dropdown-item">
                                    <i className="fas fa-building"></i> Company Profile
                                </Link>
                                <Link to="/providerpostings" className="providerdashboard-dropdown-item">
                                    <i className="fas fa-briefcase"></i> My Job Postings
                                </Link>
                                <Link to="/providerjobsoverview" className="providerdashboard-dropdown-item">
                                    <i className="fas fa-users"></i> Applicants
                                </Link>
                                <Link to="/providerHired" className="providerdashboard-dropdown-item">
                                    <i className="fas fa-user-friends"></i> Hired Employees
                                </Link>
                                <Link to="/providersettings" className="providerdashboard-dropdown-item">
                                    <i className="fas fa-cog"></i> Settings
                                </Link>
                                <hr className="providerdashboard-dropdown-divider" />
                                <Link onClick={logoutprovider} className="providerdashboard-dropdown-item logout">
                                    <i className="fas fa-sign-out-alt"></i> Logout
                                </Link>
                            </div>
                        ) : ""}
                    </div>
                </div>
            </header>
        </>
    )
}