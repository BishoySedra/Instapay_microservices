import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux"; // Ensure you're dispatching actions
import { authActions } from "../store";
import axios from "axios";

export default function Layout() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userServiceUrl = import.meta.env.VITE_USER_SERVICE_URL;

    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${userServiceUrl}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          const { username, email, _id,balance } = response.data.data;          
          dispatch(authActions.addUsername(username));
          dispatch(authActions.addEmail(email));
          dispatch(authActions.addID(_id));
          dispatch(authActions.addBalance(balance));
          dispatch(authActions.login({ email, token })); // Restore Redux state
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [dispatch]); // Empty dependency array to run only once on mount

  return (
    <>
      <Header />
      <div className="pt-16">
        <Outlet />
      </div>
    </>
  );
}
