import { Link, useNavigate } from "react-router";
import { useRef, useState } from "react";
import { AuthenticationHeader } from "./AuthenticationHeader";
import { validateEmail, validatePhone, setLoadingState } from "../../Utils/providersignup-utils";
import './jobprovidersignup.css';
import axios from "axios";
export function JobProvidersignup() {
    const [formData, setFormData] = useState({
        companyName: "",
        email: "",
        password: "",
        phone: "",
        companyLocation: "",
        companyAddress: "",
        companyDescription: ""
    });
    let [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    let signupButtonref = useRef(null);
    let navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const newErrors = {};
    function validation() {

        // Validate Company Name
        if (!formData.companyName.trim()) {
            newErrors.companyName = "Company name is required";
        } else if (formData.companyName.trim().length < 2) {
            newErrors.companyName = "Company name must be at least 2 characters";
        }

        // Validate Email
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Validate Password (min 8 characters)
        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
        }

        // Validate Phone Number
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number (at least 10 digits)";
        }

        // Validate Company Location
        if (!formData.companyLocation.trim()) {
            newErrors.companyLocation = "Company location is required";
        } else if (formData.companyLocation.trim().length < 3) {
            newErrors.companyLocation = "Company location must be at least 3 characters";
        }

        // Validate Company Address
        if (!formData.companyAddress.trim()) {
            newErrors.companyAddress = "Company address is required";
        } else if (formData.companyAddress.trim().length < 5) {
            newErrors.companyAddress = "Company address must be at least 5 characters";
        }

        // Validate Company Description
        if (!formData.companyDescription.trim()) {
            newErrors.companyDescription = "Company description is required";
        } else if (formData.companyDescription.trim().length < 10) {
            newErrors.companyDescription = "Company description must be at least 10 characters";
        }

        setErrors(newErrors);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        validation();

        // If no errors, proceed with signup
        if (Object.keys(newErrors).length === 0) {
            let result = await axios.post("/PartTimeConnect-Backend/register_provider.php", {
                companyName: formData.companyName,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                companyLocation: formData.companyLocation,
                companyAddress: formData.companyAddress,
                companyDescription: formData.companyDescription
            });
            let data = result.data;
            console.log(data);
            if (data.success === false || data.status === "duplicate") {
                setErrors({ result: data.message })
            } else {
                setErrors({});
                setIsLoading(true);
                setLoadingState(true, signupButtonref.current);
                setTimeout(() => {
                    setLoadingState(false, signupButtonref.current);
                    setIsLoading(false);
                    navigate('/providerdashboard');
                }, 1000)
            }
        }
    };

    return (
        <>
            <AuthenticationHeader />
            <div className="providersignup">
                <div className="signup-container">
                    <div className="signup-card">
                        <div className="signup-header">
                            <h1 className="signup-title">Job Provider Sign Up</h1>
                            <p className="signup-subtitle">Create your job provider account</p>
                        </div>

                        <form className="signup-form" id="signupForm" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="companyName">Company Name</label>
                                <input type="text" id="companyName" name="companyName" className="form-input"
                                    placeholder="Enter your company name" required autoComplete="organization"
                                    value={formData.companyName} onChange={handleInputChange} disabled={isLoading} onFocus={() => (setErrors({}))} />
                                {errors.companyName && <span className="error-message">{errors.companyName}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" className="form-input"
                                    placeholder="Enter your business email address" required autoComplete="email"
                                    value={formData.email} onChange={handleInputChange} disabled={isLoading} onFocus={() => (setErrors({}))} />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" className="form-input"
                                    placeholder="Enter your password (min. 8 characters)" required autoComplete="new-password"
                                    value={formData.password} onChange={handleInputChange} disabled={isLoading} onFocus={() => (setErrors({}))} />
                                {errors.password && <span className="error-message">{errors.password}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="phone">Phone Number</label>
                                <input type="tel" id="phone" name="phone" className="form-input" placeholder="Enter your business phone number"
                                    required autoComplete="tel"
                                    value={formData.phone} onChange={handleInputChange} disabled={isLoading} onFocus={() => (setErrors({}))} />
                                {errors.phone && <span className="error-message">{errors.phone}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="companyLocation">Company Location</label>
                                <input type="text" id="companyLocation" name="companyLocation" className="form-input"
                                    placeholder="Enter your company location (city, state)" required autoComplete="address-level2"
                                    value={formData.companyLocation} onChange={handleInputChange} disabled={isLoading} onFocus={() => (setErrors({}))} />
                                {errors.companyLocation && <span className="error-message">{errors.companyLocation}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="companyAddress">Company Address</label>
                                <input type="text" id="companyAddress" name="companyAddress" className="form-input"
                                    placeholder="Enter your complete company address" required autoComplete="street-address"
                                    value={formData.companyAddress} onChange={handleInputChange} disabled={isLoading} onFocus={() => (setErrors({}))} />
                                {errors.companyAddress && <span className="error-message">{errors.companyAddress}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="companyDescription">Company Description</label>
                                <textarea id="companyDescription" name="companyDescription" className="form-textarea"
                                    placeholder="Describe your company, industry, and what makes you unique..." required rows="4"
                                    value={formData.companyDescription} onChange={handleInputChange} disabled={isLoading} onFocus={() => (setErrors({}))}></textarea>
                                {errors.companyDescription && <span className="error-message">{errors.companyDescription}</span>}
                            </div>

                            <div className="message-area">
                                <div className="error" id="messageDisplay">{errors.result}</div>
                            </div>

                            <button type="submit" className="signup-button" id="signupButton" ref={signupButtonref}>
                                Sign Up
                            </button>
                        </form>

                        <div className="login-link">
                            <p>Do you have an account? Then <Link to="/jobproviderLogin" id="loginLink">Login</Link></p>
                        </div>

                        <div className="back-home">
                            <Link to="/signup" id="backHome">Back to Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}