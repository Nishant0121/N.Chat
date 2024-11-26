import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchInput from "./searchinput";
import UserConversation from "./usersconver";
import { CiLogout } from "react-icons/ci";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import Loader from "../loder/loder";
import { AuthContext } from "../../context/authcontext";
import useConversation from "../../zustand/useConversation";

export default function Sidebar() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useContext(AuthContext);
  const { isSidebarOpen } = useConversation();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/auth/logout");
      console.log("Logout Response:", response);

      // Clear localStorage and Auth Context
      localStorage.removeItem("chat-user-info");
      setAuthUser(null);

      // Redirect to login page
      navigate("/login");

      // Display success message
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error(
        error.response && error.response.data
          ? error.response.data
          : "An error occurred during logout"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "absolute md:relative" : "hidden"
      } bg-white md:bg-transparent rounded-lg z-10 top-0 left-0 h-[95vh] w-full sm:w-72 flex flex-col items-center shadow-md transition-transform duration-300`}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center w-full px-4 py-2 bg-green-500 text-white rounded-t-lg">
        <Link
          to="/allusers"
          className="px-4 py-2 bg-green-700 hover:bg-green-800 rounded-md transition"
        >
          All Users
        </Link>
        <button
          className="flex items-center px-3 py-2 bg-red-600 hover:bg-red-700 rounded-md transition"
          onClick={handleLogout}
        >
          {loading ? (
            <>
              <span className="mr-2">Logging Out...</span>
              <Loader />
            </>
          ) : (
            <>
              <CiLogout className="h-6 w-6 mr-2" />
              Logout
            </>
          )}
        </button>
      </div>

      {/* Search Input */}
      <div className="mt-4 w-full px-4">
        <SearchInput />
      </div>

      {/* Divider */}
      <div className="w-full border-t my-4"></div>

      {/* User Conversations */}
      <div className="flex-1 w-full px-4 overflow-y-auto">
        <UserConversation />
      </div>
    </div>
  );
}
