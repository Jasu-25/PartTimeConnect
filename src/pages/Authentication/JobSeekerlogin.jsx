import axios from "axios";
import { Link, useNavigate } from "react-router";
import { useRef, useState} from "react";
import { AuthenticationHeader } from "./AuthenticationHeader";
import { validateEmail, validatePassword , setLoadingState} from "../../Utils/loginutils";
import './Rolelogin.css';
export function JobSeekerlogin() {
    let [email, setemail] = useState("");
    let [password, setpassword] = useState("");
    let [errors, setErrors] = useState({});
    let emailref = useRef(null);
    let passwordref = useRef(null);
    let loginButtonref = useRef(null);
    let navigate = useNavigate();

    const newErrors = {};
    function validation() {
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else if (!validatePassword(password)) {
            newErrors.password = "Password must be at least 8 characters long";
        }
        setErrors(newErrors);
    }

    function removeValidationMessage() {
        setErrors({});
    }


    async function handleSubmit(e) {
        e.preventDefault();
        validation();
        console.log(password);
        if (Object.keys(newErrors).length === 0) {
            let result = await axios.post("/PartTimeConnect-Backend/seeker_log.php", {
                email: email,
                password:password
            });
            let data = result.data;
            console.log(data);
            if (data.status === "error" || data.status === "dataerror") {
                setErrors({result:data.message})
            }else{
                setErrors({});
                setLoadingState(true,loginButtonref.current,emailref.current,passwordref.current);
                setTimeout(()=>{
                    setLoadingState(false,loginButtonref.current,emailref.current,passwordref.current);
                    navigate('/seekerdashboard');
                },1000)
            }
        }
    }

    return (
        <>
            <AuthenticationHeader />
            <div className="loginrole">
                <div className="login-container">
                    <div className="login-card">
                        <div className="login-header">
                            <h1 className="login-title"> Job Seeker Login</h1>
                            <p className="login-subtitle">Welcome back! Please sign in to your account</p>
                        </div>

                        <form className="login-form" id="loginForm" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" className="form-input email-input" placeholder="Enter your email address"
                                    required autoComplete="email" onChange={(e) => (setemail(e.target.value))} value={email} ref={emailref} onFocus={removeValidationMessage} />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" className="form-input password-input" placeholder="Enter your password"
                                    required autoComplete="current-password" onChange={(e) => (setpassword(e.target.value))} value={password} ref={passwordref} onFocus={removeValidationMessage} />
                                {errors.password && <span className="error-message">{errors.password}</span>}
                            </div>

                            <div className="forgot-password">
                                <a href="forget-password.html" id="forgotPassword">Forgot your password?</a>
                            </div>

                            <div className="message-area">
                                <div className="error" id="messageDisplay">{errors.result}</div>
                            </div>

                            <button type="submit" className="login-button" id="loginButton" ref={loginButtonref}>
                                Login In
                            </button>
                        </form>

                        <div className="signup-link">
                            <p>Don't have an account?</p>
                            <Link to="/jobseekersignup" id="signupLink">Sign Up</Link>
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