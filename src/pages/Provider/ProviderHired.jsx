import { useEffect, useState } from 'react';
import { ProviderHeader } from './ProviderHeader';
import './ProviderHired.css';
import axios from 'axios';
import { getInitials } from '../../Utils/seekerutils';
import { useNavigate } from 'react-router';
export default function ProviderHired() {

    const [hiredApplicantsData, setHiredApplicantsData] = useState([]);
    const [hiredApplicantsCount , setHiredApplicantsCount] = useState();
    const hiredNavigation = useNavigate();

    const fetchHiredApplicants = async () => {
        try {
            const respose = await axios.post('/PartTimeConnect-Backend/gethiredemployess.php', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setHiredApplicantsData(respose.data);
            setHiredApplicantsCount(respose.data.length)
        } catch (e) {
            console.log(e);
        }
    }

    const fireAppliedApplicant = async (seekerid , jobid) => {
        try {
            const respose = await axios.post('/PartTimeConnect-Backend/fireemploye.php', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
                'seekerid':seekerid,
                'jobid':jobid
            });
            if(respose.data.status === 'success'){
                setHiredApplicantsCount(hiredApplicantsCount-1)
            }
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        fetchHiredApplicants()
    }, [hiredApplicantsCount])



    return (
        <>
            <ProviderHeader />
            <main className="providerhired-dashboard-container">
                <header className="providerhired-dashboard-header">
                    <h1 className="providerhired-main-heading">Hired Employees</h1>
                    <p className="providerhired-sub-heading">A central dashboard to view and manage all talent across the organization.</p>
                </header>

                <section className="providerhired-employee-grid">
                    {hiredApplicantsData.length !== 0 ?
                        hiredApplicantsData?.map((applicant) => {
                            return (
                                <div className="providerhired-employee-card">
                                    <div className="providerhired-card-header">
                                        <div className="providerhired-avatar providerhired-bg-blue-light">{getInitials(applicant?.name?applicant?.name:'!')}</div>
                                        <div className="providerhired-name-role">
                                            <h2 className="providerhired-name">{applicant?.name?applicant?.name:'NA'}</h2>
                                            <p className="providerhired-role providerhired-blue-accent">{applicant?.job_title?applicant?.job_title:'NA'}</p>
                                        </div>
                                    </div>
                                    <div className="providerhired-card-details">
                                        <p className="providerhired-detail-item"><i className="ri-briefcase-line"></i>{applicant?.job_type?applicant?.name:'NA'}</p>
                                        <p className="providerhired-detail-item"><i className="ri-time-line"></i>{applicant?.work_load?applicant?.work_load:'NA'} hours {applicant?.work_period?applicant?.work_period:'NA'}</p>
                                        <p className="providerhired-detail-item"><i className="ri-money-rupee-circle-line"></i>₹{applicant?.job_salary?applicant?.job_salary:'NA'} {applicant?.job_salary_time?applicant?.job_salary_time:'NA'}</p>
                                        <p className="providerhired-detail-item"><i className="ri-calendar-line"></i>{applicant?.hired_at?applicant?.hired_at:'NA'}</p>
                                    </div>
                                    <div className="providerhired-card-actions">
                                        <button className="providerhired-btn providerhired-btn-contact" onClick={()=>(window.location.href=`tel:+91${applicant?.phone}`)}>Contact</button>
                                        <button className="providerhired-btn providerhired-btn-view-profile" onClick={()=>(hiredNavigation(`/applicantProfile/${applicant?.seeker_id}`))}>View Profile</button>
                                        <button className="providerhired-btn providerhired-btn-fire providerhired-bg-red" title="Terminate Employment" onClick={()=>(fireAppliedApplicant(applicant?.seeker_id , applicant?.job_id))}>Fire</button>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div class="Nohired-container">
                            <div class="Nohired-box">
                                <div class="Nohired-icon-wrapper">
                                    <i class="fas fa-user-check Nohired-icon"></i>
                                </div>
                                <h3 class="Nohired-title">No Hired Applicants</h3>
                                <p class="Nohired-subtitle">When candidates are Hired, they will appear here.</p>
                                <button class="Nohired-action-btn" id="Nohired-action-button">
                                    <i class="fas fa-user-plus Nohired-btn-icon"></i>
                                    <span>Hire Applicants</span>
                                </button>
                            </div>
                        </div>
                    }

                </section>

            </main>
        </>
    )
}
