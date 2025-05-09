import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotLoggedIn } from "./NotLoggedIn";
import axios from "axios"; // Ensure axios is imported
import { authActions } from "../store";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    balance: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [tempBalance, setTempBalance] = useState(0);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  
  const username = useSelector((state) => state.auth.username);
  const email = useSelector((state) => state.auth.email);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const balance=useSelector((state) => state.auth.balance);
  const dispatch=useDispatch();

  const handleBalanceChange = (e) => {
    setTempBalance(e.target.value);
  };

  const startEditingBalance = () => {
    setTempBalance(profile.balance);
    setIsEditingBalance(true);
  };

  const cancelEditing = () => {
    setIsEditingBalance(false);
  };

  const saveBalance = async () => {
    const token = localStorage.getItem("token");
    const userServiceUrl = import.meta.env.VITE_USER_SERVICE_URL;

    try {
      const response = await axios.put(
        `${userServiceUrl}/api/users/update`,
        { amount: tempBalance }, // Correct payload format
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(authActions.addBalance(tempBalance))

      if (response.data && response.data.message === "Balance updated successfully") {
        setProfile((prev) => ({ ...prev, balance: Number(tempBalance) }));
        setIsEditingBalance(false);
        toast.success("Balance updated successfully!", "success");
      } else {
        toast.error("Failed to update balance.", "error");
      }
    } catch (err) {
      toast.error("Failed to update balance. Please try again.", "error");
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  if (!isLoggedIn) {
    return <NotLoggedIn />;
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-20 flex justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-40 w-full max-w-lg bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
      <div className="max-w-4xl mx-auto p-6 mt-32">
      
      
            
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="border-b border-gray-200 pb-8 mb-8">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
            {username.charAt(0).toUpperCase()}
            {username.charAt(1).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{username}</h2>
            <p className="text-gray-500">{email}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Account Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-indigo-500 pl-4">
              <p className="text-sm text-gray-500">Username</p>
              <p className="font-medium text-gray-800 text-lg">{username}</p>
            </div>
            
            <div className="border-l-4 border-indigo-500 pl-4">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-800 text-lg">{email}</p>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Account Balance</h3>
            {!isEditingBalance && (
              <button 
                onClick={startEditingBalance}
                className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
                Edit Balance
              </button>
            )}
          </div>
          
          <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="mr-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              
              {isEditingBalance ? (
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={tempBalance}
                        onChange={handleBalanceChange}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        autoFocus
                      />
                    </div>
                    <div className="flex ml-4">
                      <button
                        onClick={saveBalance}
                        className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mr-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-500">Current Balance</p>
                  <p className="text-3xl font-bold text-gray-800">${balance.toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}