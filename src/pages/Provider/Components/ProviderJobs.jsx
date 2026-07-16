import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function ProviderJobs({jobs}) {
    const [jobAplicantsNumber , setJobAplicantsNumber] = useState();
    const fetchApllicantsNumber = async()=>{
        try{
            let result = await axios.post('/PartTimeConnect-Backend/getjobapplicants-num.php',{
                'jobid':jobs?.jobs_id
            },{
                withCredentials:true
            })
            console.log(result.data?.count);
            setJobAplicantsNumber(result?.data?.count)
        }catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        fetchApllicantsNumber();
    },[])
    return (
        <Link to={`/providerjobapplicants/${jobs?.jobs_id}`} className="job-card">
            <div className="job-card-header">
                <h3 className="job-title">{jobs?.job_title ? jobs?.job_title : 'NA'}</h3>
                <span className="job-type">{jobs?.job_type ? jobs?.job_type : 'Part Time'}</span>
            </div>
            <div className="job-card-details">
                <p className="job-salary"><i className="fas fa-dollar-sign"></i>{jobs?.job_salary ? jobs?.job_salary : 'NA'} / {jobs?.job_salary_time ? jobs?.job_salary_time : 'NA'} </p>
                <p className="job-location"><i className="fas fa-map-marker-alt"></i> {jobs?.job_location ? jobs?.job_location : 'NA'}</p>
                <p className="job-posted-date"><i className="fas fa-calendar-alt"></i> Posted on {jobs?.job_posted ? jobs?.job_posted : 'NA'}</p>
            </div>
            <div className="job-card-footer">
                <span className="applicants-count"><i className="fas fa-users"></i> {jobAplicantsNumber} Applied</span>
                {jobs?.job_status ? <span className="job-status active"><i className="fas fa-circle"></i> Active</span>:<span className="job-status inactive"><i className="fas fa-circle"></i> close</span>}
            </div>
        </Link>
    )
}
