import React, { useState, useEffect } from 'react';
import RecentTransactions from './RecentTransactions';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AdminProfilePage({
  email,
  password,
  name,
  phone,
  address,
  bankAccounts,
  transactions,
  id,
  isSuspended
}) {

  // Initialize the profile state with the props
  const [profile, setProfile] = useState({
    email,
    password,
    name,
    phone,
    address,
    bankAccounts,
  });

  // This useEffect fetches transactions for each bank account, if necessary
  console.log(bankAccounts);
  console.log(name);

  const handleSuspend = async () => {
    const token = localStorage.getItem("token"); // Replace with your actual token
    console.log(token);


    // First, check if the user is suspended before attempting the PATCH request
    if (isSuspended) {
      try {
        // Send the PATCH request with the token in the Authorization header
        await axios.patch(
          `http://localhost:3000/admin/suspendUser/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
          }
        );

        // Successfully suspended transaction
        toast.success("Transaction suspended successfully!");
      } catch (error) {
        console.error("Error suspending transaction:", error);
        toast.error("Failed to suspend user. Please try again.");
      }
    } else {
      // If the user is not suspended, show an error
      toast.error("This user is already suspended");
    }


  };


  return (
    <>
      <div className="w-[700px] p-6 ml-[190px] mt-[-50px]">
        <h1 className="text-2xl font-bold text-purple-800 text-center">{profile.name}</h1>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              readOnly  // Lock the input field
              className="bg-input-field-color w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              readOnly  // Lock the input field
              className="bg-input-field-color w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              readOnly  // Lock the input field
              className="bg-input-field-color w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={profile.address}
              readOnly  // Lock the input field
              className="bg-input-field-color w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Bank Accounts */}
          <div>
            <label className="block text-lg font-bold mt-[30px] mb-[10px] text-view-button-bg-color">
              Bank Accounts
            </label>
            {bankAccounts.length > 0 ? (
              bankAccounts.map((account, index) => (
                <div key={index} className="flex items-center gap-4 mb-2">
                  <div className="flex flex-col">
                    <span>Account Number</span>
                    <input
                      type="text"
                      value={account.accountNumber} // Display account number
                      readOnly // Lock the input field
                      className="bg-input-field-color flex-1 border border-gray-300 rounded-lg p-2"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span>Bank Name</span>
                    <input
                      type="text"
                      value={account.bankName} // Display bank name
                      readOnly
                      className="bg-input-field-color flex-1 border border-gray-300 rounded-lg p-2"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span>Balance</span>
                    <input
                      type="text"
                      value={account.balance} // Display balance
                      readOnly
                      className="bg-input-field-color flex-1 border border-gray-300 rounded-lg p-2"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">This user has no bank accounts.</p>
            )}
          </div>


          {/* Save Button */}
          <button
            onClick={handleSuspend}
            className="w-full mt-6 bg-purple-800 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Suspend
          </button>
        </div>

        {/* Pass filtered transactions to RecentTransactions */}
        <RecentTransactions transactions={transactions} name={name} id={id} />
      </div>
    </>
  );
}
