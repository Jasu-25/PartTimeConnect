import { useEffect, useState } from "react";
import { getInitials } from "../../../Utils/seekerutils";
import { getFormattedTimeAgo } from "../../../Utils/senderAppliedDuration";
import axios from "axios";
import { useNavigate } from "react-router";

export default function PostedJobApplicants({ applicant, jobName }) {
    const [isNew, setIsNew] = useState(true);
    const [isShortlist, setIsShortlist] = useState(false);
    const [isHired, setIsHired] = useState(false);
    const [applicantSkills, setApplicantSkills] = useState([]);
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const navigateApplicantProfile = useNavigate();

    const checkIsShortlisted = async () => {
        try {
            const response = await axios.post(
                '/PartTimeConnect-Backend/isshortlist.php',
                {
                    jobid: applicant?.job_id,
                    seekerid: applicant?.seeker_id,
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.data?.[0]?.is_shortlisted === '1') {
                setIsShortlist(true);
                setIsHired(false);
                setIsNew(false);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const checkIsHired = async () => {
        try {
            const response = await axios.post(
                '/PartTimeConnect-Backend/ishired.php',
                {
                    jobid: applicant?.job_id,
                    seekerid: applicant?.seeker_id,
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.data?.[0]?.is_hired === '1') {
                setIsHired(true);
                setIsNew(false);
                // keep shortlist state intact — hiring shouldn't implicitly clear the shortlist in UI
            }
        } catch (e) {
            console.log(e);
        }
    }

    const setAppliedApplicantSkills = () => {
        const skills = applicant?.skills
            ? applicant.skills.split(',').map((s) => s.trim()).filter(Boolean)
            : [];
        setApplicantSkills(skills);
    }

    const SendEmail = () => {
        if (!applicant?.phone) return;
        window.location.href = `tel:+91${applicant.phone}`;
    }

    const handleHire = async () => {
        if (isSendingEmail) return;
        setIsSendingEmail(true);
        try {
            let result = await axios.post('/PartTimeConnect-Backend/hireemploye.php', {
                jobid: applicant.job_id,
                seekerid: applicant.seeker_id
            });
            if (result.data.status === 'success') {
                setIsHired(true);
            }

        } catch (e) {
            console.error('sendHireEmail failed', e);
        }
        setTimeout(() => {
            setIsSendingEmail(false)
        }, 2000);
    }

    const handleShortlist = async () => {
        try {
            const result = await axios.post('/PartTimeConnect-Backend/shortlist.php', {
                jobid: applicant?.job_id,
                seekerid: applicant?.seeker_id,
            });
            if (result.data?.status === 'success') {
                setIsShortlist(true);
            }
        } catch (e) {
            console.error('shortlist failed', e);
        }
    }


    useEffect(() => {
        setAppliedApplicantSkills();
    }, [applicant])

    useEffect(() => {
        checkIsShortlisted();
        checkIsHired();
    }, [applicant?.seeker_id, applicant?.job_id]);

    useEffect(() => {
        checkIsShortlisted();
        checkIsHired();
    }, []);



    return (
        <div className="jobapplicant-card">
            <div className="applicant-header">
                <h3 className="applicant-avatar" >{getInitials(applicant?.name ? applicant?.name : "!")} </h3>
                <div className="applicant-info">
                    <h4 className="applicant-name">{applicant?.name ? applicant?.name : 'NA'}</h4>
                    <p className="applicant-title">{jobName ? jobName : 'NA'}</p>
                    <div className="applicant-meta">
                        <span className="application-date"><i className="fas fa-calendar-alt"></i> Applied {getFormattedTimeAgo(applicant?.applied_date ?? '')}</span>
                        {isHired ? <span className="applicant-status shortlisted"><i className="fas fa-circle"></i>Hired</span> : isShortlist ? <span className="applicant-status reviewed"><i className="fas fa-circle"></i>Shortlisted</span> : <span className="applicant-status new"><i className="fas fa-circle"></i> New</span>}
                    </div>
                </div>
            </div>
            <div className="applicant-bio">
                <p>{applicant?.about ? applicant?.about : 'NA'}</p>
            </div>
            <div className="applicant-skills">
                {applicantSkills.map((skill, idx) => {
                    return <span key={`${skill}-${idx}`} className="skill-tag">{skill}</span>
                })}
            </div>
            <div className="applicant-actions">
                <button className="btn-primary" onClick={SendEmail}>
                    <i className="fas fa-phone"></i> Contact
                </button>
                <button className="btn-secondary" onClick={()=>(navigateApplicantProfile(`/applicantProfile/${applicant?.seeker_id}`))}>
                    <i className="fas fa-user"></i> View Profile
                </button>
                {
                    isShortlist ? (
                        <button
                            className={`btn-success ${isSendingEmail ? 'btn-sending' : ''}`}
                            onClick={handleHire}
                            disabled={isSendingEmail || isHired}
                        >
                            <i className={`fas ${isSendingEmail ? 'fa-spinner fa-spin' : 'fa-star'}`}></i>
                            
                            {isSendingEmail ? 'Hiring...' : isHired ? 'Hired' : 'Hire'}
                        </button>
                    ) : (
                        <button className="btn-warning" onClick={handleShortlist}>
                            <i className="fas fa-calendar-check"></i> Shortlist
                        </button>
                    )
                }
            </div>
        </div>
    )
}
