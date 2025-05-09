import "./SendMoney.css";
import Input from "../Components/Input";
import { useState } from "react";
import axios from "axios"; // Import Axios
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

const SendMoney = () => {
    const [formData, setFormData] = useState({
        email: "", // Changed from accountNumber to email
        amount: "",
    });

    const [errors, setErrors] = useState({
        email: "", // Changed from accountNumber to email
        amount: "",
    });
    const balance = useSelector((state) => state.auth.balance);
    const email = useSelector((state) => state.auth.email);
    const dispatch = useDispatch();
    console.log(balance);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[cC][oO][mM]$/; // Regex for email validation

    // Function to handle input change and validation
    function handleInputChange(identifier, value) {
        setFormData(prevFormData => ({
            ...prevFormData,
            [identifier]: value
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [identifier]: "" // Clear error when user modifies the field
        }));
    }

    // Function to validate the form data before submission
    function validateFormData() {
        let isValid = true;

        // Validate email (must be non-empty, match email regex, and not be the user's own email)
        if (!formData.email) {
            setErrors(prevErrors => ({
                ...prevErrors,
                email: "Receiver email is required",
            }));
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                email: "Invalid email format",
            }));
            isValid = false;
        } else if (formData.email === email) {
            setErrors(prevErrors => ({
                ...prevErrors,
                email: "You cannot send money to yourself",
            }));
            isValid = false;
        }

        // Validate amount (must be non-empty, numeric, and not exceed balance)
        if (!formData.amount) {
            setErrors(prevErrors => ({
                ...prevErrors,
                amount: "Amount is required",
            }));
            isValid = false;
        } else if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
            setErrors(prevErrors => ({
                ...prevErrors,
                amount: "Amount must be a valid number greater than 0",
            }));
            isValid = false;
        } else if (parseFloat(formData.amount) > balance) {
            setErrors(prevErrors => ({
                ...prevErrors,
                amount: "Amount exceeds your available balance",
            }));
            isValid = false;
        }

        return isValid;
    }

    // Handle form submission
    async function handleSubmit(event) {
        event.preventDefault();
        const transactionServiceUrl = import.meta.env.VITE_TRANSACTION_SERVICE_URL;
        if (validateFormData()) {
            try {
                const token = localStorage.getItem('token'); // Example: Retrieve token from storage
                const response = await axios.post(
                    `${transactionServiceUrl}/api/transaction/send`,
                    {
                        receiverEmail: formData.email, // Changed from accountNumber to email
                        amount: parseFloat(formData.amount),
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Include token in Authorization header
                        },
                    }
                );

                if (response.data) {
                    toast.success(response.data.message);

                    // Dispatch the updated balance
                    dispatch(authActions.addBalance(balance - parseFloat(formData.amount)));

                    setFormData({
                        email: "", // Reset email field
                        amount: "",
                    });
                }
            } catch (error) {
                console.error("Error:", error.response?.data || error.message);
                toast.error("Transaction failed: " + error.response?.data?.message || "Please try again.");
            }
        }
    }

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <div className="input">
                    <Input
                        label="Receiver Email"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter Receiver Email"
                        className={`input-field ${errors.email ? "input-error" : ""}`}
                        value={formData.email}
                        onChange={(event) => handleInputChange("email", event.target.value)}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="input">
                    <Input
                        label="Amount"
                        type="number"
                        id="amount"
                        name="amount"
                        placeholder="Enter Amount"
                        className={`input-field ${errors.amount ? "input-error" : ""}`}
                        value={formData.amount}
                        onChange={(event) => handleInputChange("amount", event.target.value)}
                    />
                    {errors.amount && <span className="error-message">{errors.amount}</span>}
                </div>
                <div>
                    <button type="submit" className="submit-button bg-button-bg-color rounded-sm">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default SendMoney;
