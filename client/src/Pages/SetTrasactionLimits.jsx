import React, { useState } from "react";
import axios from "axios";
import Input from "../Components/Input";
import "./SendMoney.css";
import { toast } from "react-toastify";

function SetTransactionLimits() {
  const [limit, setLimit] = useState("");  // Only the limit field
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!limit || isNaN(limit)) {
      setError("Please provide a valid transaction limit.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await axios.patch(
        "http://localhost:3000/users/updateProfile", // Use the updateProfile endpoint
        {
          dailyLimit: limit,  // Send only the dailyLimit field
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token for authentication
          },
        }
      );

      if (response.data && response.data.message === "Profile updated successfully") {
        toast.success("Transaction limit set successfully!");
        setLimit("");  // Clear the input field
      } else {
        setError("Failed to set transaction limit.");
      }
    } catch (err) {
      console.error("Error setting transaction limit:", err);
      setError("There was an error setting the limit. Please try again.");
      toast.error("Error setting transaction limit:", err);

    }
  };

  return (
    <div className="form-container">
      <div className="form">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <Input
            label="Limit Amount"
            type="text"
            id="limit"
            name="limit"
            placeholder="20.000 EGP"
            className="input-field"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
          <div>
            <button type="submit" className="submit-button bg-button-bg-color rounded-sm">
              Set Limit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SetTransactionLimits;
