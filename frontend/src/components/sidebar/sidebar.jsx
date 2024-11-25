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
      console.log(response);
      localStorage.removeItem("chat-user-info");
      setAuthUser(null);
      navigate("/login");
      toast.success("Logout successfully");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response && error.response.data
          ? error.response.data
          : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "absolute" : "hidden"
      } bg-white  md:bg-transparent  rounded-lg md:relative z-10 top-0 left-0  h-[95vh] w-[90vw] sm:w-fit flex flex-col items-center justify-start`}
    >
      <Link to="/allusers" className="p-2 bg-green-500 px-3 text-white">
        All Users
      </Link>
      <SearchInput />
      <div className="divider px-3 mt-1 mb-1"></div>

      <UserConversation />
      <div
        className=" bg-slate-600 w-full p-2 rounded-lg absolute bottom-0 flex items-center"
        onClick={handleLogout}
      >
        <CiLogout className="h-6 w-6 font-bold text-white" />
        <h1 className="ml-2 text-white flex items-center justify-center">
          {loading ? "Logining Out...." : "Logout"}
          <span>{loading ? <Loader /> : ""}</span>
        </h1>
      </div>
    </div>
  );
}
