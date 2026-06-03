import { useContext } from 'react';
import { SeekerHeader } from './SeekerHeader'
import { Requireddata } from '../../main';
import { getInitials } from '../../Utils/seekerutils';
import { useNavigate } from 'react-router';
import './SeekerProfile.css';

export const SeekerProfile = () => {
    const { seekerData: Seekerdata, refreshSeeker: setSeeker } = useContext(Requireddata);
    let editprofile = useNavigate();
    let Skills = (Seekerdata?.skills && Seekerdata?.skills !== "") ? Seekerdata?.skills.split(",").map(skill => skill.trim()).filter(skill => skill !== "") : [];
    let Education = (Seekerdata?.education && Seekerdata?.education !== "") ? Seekerdata?.education.split(",").map(edu => edu.trim()).filter(edu => edu !== "") : [];
    if (!Seekerdata) {
        setSeeker();
    }
    else {
        return (
            <div className="seekerprofile">
                <SeekerHeader />
                <div className="main-container">
                    <div className="user-header">
                        <div className="user-avatar-container">
                            <h3 className="user-avatar">{getInitials(Seekerdata?.name)}</h3>
                        </div>
                        <h2 className="user-name">{Seekerdata?.name}</h2>
                    </div>

                    <div className="profile-section">
                        <div className="seeker-profile-header">
                            <h3 className="profile-heading">Profile</h3>
                            <button className="edit-button" onClick={() => (editprofile('/seekerprofileupdate'))}>
                                <i className="fas fa-edit"></i>
                                Edit
                            </button>
                        </div>

                        <div className="profile-content">
                            <div className="profile-grid">
                                <div className="profile-field" tabIndex="0">
                                    <div className="field-label">Full Name:</div>
                                    <div className="field-value-fullName field-value">{Seekerdata?.name}</div>
                                </div>

                                <div className="profile-field" tabIndex="0">
                                    <div className="field-label">Email:</div>
                                    <div className="field-value-email field-value">{Seekerdata?.email}</div>
                                </div>

                                <div className="profile-field" tabIndex="0">
                                    <div className="field-label">Age:</div>
                                    <div className="field-value-age field-value">{Seekerdata?.age} Years Old</div>
                                </div>
                                <div className="profile-field" tabIndex="0">
                                    <div className="field-label">Location:</div>
                                    <div className="field-value-location field-value">{Seekerdata?.location}</div>
                                </div>

                                <div className="profile-field" tabIndex="0">
                                    <div className="field-label">Mobile Number:</div>
                                    <div className="field-value-phone field-value">{Seekerdata?.phone}</div>
                                </div>

                                <div className="profile-field full-width" tabIndex="0">
                                    <div className="field-label">About Me:</div>
                                    <div className="field-value-about field-value">
                                        {Seekerdata?.about || "Not provided."}
                                    </div>
                                </div>

                                <div className="profile-field full-width" tabIndex="0">
                                    <div className="field-label">Education:</div>
                                    <div className="field-value-education">
                                        {Education.length > 0 ? Education.map((edu, index) => {
                                            let [degree, other] = edu.split("at").map(part => part.trim());
                                            let [institution, years] = other.split("(").map(part => part.trim());
                                            years = years.replace(")", "")
                                            return (
                                                <div className="education-item" key={index}>
                                                    <strong>{degree}</strong><br />
                                                    {institution}<br />
                                                    <span className="education-year">{years}</span>
                                                </div>
                                            )
                                        }) : 'No education details available'}
                                    </div>
                                </div>

                                <div className="profile-field full-width" tabIndex="0">
                                    <div className="field-label">Skills:</div>
                                    <div className="field-value">
                                        <div className="seeker-skills-container">
                                            {Skills.length > 0 ? Skills.map((skill, index) => (
                                                <span key={index} className="skill-tag" tabIndex="0">{skill}</span>
                                            )) : <span>NO SKILLS LISTED</span>}
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-field full-width" tabIndex="0">
                                    <div className="field-label">Availability:</div>
                                    <div className="field-value">
                                        <div className="availability-status">
                                            <i className="fas fa-check-circle availability-icon"></i>
                                            <span className="availability-text">Available Immediately</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
