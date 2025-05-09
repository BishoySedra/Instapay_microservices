import { useState } from "react";
const Sidebar = ({ adminTabs, setAdminTabs, setRecentTransaction }) => {


   const [focus, setFocus] = useState("users");  // Store the focused item

    function handleOptions(identifier) {
      setAdminTabs({ tab: identifier });
      setRecentTransaction(false); // Reset recent transaction state
      setFocus(identifier); // Update the focused item
    }
  
    return (
      <div className="sidebar">
        <ul className="nav-list">
          <li>
            <a
              className={`nav-item ${focus==="users"?"focused":""}`}
              role="button"
              onClick={() => handleOptions("users")}
            >
              Users
            </a>
          </li>
          <li>
            <a
              className={`nav-item ${focus==="transactions"?"focused":""}`}
              role="button"
              onClick={() => handleOptions("transactions")}
            >
              Transactions
            </a>
          </li>
          <li>
            <a
              className={`nav-item ${focus==="reports"?"focused":""}`}
              role="button"
              onClick={() => handleOptions("reports")}
            >
              Reports
            </a>
          </li>
        </ul>
      </div>
    );
  };
  
  export default Sidebar;
  