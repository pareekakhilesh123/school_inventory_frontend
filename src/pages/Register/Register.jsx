import React, { useState } from "react";
import axios from "axios";
import { login } from "../../assest";  
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!username.trim()) {
      formErrors.username = "Username is required";
    }

    if (!email.trim()) {
      formErrors.email = "Email is required";
    }

    if (!password.trim()) {
      formErrors.password = "Password is required";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post("http://localhost:5000/api/users/register", {
          username,
          email,
          password,
        });

        if (response.status === 200 || response.status === 201) {
          alert("Registration successful!");
          setUsername("");
          setEmail("");
          setPassword("");
          navigate("/login");
        } else {
          alert("Registration failed");
        }
      } catch (error) {
        console.error("Error:", error);
        alert(error.response?.data?.message || "Something went wrong!");
      }
    }
  };

  return (
    <div className="h-screen w-screen flex">
      {/* Left side (Form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Create an Account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.username ? "border-red-500" : "focus:ring-blue-500"
                }`}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700">Email ID</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email ? "border-red-500" : "focus:ring-blue-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password ? "border-red-500" : "focus:ring-blue-500"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side (Image) */}
      <div className="w-1/2 hidden md:block">
        <img
          src={login}
          alt="Register"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
