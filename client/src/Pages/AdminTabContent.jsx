import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import AdminSidebar from "./AdminSideBar.jsx";
import UserCard from "./Admins.jsx";
import ReportsTab from "./ReportsTab.jsx";
import AdminProfilePage from "./AdminsProfilePage.jsx";
import TransactionsTab from "./TransactionsTab.jsx";

function TabContent({
  adminTabs,
  setAdminTabs,
  setSelectedUser,
  selectedUser,
  setRecentTransaction,
  recentTransaction,
}) {
  const [users, setUsers] = useState([]); // State for fetched users
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(""); // State for error handling
  const [userDetails, setUserDetails] = useState(null); // State for storing selected user's details
  const [filteredBankAccounts, setFilteredBankAccounts] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const pageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };


  console.log(selectedUser.id);
  console.log(selectedUser.isActive);
  
  
  // Fetch all users data (admin's users)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/admin/users", {
          params: { page: 1, pageSize: 24 },
          headers: { Authorization: `Bearer ${token}` },
        });

        // Ensure the response contains a 'users' array
        if (response.data && Array.isArray(response.data.users)) {
          setUsers(response.data.users); // Access the 'users' array
          //console.log("First user as JSON:", JSON.stringify(response.data.users, null, 2));
        } else {
          setError("Error: Invalid response from server.");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users. Please try again later.");
      }
    };

    fetchUsers();
  }, []);

  // Fetch the details of the selected user when selectedUser changes
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    
      const fetchUserDetails = async () => {
        try {


          // Use the correct endpoint with query parameter
          const response = await axios.get(
            `http://localhost:3000/admin/userDetails/${selectedUser.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Set the user details if the response is successful
          if (response.data && response.data) {
            setUserDetails(response.data.data); // Save the user details
            //console.log("User Details:", JSON.stringify(response.data.data.bankAccounts[0], null, 2));
           // console.log("User Details:", JSON.stringify(response.data.data, null, 2));
             console.log("User Details:", JSON.stringify(response.data.data, null, 2));


            
          } else {
            setError("User details not found.");
          }
        } catch (err) {
          console.error("Error fetching user details:", err);
          setError("Failed to fetch user details.");
        }
      };

      fetchUserDetails(); // Call the function to fetch user details
    
  }, [selectedUser]); // Trigger whenever selectedUser changes


  

  return (
    <div className="main-content">
      {/* Sidebar */}
      <AdminSidebar
        setRecentTransaction={setRecentTransaction}
        adminTabs={adminTabs}
        setAdminTabs={setAdminTabs}
      />

      <AnimatePresence mode="wait">
        {/* Main Content */}
        {adminTabs.tab === "users" && !recentTransaction && (
          <motion.div
            className="form-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-[160px]"
            key="users"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user, index) => (
                <UserCard
                  setRecentTransaction={setRecentTransaction}
                  key={index}
                  user={user}
                  setSelectedUser={setSelectedUser}
                  selectedUser={selectedUser}
                />
              ))
            ) : (
              <p>No users available</p>
            )}
          </motion.div>
        )}

        {/* Show ProfilePage when a user is selected and their data is fetched */}
        {selectedUser && recentTransaction && (
          <motion.div
            className="form-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-[160px]"
            key="profile"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <AdminProfilePage
              name={selectedUser.name}
              email={selectedUser.email}
              phone={selectedUser.phone}
              address={selectedUser.address}
              bankAccounts={userDetails.bankAccounts}
              transactions={userDetails.transactions}
              id={selectedUser.id}
              isSuspended={selectedUser.isActive}
            />
          </motion.div>
        )}

        {/* Show Reports Tab when the 'reports' tab is selected */}
        {adminTabs.tab === "reports" && (
          <motion.div
            className="form-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-[160px]"
            key="reports"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <ReportsTab userCredentials={users} />
          </motion.div>
        )}

        {/* Show Transactions Tab when the 'transactions' tab is selected */}
        {adminTabs.tab === "transactions" && (
          <motion.div
            className="form-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-[160px]"
            key="transactions"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            <TransactionsTab users={users} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TabContent;
