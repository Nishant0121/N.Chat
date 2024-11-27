import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "./context/authcontext";
import AllUser from "./pages/alluser";
import axios from "axios";

function App() {
  const { authUser } = useContext(AuthContext);

  axios.defaults.baseURL = "https://n-chat-av13.onrender.com";
  axios.defaults.withCredentials = true;

  return (
    <div className="h-screen w-screen flex items-start justify-center overflow-auto md:overflow-hidden">
      <div className="h-full w-full p-1 sm:p-1 md:p-4 bg-white-100 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 shadow-lg">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to={"/"} /> : <Login />}
          />
          <Route
            path="/register"
            element={authUser ? <Navigate to={"/"} /> : <Register />}
          />
          <Route
            path="/allusers"
            element={authUser ? <AllUser /> : <Navigate to={"/login"} />}
          />
        </Routes>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
