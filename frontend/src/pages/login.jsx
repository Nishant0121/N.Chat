import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loder/loder.jsx";
import { AuthContext } from "../context/authcontext";

export default function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await axios.post("/api/auth/login", inputs);
      console.log("Success:", response.data);
      navigate("/");
      localStorage.setItem("chat-user-info", JSON.stringify(response.data));
      setAuthUser(response.data);
      toast.success("Login successful!");
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center flex flex-col items-center justify-center">
      <div className="my-2 font-bold text-2xl">
        Login <span className="text-blue-300">ChitChat</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="my-2">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              name="username"
              className="grow"
              placeholder="Username"
              value={inputs.username}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="my-2">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 1 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="password"
              className="grow"
              placeholder="Password"
              value={inputs.password}
              onChange={handleChange}
            />
          </label>
        </div>
        {error && <div className="text-red-500 my-2">{error}</div>}
        <button
          disabled={loading}
          className="px-2 py-1.5 w-full my-2 bg-blue-300 text-black rounded-lg"
        >
          {loading ? <Loader /> : "Login"}
        </button>
      </form>

      <Link to="/register" className="btn btn-link">
        {"Don't"} have an account?
      </Link>
    </div>
  );
}
