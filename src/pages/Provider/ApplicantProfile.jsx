import React, { useEffect, useState } from 'react'
import { getInitials } from '../../Utils/seekerutils'
import { ProviderHeader } from './ProviderHeader'
import { useParams } from 'react-router'
import axios from 'axios'

export default function ApplicantProfile() {
    const applicantId = useParams();
    const [appliedApplicantID, setAppliedApplicantId] = useState(applicantId?.seekerid);
    const [appliedApplicantData, setAppliedApplicantData] = useState([]);
    const Skills = (appliedApplicantData?.skills && appliedApplicantData?.skills !== "") ? appliedApplicantData?.skills.split(",").map(skill => skill.trim()).filter(skill => skill !== "") : [];
    const Education = (appliedApplicantData?.education && appliedApplicantData?.education !== "") ? appliedApplicantData?.education.split(",").map(edu => edu.trim()).filter(edu => edu !== "") : [];

    const fetchApplicantProfile = async () => {
        try {
            const response = await axios.post('/PartTimeConnect-Backend/getidseekerdata.php', {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
                'id': appliedApplicantID
            })
            setAppliedApplicantData(response?.data)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchApplicantProfile()
    }, [])

    useEffect(() => {
        setAppliedApplicantId(applicantId?.seekerid)
        fetchApplicantProfile()
    }, [applicantId?.seekerid])

    return (
        <div className="seekerprofile">
            <ProviderHeader />
            <div className="main-container">
                <div className="user-header">
                    <div className="user-avatar-container">
                        <h3 className="user-avatar">{getInitials(appliedApplicantData?.name ? appliedApplicantData?.name : '!')}</h3>
                    </div>
                    <h2 className="user-name">{appliedApplicantData?.name ? appliedApplicantData?.name : 'NA'}</h2>
                </div>

                <div className="profile-section">

                    <div className="profile-content">
                        <div className="profile-grid">
                            <div className="profile-field" tabIndex="0">
                                <div className="field-label">Full Name:</div>
                                <div className="field-value-fullName field-value">{appliedApplicantData?.name ? appliedApplicantData?.name : 'NA'}</div>
                            </div>

                            <div className="profile-field" tabIndex="0">
                                <div className="field-label">Email:</div>
                                <div className="field-value-email field-value">{appliedApplicantData?.email ? appliedApplicantData?.email : 'NA'}</div>
                            </div>

                            <div className="profile-field" tabIndex="0">
                                <div className="field-label">Age:</div>
                                <div className="field-value-age field-value">{appliedApplicantData?.age ? appliedApplicantData?.age : 'NA'} Years Old</div>
                            </div>
                            <div className="profile-field" tabIndex="0">
                                <div className="field-label">Location:</div>
                                <div className="field-value-location field-value">{appliedApplicantData?.location ? appliedApplicantData?.location : 'NA'}</div>
                            </div>

                            <div className="profile-field" tabIndex="0">
                                <div className="field-label">Mobile Number:</div>
                                <div className="field-value-phone field-value">{appliedApplicantData?.phone ? appliedApplicantData?.phone : 'NA'}</div>
                            </div>

                            <div className="profile-field full-width" tabIndex="0">
                                <div className="field-label">About Me:</div>
                                <div className="field-value-about field-value">
                                    {appliedApplicantData?.about ? appliedApplicantData?.name : 'NA'}
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
                                        <span className="availability-text"> {appliedApplicantData?.availability ? `Available ${appliedApplicantData?.availability}`:'NA'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
