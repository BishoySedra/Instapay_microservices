import "./ViewHistory.css";
import CalenderPhoto from "../assets/Calender.png";
import ToIcon from "../assets/To.png";  // Import ToIcon image
import FromIcon from "../assets/From.png";  // Import FromIcon image
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function ViewHistory() {
    const [userHistory, setUserHistory] = useState([]);  // Default to an empty array
    const [loggedInUser, setLoggedInUser] = useState(null);
    const username = useSelector((state) => state.auth.username);
    const userId = useSelector((state) => state.auth.id);


    // Fetch user transaction history on component mount
    useEffect(() => {
        const fetchUserTransactions = async () => {
            const token = localStorage.getItem("token");
            const transactionServiceUrl = import.meta.env.VITE_TRANSACTION_SERVICE_URL;
            try {
                const response = await axios.get(`${transactionServiceUrl}/api/transaction`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("transactions fetched:", response.data.data);
                setLoggedInUser(response.data.name);
                setUserHistory(response.data.data); // Set the transaction history data
            } catch (err) {
                console.log("Error fetching user data:", err.response || err);
                console.log(token);
            }
        };

        fetchUserTransactions();
    }, []);

    return (
        <div className="form-container container">
            {userHistory.length > 0 ? (
                userHistory.map((transaction) => (
                    <div key={transaction._id} className="list-item">
                        {/* Transaction Details */}
                        <div className="details">
                            <img
                                src={FromIcon}  // Use a single icon for all transactions
                                alt="Transaction-icon"
                                className="form-icon"
                            />
                            <div className="person-details flex flex-col space-y-1">
                                <p className="text-sm font-medium text-gray-500">
                                    {/* Display transaction ID */}
                                </p>
                                <p className="text-base font-semibold text-gray-800">
                                    {/* Display sender and receiver IDs */}
                                    From{" "}
                                    <span >
                                        {transaction.senderId === userId ? username : transaction.senderId}
                                    </span>{" "}
                                    to{" "}
                                    <span >
                                        {transaction.receiverId === userId ? username : transaction.receiverId}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Amount */}
                        <div className="money-label relative right-36">
                            {`${transaction.amount} EGP`}  {/* Display amount without styling */}
                        </div>

                        {/* Date and Status */}
                        <div className="info">
                            <p className="date">
                                <img src={CalenderPhoto} alt="calender-icon" />
                                {(() => {
                                    const date = new Date(transaction.createdAt);
                                    const year = date.getFullYear();
                                    const month = String(date.getMonth() + 1).padStart(2, '0');
                                    const day = String(date.getDate()).padStart(2, '0');
                                    return `${year}-${month}-${day}`;  // Format as 'YYYY-MM-DD'
                                })()}
                            </p>
                            <p className="status text-green-500">
                                {transaction.status}  {/* Display status without additional styling */}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No transaction history available.</p>
            )}
        </div>
    );
}

export default ViewHistory;
