import { Link, useNavigate } from "react-router-dom"; // Correct the import if necessary
import { useState } from "react";
import axios from "axios";
import Gender from "../components/gender.jsx";
import toast from "react-hot-toast";

export default function Register() {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    gender: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/register", inputs);
      console.log("Success:", response.data);
      navigate("/login");
      toast.success("Register successfully, Please Login..!");
      // Handle successful registration (e.g., navigate to login, show success message)
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        error.response && error.response.data
          ? error.response.data
          : error.message
      );
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="text-center flex flex-col items-center justify-center">
      <div className="font-bold text-2xl">
        Register <span className=" text-blue-300">ChitChat</span>
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
              name="fullname"
              className="grow"
              placeholder="Fullname"
              value={inputs.fullname}
              required="true"
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
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              name="username"
              className="grow"
              required="true"
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
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              required="true"
              name="email"
              className="grow"
              placeholder="Email"
              value={inputs.email}
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
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              required="true"
              name="password"
              className="grow"
              placeholder="Password"
              value={inputs.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="my-2">
          <Gender
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />
        </div>
        <button
          type="submit"
          className="px-2 py-1.5 my-2 w-full bg-blue-300 text-black rounded-lg"
        >
          Register
        </button>
      </form>

      <Link to={"/login"} className="my-2 btn btn-link">
        Already have an Account?
      </Link>
    </div>
  );
}
