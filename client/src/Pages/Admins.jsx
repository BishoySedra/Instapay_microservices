import React from "react";
import AdminIcon from "../assets/Admin.svg";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user, setSelectedUser, setRecentTransaction, selectedUser }) => {
  const navigate = useNavigate();

  // Function to handle viewing user profile
  function handleViewUser() {
    // navigate(`/admin/profile/${user.id}`); // Navigate to the user's profile page
    setSelectedUser(user); // Set selected user in parent component
    setRecentTransaction(true);
    console.log("showing selected user ", user.name);
  }

  // Only render the user card if user is not an admin
  if (user.isAdmin) return null;  // This will prevent rendering if user.isAdmin is true

  return (
    <div className="bg-admin-bg-color border rounded-lg shadow-md p-4 w-[287px] h-[287px] text-center">
      {/* Admin Icon */}
      <div className="flex justify-center mb-4">
        <img src={AdminIcon} alt="admin-icon" className="w-16 h-16" />
      </div>

      {/* Admin Name */}
      <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>

      {/* Buttons */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <button
          onClick={handleViewUser}
          className="bg-view-button-bg-color text-white w-[158px] h-[47px] rounded-lg hover:bg-purple-700 transition-all duration-300 mt-5"
        >
          View
        </button>
        {/* <button className="border border-view-button-bg-color text-view-button-bg-color w-[158px] h-[47px] rounded-lg hover:bg-view-button-bg-color hover:text-white transition-all duration-300">
          Suspend
        </button> */}
      </div>
    </div>
  );
};

export default UserCard;
