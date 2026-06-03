import { Link } from "react-router"
import './AuthenticationHeader.css'
export function AuthenticationHeader() {
    return (
        <>
            <title>PartTimeConnect</title>
            <nav className="authentication-navbar">
                <div className="authentication-nav-logo">
                    <Link to="/" className="link">PartTimeConnect</Link>
                </div>
                <ul className="authentication-nav-links">
                    <li><Link to="/">Home</Link></li>
                </ul>
            </nav>
        </>
    )
}