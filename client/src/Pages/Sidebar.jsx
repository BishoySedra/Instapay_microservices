/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./sidebar.css";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ focus, setFocus }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname.split("/").pop(); // Get the last part of the path
    setFocus(currentPath); // Set focus based on the current route
  }, [location.pathname, setFocus]);

  function handleOptions(identifier) {
    setFocus(identifier); // Set the focused item
    navigate(`/tab/${identifier}`); // Navigate to the corresponding route
  }

  return (
    <div className="sidebar">
      <ul className="nav-list">
        <li>
          <a
            className={`nav-item ${focus === "send" ? "focused" : ""}`}
            role="button"
            onClick={() => handleOptions("send")}
          >
            Send Money
          </a>
        </li>
        <li>
          <a
            className={`nav-item ${focus === "view-history" ? "focused" : ""}`}
            role="button"
            onClick={() => handleOptions("view-history")}
          >
            View History
          </a>
        </li>
        <li>
          <a
            className={`nav-item ${focus === "account-usage" ? "focused" : ""}`}
            role="button"
            onClick={() => handleOptions("account-usage")}
          >
            Account Usage
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
