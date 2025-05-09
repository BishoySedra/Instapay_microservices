import React, { useState, useEffect } from "react";
import axios from "axios"; // For making API calls
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton"; // Import the Skeleton component
import "react-loading-skeleton/dist/skeleton.css"; // Import the CSS for Skeleton

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // For handling loading state
  const [error, setError] = useState(null); // For handling errors
  const userId = useSelector((state) => state.auth.id);
  localStorage.getItem("id");

  useEffect(() => {
    const fetchUserStatusAndNotifications = async () => {
      if(!userId) return;
      const token = localStorage.getItem("token");
      const notificationServiceUrl = import.meta.env.VITE_NOTIFICATION_SERVICE_URL;
      try {
        // Fetch notifications using the fetched ID
        const notificationsResponse = await axios.get(`${notificationServiceUrl}/api/notifications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotifications(notificationsResponse.data); // Correctly set the notifications data
        console.log(notificationsResponse.data);
      } catch (err) {
        console.error("Error fetching user status or notifications:", err);
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserStatusAndNotifications();
  }, [userId]); // Added userId as dependency to rerun if it changes

  // Function to mark a notification as read
  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:3000/notifications/${id}/read`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the state to mark as read
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  // Filter notifications to only show unread ones

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20">
      <h1 className="text-2xl font-bold text-purple-800 text-center mb-6">Notifications</h1>

      {loading ? (
        <div className="space-y-4">
          {/* Skeleton loaders for the notifications */}
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex justify-between items-start p-4 border rounded-lg shadow-md bg-white">
              <div className="flex-1">
                <Skeleton count={1} height={20} width="100%" />
                <Skeleton count={1} height={15} width="80%" />
              </div>
              <div>
                <Skeleton className="ml-3" count={1} height={30} width={100} />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : notifications.length === 0 ? (
        <p className="text-center text-gray-500">You have no  notifications.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex justify-between items-start p-4 border rounded-lg shadow-md bg-white"
            >
              <div className="flex-1">
                <p className="text-base text-gray-700 leading-relaxed">
                  <span className="font-medium text-purple-800">Message:</span> {notification.message}   {(() => {
                                    const date = new Date(notification.createdAt);
                                    const year = date.getFullYear();
                                    const month = String(date.getMonth() + 1).padStart(2, '0');
                                    const day = String(date.getDate()).padStart(2, '0');
                                    return `${year}-${month}-${day}`;  // Format as 'YYYY-MM-DD'
                                })()}
                </p>
              </div>
              <div>
                {/* <button
                  onClick={() => markAsRead(notification.id)}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Mark as Read
                </button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
