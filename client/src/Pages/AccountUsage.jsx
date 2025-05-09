import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function AccountUsage({ id }) {
  const [accountUsage, setAccountUsage] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = useSelector(state => state.auth.id);
  const token = localStorage.getItem('token');
  console.log(token);
  console.log(userId);

  useEffect(() => {
    const fetchAccountUsage = async () => {
      const reportServiceUrl = import.meta.env.VITE_REPORT_SERVICE_URL;
      console.log(reportServiceUrl);
      
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${reportServiceUrl}/api/reports/summary`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.data;
        console.log(data);

        setAccountUsage({
          transactionsSent: data.transactionsSent,
          transactionsReceived: data.transactionsReceived,
          totalReceivedAmount: data.totalReceivedAmount,
          totalSentAmount: data.totalSentAmount,
        });
        
      } catch (error) {
        console.error('Error fetching account usage:', error);
        toast.error('Failed to fetch account usage. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAccountUsage();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto mt-8 px-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-purple-100 rounded w-1/3"></div>
            <div className="space-y-3">
              <div className="h-4 bg-purple-50 rounded"></div>
              <div className="h-4 bg-purple-50 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!accountUsage) {
    return (
     <div className='form-container'>
       <div className="w-full max-w-md mx-auto mt-8 px-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-500 text-center">No account usage data available.</p>
        </div>
      </div>
     </div>
    );
  }

  return (
    <div className="form-container">
      <div className="bg-white rounded-xl p-6 w-[500px]">
      
        <div className="space-y-4">
          <div className="p-4  bg-gradient-to-r from-purple-50 to-white border-l-8 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Transactions Sent</p>
                <p className="text-2xl font-semibold text-purple-800 mt-1">
                  {accountUsage.transactionsSent}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-4  bg-gradient-to-r from-purple-50 to-white border-l-8 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Transactions Received</p>
                <p className="text-2xl font-semibold text-purple-800 mt-1">
                  {accountUsage.transactionsReceived}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-4  bg-gradient-to-r from-purple-50 to-white border-l-8 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Received Amount</p>
                <p className="text-2xl font-semibold text-purple-800 mt-1">
                  ${accountUsage.totalReceivedAmount.toLocaleString()}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l1.5 1.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-4  bg-gradient-to-r from-purple-50 to-white border-l-8 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Sent Amount</p>
                <p className="text-2xl font-semibold text-purple-800 mt-1">
                  ${accountUsage.totalSentAmount.toLocaleString()}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}