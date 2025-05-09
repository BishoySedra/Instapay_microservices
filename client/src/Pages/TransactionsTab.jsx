import { useState, useEffect } from "react";
import axios from "axios";
import "./ViewHistory.css"; // Ensure both components share the same CSS
import CalenderPhoto from "../assets/Calender.png"; // Calendar icon
import ToIcon from "../assets/To.png"; // ToIcon image
import FromIcon from "../assets/From.png"; // FromIcon image
import { toast } from "react-toastify";
function TransactionsTab() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For error state

    // Function to fetch transactions
    const fetchTransactions = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get("http://localhost:3000/admin/transactions", {
                params: { page: 1, pageSize: 40 },
                headers: { Authorization: `Bearer ${token}` },
            });
            setTransactions(response.data.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching transactions:", err);
            setError("Failed to fetch transactions. Please try again later.");
        }
    };

    // Fetch transactions on component mount
    useEffect(() => {
        fetchTransactions();
    }, []); // Empty dependency array, so it only runs on mount

    // Suspend a transaction
    const suspendTransaction = async (transactionId) => {
        const token = localStorage.getItem("token");
        try {
            // Send the suspend request to the backend
            await axios.patch(
                `http://localhost:3000/admin/suspendTransaction/${transactionId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // After the suspend request is successful, refetch transactions to get the updated status
            fetchTransactions();  // Refetch transactions from the server

            toast.success("Transaction suspended successfully.");
        } catch (err) {
            console.error("Error suspending transaction:", err);
            alert("Failed to suspend the transaction. Please try again.");
        }
    };

    if (loading) {
        return <div>Loading transactions...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!transactions || transactions.length === 0) {
        return <div>No transactions available.</div>;
    }

    return (
        <div className="w-[1200px]">
            {transactions.map((transaction) => (
                <div key={transaction.id} className="list-item justify-between items-center mb-4">
                    {/* Transaction Details */}
                    <div className="details flex items-center">
                        <img
                            src={transaction.type.direction === "to" ? ToIcon : FromIcon}
                            alt={`${transaction.type.direction}-icon`}
                            className="form-icon w-12 h-12 object-cover mr-4"
                        />
                        <div className="person-details">
                            <p className="number font-bold">{transaction.receiverBankAccount.accountNumber}</p>
                            <p className="name whitespace-nowrap">
                                From {transaction.sender?.name || "Unknown"} To {transaction.receiver?.name || "Unknown"}
                            </p>
                        </div>
                    </div>

                    {/* Amount */}
                    <div
                        className={`money-label ${String(transaction.amount).startsWith("-") ? "negative" : "positive"} font-semibold text-lg`}
                    >
                        {transaction.amount} EGP
                    </div>

                    {/* Date and Status */}
                    <div className="info text-right">
                        <p className="date text-sm text-gray-500">
                            <img src={CalenderPhoto} alt="calendar-icon" className="mr-2" />
                            {new Date(transaction.createdAt).toLocaleDateString()}
                        </p>
                        <p
                            className={`status font-semibold ${transaction.status.toLowerCase() === "success"
                                    ? "text-green-500"
                                    : transaction.status.toLowerCase() === "failed"
                                        ? "text-yellow-500"
                                        : "text-red-500"
                                }`}
                        >
                            {transaction.status}
                        </p>
                    </div>

                    {/* Suspend Button */}
                    <button
                        onClick={() => suspendTransaction(transaction.id)}
                        className="font-bold bg-gray-300 hover:bg-gray-200 p-2 rounded transition-all duration-900"
                        disabled={transaction.status.toLowerCase() === "success" || transaction.status.toLowerCase() === "failed"}
                    >
                        Suspend
                    </button>
                </div>
            ))}
        </div>
    );
}

export default TransactionsTab;
