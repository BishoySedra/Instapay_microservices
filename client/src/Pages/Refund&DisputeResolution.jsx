import Input from "../Components/Input";
import "./SendMoney.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function RefundAndDisputeResolution() {
    const [formData, setFormData] = useState({
        transactionId: "", // For storing the transaction ID
    });

    const [errors, setErrors] = useState({
        transactionId: "",
    });

    function handleInputChange(identifier, value) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [identifier]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [identifier]: "", // Clear error when user modifies the field
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        // Validate inputs
        if (!formData.transactionId) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                transactionId: "Transaction ID is required",
            }));
            return;
        }

        try {
            const token = localStorage.getItem("token"); // Include the token for authentication
            const response = await axios.post(
                `http://localhost:3000/transactions/accept-refund/${formData.transactionId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success(`Refund successful: ${response.data.message}`);
            console.log(response);
            
        } catch (error) {
            console.error("Refund Error:", error.response?.data || error.message);
            toast.error("Refund failed: " + (error.response?.data?.message || "Please try again."));
        }
    }

    return (
        <>
            <div className="form-container">
                <form className="form" onSubmit={handleSubmit}>
                    <Input
                        label="Transaction ID"
                        type="text"
                        id="transaction-id"
                        name="transaction-id"
                        placeholder="Enter Transaction ID"
                        className="input-field"
                        value={formData.transactionId}
                        onChange={(event) => handleInputChange("transactionId", event.target.value)}
                    />
                    {errors.transactionId && <span className="error-message">{errors.transactionId}</span>}

                    <div>
                        <button type="submit" className="submit-button bg-button-bg-color rounded-sm">
                            Refund
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default RefundAndDisputeResolution;
