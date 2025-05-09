import "./navbar.css";
import instaPayLogo from "../assets/InstaPayIcon.svg"; // Corrected the path of the logo
import ProfilePhoto from "../assets/ProfileIcon.svg"
import NotificationPhoto from "../assets/RingImage.svg";
const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-logo-container">
                <img src={instaPayLogo} alt="InstaPay Logo" className="navbar-logo-img" />
                <h1 className="navbar-logo">InstaPay</h1>
            </div>
            <div className="navbar-links">
                <div className="navbar-links-left">
                    <a href="#home" className="navbar-link">Home</a>
                    <a href="#about" className="navbar-link">What is InstaPay?</a>
                    <a href="#services" className="navbar-link">Q&A</a>
                    <a href="#contact" className="navbar-link">Contact</a>
                </div>
                <div className="navbar-icons">
                    <a href=""><img src={ProfilePhoto} alt="profile-picture" /></a>
                    <a href=""><img src={NotificationPhoto} alt="notification-photo" /></a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
