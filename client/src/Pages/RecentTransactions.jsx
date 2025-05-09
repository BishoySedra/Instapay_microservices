import React, { useState } from "react";
import axios from "axios";
import GoIcon from "../assets/GoIcon.svg";
import DeleteIcon from "../assets/DeleteIcon.svg";
import FromIcon from "../assets/To.png";
import ToIcon from "../assets/From.png";
import CalenderIcon from "../assets/Calender.png";
import { toast } from "react-toastify";
import { useEffect } from "react";

const TransactionItem = ({ transaction, onSuspend, name }) => {
  const isSender = name === transaction.sender.name;

  const statusClass =
    transaction.status.toLowerCase() === "success"
      ? "text-green-500"
      : transaction.status.toLowerCase() === "pending"
        ? "text-red-500"
        : "text-yellow-500";

  return (
    <div className="flex justify-between items-center p-4 w-full h-[100px] hover:bg-slate-50 hover:rounded-md">
      {/* Left Section: Icon + ID + To/From */}
      <div className="flex items-center gap-4">
        <div
          className={`w-20 h-10 flex justify-center items-center rounded-full ${isSender ? "bg-red-100" : "bg-green-100"
            }`}
        >
          <img
            src={isSender ? ToIcon : FromIcon}
            alt={isSender ? "to-icon" : "from-icon"}
          />
        </div>
        <div>
          <p className="font-bold">{transaction.receiverBankAccount.accountNumber}</p>
          <p className="font-bold flex flex-col">
            {isSender
              ? `To ${transaction.receiver.name}`
              : `From ${transaction.sender.name}`}
          </p>
        </div>
      </div>

      {/* Right Section: Amount, Date, Status, and Actions */}
      <div className="flex items-center ml-auto gap-16">
        {/* Amount and Date */}
        <div className="text-right flex flex-col">
          <p
            className={`font-bold ${isSender ? "text-red-500" : "text-green-500"
              }`}
          >
            {isSender ? `- ${transaction.amount} EGP` : `+ ${transaction.amount} EGP`}
          </p>
          <p className="text-sm text-gray-500">
            <div className="flex flex-row items-center">
              <img src={CalenderIcon} className="mr-3" alt="calendar-icon" />
              {new Date(transaction.createdAt).toLocaleDateString()}
            </div>
          </p>
        </div>
        <div className="text-right">
          <p className={`${statusClass} font-bold`}>{transaction.status}</p>
        </div>
        <div className="flex gap-2">
          {/* Suspend Button */}
          <button
            onClick={() => onSuspend(transaction.id)}
            className="bg-gray-300 hover:bg-gray-200 p-2 rounded"
            disabled={transaction.status.toLowerCase() === "success" || transaction.status.toLowerCase() === "failed"}
          >
            {/* Change Delete icon to reflect suspending transaction */}
            <p className="font-bold">Suspend</p>
          </button>
        </div>
      </div>
    </div>
  );
};



const RecentTransactions = ({ transactions, name, id }) => {
  const [transactionList, setTransactionList] = useState(transactions);

  const fetchUserTransactions = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:3000/admin/userDetails/${id}`,
        {
          params: { page: 1, pageSize: 40 },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data.data.transactions);
      setTransactionList(response.data.data.transactions);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      toast.error("Failed to load transactions.");
    }
  };

  useEffect(() => {
    fetchUserTransactions();
  }, [id]); 

  const handleSuspend = async (transactionId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        `http://localhost:3000/admin/suspendTransaction/${transactionId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Refetch transactions after suspend
      fetchUserTransactions();
      toast.success("Transaction suspended successfully!");
    } catch (error) {
      console.error("Error suspending transaction:", error);
      toast.error("Failed to suspend transaction.");
    }
  };

  return (
    <div className="mx-auto mt-10 transform -translate-x-[200px] w-[1090px]">
      {transactionList.length > 0 ? (
        <div>
          <h2 className="text-lg font-bold p-4 text-welcome-text-h1">
            Recent Transactions
          </h2>
          <div>
            {transactionList.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                name={name}
                onSuspend={handleSuspend}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-lg font-bold p-4 text-welcome-text-h1 relative ml-[365px]">
          This user has no transactions
        </p>
      )}
    </div>
  );
};

export default RecentTransactions;
