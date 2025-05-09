import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InstaPayIcon from "../assets/InstaPayIcon.svg";
import RingImage from "../assets/RingImage.svg";
import ProfileIcon from "../assets/ProfileIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

export default function Header() {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    setUnreadCount(2); // Replace with dynamic count
  }, []);

  const handleNavigation = (section) => {
    navigate(`/home?section=${section}`); // Navigate to Home with section parameter
  };

  const handleHomeClick = () => {
    navigate('/home'); // Navigate to Home
    window.scrollTo(0, 0); // Scroll to top
  };

  const handleLogout = () => {
    // Clear any authentication tokens or session data
    dispatch(authActions.logout())
    sessionStorage.clear();  // Clear any session data if used
    navigate('/', { replace: true }); // Redirect to login page
  };

  return (
    <header className="w-full py-4 px-8 flex justify-between items-center fixed top-0 left-0 bg-purple-50 shadow-md z-50">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 rounded-full flex items-center justify-center">
          <img
            src={InstaPayIcon}
            alt="InstaPay Icon"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="px-2 font-bold text-purple-900 text-2xl">InstaPay</h1>
      </div>

      <nav className="flex items-center space-x-6">
        <span
          onClick={handleHomeClick}
          className="text-purple-900 hover:text-purple-700 hover:underline cursor-pointer"
        >
          Home
        </span>
        <span
          onClick={() => handleNavigation("about")}
          className="text-purple-900 hover:text-purple-700 hover:underline cursor-pointer"
        >
          What is InstaPay?
        </span>
        <span
          onClick={() => handleNavigation("qa")}
          className="text-purple-900 hover:text-purple-700 hover:underline cursor-pointer"
        >
          Q&A
        </span>
        <span
          onClick={() => handleNavigation("contact")}
          className="text-purple-900 hover:text-purple-700 hover:underline cursor-pointer"
        >
          Contact
        </span>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/notifications" className="relative hover:scale-125">
                <img src={RingImage} alt="Notifications" className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full border border-white"></span>
                )}
              </Link>
              <Link to="/profile" className="hover:scale-125">
                <img src={ProfileIcon} alt="Profile Icon" className="w-6 h-6" />
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-1 text-white bg-view-button-bg-color hover:bg-purple-500 rounded shadow transition-all duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/')}
              className="px-4 py-1 text-white bg-purple-600 hover:bg-purple-500 rounded shadow transition-all duration-200"
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
