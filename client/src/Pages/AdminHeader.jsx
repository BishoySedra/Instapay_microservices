import { useNavigate } from "react-router-dom";
export default function AdminHeader() {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication tokens or session data

    localStorage.removeItem("token");  // Clear token from localStorage
    sessionStorage.clear();  // Clear any session data if used
    navigate('/', { replace: true }); // Redirect to login page
  };


  return (

    <header className="w-full py-4 px-8 flex justify-between items-center fixed top-0 left-0 bg-purple-50 shadow-md z-50 h-[80px]">
      <button
        onClick={handleLogout}
        className="px-4 py-1 text-white bg-view-button-bg-color hover:bg-purple-500 rounded shadow transition-all duration-200 absolute right-8 top-1/2 transform -translate-y-1/2"
      >
        Logout
      </button>
    </header>




  )
}