import "./ViewHistory.css";
import CalenderPhoto from "../assets/Calender.png";
import FromIcon from "../assets/From.png";  // FromIcon image
import { useEffect, useState } from "react";
import axios from "axios";  // If you're fetching from an API

function ReceiveMoney() {
    const [receivedTransactions, setReceivedTransactions] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);  // To store the logged-in user info


    useEffect(() => {
        const fetchReceivedTransactions = async () => {
            if (loggedInUser) {
                try {
                    // Replace this with the actual API call if you have one
                    const token = localStorage.getItem("token");  // Assuming token is needed
                    const response = await axios.get("http://localhost:3000/transactions/show-all", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    // Filter transactions where the logged-in user is the receiver
                    const received = response.data.data.filter(
                        (transaction) => transaction.receiver.name === loggedInUser
                    );
                    setReceivedTransactions(received);  // Set the filtered transactions
                } catch (err) {
                    console.log("Error fetching transactions:", err);
                    setReceivedTransactions([]);  // In case of an error, set empty
                }
            }
        };

        fetchReceivedTransactions();
    }, [loggedInUser]);

    return (
        <div className="form-container container">
            {receivedTransactions.length > 0 ? (
                receivedTransactions.map((transaction) => (
                    <div key={transaction.id} className="list-item">
                        <div className="details">
                            <img
                                src={FromIcon}  // Always show "From" icon since it's a received transaction
                                alt="from-icon"
                                className="form-icon"
                            />
                            <div className="person-details">
                                <p className="number">{transaction.id}</p> 
                                <p className="name">
                                    {/* Display only the sender's name */}
                                    From {transaction.sender.name}
                                </p>
                            </div>
                        </div>

                        {/* Amount Display */}
                        <div
                            className={`money-label ${parseFloat(transaction.amount) < 0 ? "negative" : "positive" // Handle negative or positive amounts
                                }`}
                        >
                         + {transaction.amount} EGP 
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
                                    return `${year}-${month}-${day}`;  // or any format like 'YYYY-MM-DD'
                                })()}
                            </p>

                            <p
                                className={`status ${transaction.status === "SUCCESS"
                                        ? "success"
                                        : transaction.status === "PENDING"
                                            ? "pending"
                                            : "text-yellow-500" // Apply yellow color if the status is neither SUCCESS nor FAILED
                                    }`}
                            >
                                {transaction.status}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No received money transactions available.</p>
            )}
        </div>
    );
}

export default ReceiveMoney;
