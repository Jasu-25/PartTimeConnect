import { Link, useNavigate } from 'react-router';
import './SeekerDashboard.css';
import { useState, useEffect, useRef, useContext } from 'react';
import { getInitials } from '../../Utils/seekerutils';
import { Requireddata } from '../../main';
import axios from 'axios';
export function SeekerHeader() {

    let [dropdownstate, setdropdownstate] = useState(false);
    const userNavRef = useRef(null);
    let searchnavigate = useNavigate();
    const { seekerData: Seekerdata, refreshSeeker: setSeeker } = useContext(Requireddata);
    async function logoutseeker() {
        await axios.get('PartTimeConnect-Backend/seeker_logout.php');
        searchnavigate('/jobseekerlogin');
    }
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                userNavRef.current &&
                !userNavRef.current.contains(event.target)
            ) {
                setdropdownstate(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!Seekerdata) {
        setSeeker();
    }
    else {
        return (
            <>
                <header className="seekerdashboard-header">
                    <Link to="/seekerdashboard" className="seekerdashboard-logo">PartTime<span>Connect</span></Link>

                    <div className="seekerdashboard-search-container">
                        <input type="text" className="seekerdashboard-search-input" placeholder="Find Jobs In Your Location" onClick={() => (searchnavigate("/seekersearch"))} disabled={(window.location.href.includes("/seekersearch")) ? true : false} />
                        <button className="seekerdashboard-search-btn" disabled={(window.location.href.includes("/seekersearch")) ? true : false}><i className="fas fa-search"></i></button>
                    </div>

                    <div ref={userNavRef} className={dropdownstate ? "seekerdashboard-user-nav seekerdashboard-user-nav-open" : "seekerdashboard-user-nav"} onClick={() => (setdropdownstate(!dropdownstate))}>
                        <div className="seekerdashboard-avatar"> {Seekerdata ? getInitials(Seekerdata.name) : ""}</div>
                        <span className="seekerdashboard-username">  {Seekerdata ? Seekerdata.name : ""}</span>
                        <i className="fas fa-chevron-down seekerdashboard-icon-xs"></i>

                        {dropdownstate ? <div className="seekerdashboard-dropdown seekerdashboard-active" id="userDropdown">
                            <Link to="/seekerdashboard" className="seekerdashboard-dropdown-item"><i className="fas fa-home"></i> Home</Link>
                            <Link to="/seekerappliedjob" className="seekerdashboard-dropdown-item"><i className="fas fa-briefcase"></i> My Applications</Link>
                            <Link to="/seekersavedjob" className="seekerdashboard-dropdown-item"><i className="fas fa-heart"></i> Saved Jobs</Link>
                            <Link to="/seekerprofile" className="seekerdashboard-dropdown-item"><i className="fas fa-user"></i> Profile</Link>
                            <Link to="/seekersettings" className="seekerdashboard-dropdown-item"><i className="fas fa-cog"></i> Settings</Link>
                            <hr className="seekerdashboard-divider" />
                            <Link to="" className="seekerdashboard-dropdown-item seekerdashboard-logout" onClick={logoutseeker}><i
                                className="fas fa-sign-out-alt"></i> Logout</Link>
                        </div> : ""}
                    </div>
                </header>
            </>
        );
    }
}