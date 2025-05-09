import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportsTab = () => {
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransactionSummary = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      // Adjust the endDate to include the entire day by adding one day
      const adjustedEndDate = new Date(endDate);
      adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
      const formattedEndDate = adjustedEndDate.toISOString().split('T')[0];  // Format it back to YYYY-MM-DD

      const { data } = await axios.get("http://localhost:3000/reports/transaction-summary", {
        params: { startDate, endDate: formattedEndDate },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReportData(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching transaction summary:", err);
      setError("Failed to load transaction data. Please try again.");
      setReportData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionSummary();
  }, []); // Run once on initial load

  const handleSearch = () => {
    fetchTransactionSummary();
  };

  if (error) return (
    <div className="flex justify-center items-center h-full p-8">
      <div className="bg-red-50 border border-red-300 text-red-800 px-6 py-4 rounded-lg shadow-md">
        {error}
      </div>
    </div>
  );

  return (
    <div className="mx-auto px-4 py-8">
      {/* Date Range Inputs */}
      <div className="flex justify-center mb-6 space-x-4 relative left-[290px]">
        <div className="flex flex-col">
          <label htmlFor="startDate" className="mb-2 text-gray-700">Start Date</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="endDate" className="mb-2 text-gray-700">End Date</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-12 relative left-[290px]">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Transaction Overview</h2>
        {isLoading ? (
          <div className="animate-pulse text-gray-500">Loading transactions...</div>
        ) : reportData ? (
          <div className="flex justify-center space-x-8 bg-gray-100 rounded-xl py-6 shadow-sm">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl font-semibold text-gray-700 mr-2">📊</span>
                <span className="text-2xl font-semibold text-gray-700">
                  {reportData.totalTransactions}
                </span>
              </div>
              <p className="text-gray-500">Total Transactions</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl font-semibold text-gray-700 mr-2">💳</span>
                <span className="text-2xl font-semibold text-gray-700">
                  {reportData.totalAmount.toLocaleString()} EGP
                </span>
              </div>
              <p className="text-gray-500">Total Amount</p>
            </div>
          </div>
        ) : null}
      </div>

      {/* Transaction List */}
      {reportData && (
        <div className="grid md:grid-cols-1 gap-6">
          {reportData.transactions.map((transaction, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out overflow-hidden w-[900px]"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    Transaction #{index + 1}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${
                    transaction.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : transaction.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-gray-600">
                  <div>
                    <p className="font-medium text-gray-500">Sender ID</p>
                    <p className="font-semibold">{transaction.senderId}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Receiver ID</p>
                    <p className="font-semibold">{transaction.receiverId}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Amount</p>
                    <p className="font-semibold text-blue-600">{transaction.amount} EGP</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Date</p>
                    <p className="font-semibold">{new Date(transaction.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportsTab;
