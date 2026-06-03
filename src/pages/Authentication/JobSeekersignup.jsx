import { Link, useNavigate } from "react-router";
import { useRef, useState } from "react";
import { AuthenticationHeader } from "./AuthenticationHeader";
import { validateEmail, validatePhone ,setLoadingState } from "../../Utils/seekersignup";
import './jobseekersignup.css';
import axios from "axios";
export function JobSeekersignup() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        age: '',
        location: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    let providersignupButtonref = useRef(null);
    let navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const newErrors = {};
    function validation() {
        // Full Name
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        } else if (formData.fullName.trim().length < 2) {
            newErrors.fullName = 'Full name must be at least 2 characters';
        }

        // Email
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password (min 8 chars)
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
        }

        // Phone
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number (at least 10 digits)';
        }

        // Age
        const ageNum = Number(formData.age);
        if (!formData.age) {
            newErrors.age = 'Age is required';
        } else if (Number.isNaN(ageNum) || ageNum < 16 || ageNum > 100) {
            newErrors.age = 'Age must be between 16 and 100';
        }

        // Location
        if (!formData.location.trim()) {
            newErrors.location = 'Preferred location is required';
        } else if (formData.location.trim().length < 3) {
            newErrors.location = 'Location must be at least 3 characters';
        }

        setErrors(newErrors);

    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        validation();
        if (Object.keys(newErrors).length === 0) {
            let result = await axios.post("/backend/register_seeker.php",{
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                age: formData.age,
                location: formData.location
            });
            let data = result.data;
            console.log(data);
            if(data.status === "error" || data.status === "duplicate"){
                setErrors({result:data.message})
            }else{
                setErrors({});
                setIsSubmitting(true);
                setLoadingState(true,providersignupButtonref.current);
                setTimeout(()=>{
                    setIsSubmitting(false);
                    setLoadingState(false,providersignupButtonref.current);
                    navigate('/seekerdashboard');
                },1000)
            }
        }
    };

    return (
        <>
            <AuthenticationHeader />
            <div className="seekersignup">
                <div className="signup-container">
                    <div className="signup-card">
                        <div className="signup-header">
                            <h1 className="signup-title">Job Seeker Sign Up</h1>
                            <p className="signup-subtitle">Create your job seeker account</p>
                        </div>

                        <form className="signup-form" id="signupForm" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="fullName">Full Name</label>
                                <input type="text" id="fullName" name="fullName" className="form-input" placeholder="Enter your full name"
                                    required autoComplete="name" value={formData.fullName} onChange={handleInputChange} onFocus={()=>(setErrors({}))} disabled={isSubmitting} />
                                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" className="form-input" placeholder="Enter your email address"
                                    required autoComplete="email" value={formData.email} onChange={handleInputChange} onFocus={()=>(setErrors({}))} disabled={isSubmitting} />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" className="form-input"
                                    placeholder="Enter your password (min. 8 characters)" required autoComplete="new-password" value={formData.password} onChange={handleInputChange} onFocus={()=>(setErrors({}))} disabled={isSubmitting} />
                                {errors.password && <span className="error-message">{errors.password}</span>}
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="phone">Phone Number</label>
                                    <input type="tel" id="phone" name="phone" className="form-input" placeholder="Enter your phone number"
                                        required autoComplete="tel" value={formData.phone} onChange={handleInputChange} onFocus={()=>(setErrors({}))} disabled={isSubmitting} />
                                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="age">Age</label>
                                    <input type="number" id="age" name="age" className="form-input" placeholder="Enter your age" required min="16"
                                        max="100" value={formData.age} onChange={handleInputChange} onFocus={()=>(setErrors({}))} disabled={isSubmitting} />
                                    {errors.age && <span className="error-message">{errors.age}</span>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="location">Preferred Job Location</label>
                                <input type="text" id="location" name="location" className="form-select" required
                                    placeholder="Enter Your Prefered Location" value={formData.location} onChange={handleInputChange} onFocus={()=>(setErrors({}))} disabled={isSubmitting} />
                                {errors.location && <span className="error-message">{errors.location}</span>}
                            </div>

                            <div className="message-area">
                                <div className="error" id="messageDisplay">{errors.result}</div>
                            </div>

                            <button type="submit" className="signup-button" id="signupButton" ref={providersignupButtonref}>
                                Sign Up
                            </button>
                        </form>

                        <div className="login-link">
                            <p>Do you have an account? Then <Link to="/jobseekerlogin" id="loginLink">Login</Link></p>
                        </div>

                        <div className="back-home">
                            <Link to="/login" id="backHome">Back to Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}