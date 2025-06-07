import React, { useState } from "react";
import axios from "axios";
import { login } from "../../assest";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!email.trim()) {
      formErrors.email = "Email is required";
    }

    if (!password.trim()) {
      formErrors.password = "Password is required";
    }

    setErrors(formErrors);

 
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post("http://localhost:5000/api/users/login", {
          email,
          password
        });

        if (response.status === 200) {
          alert("Login successful!");
        
          navigate("/dashboard");
        }
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "Invalid credentials");
      }
    }
  };

  return (
    <div className="Nav">
      <Navbar />
      <div className="h-screen w-screen flex">
        {/* Left side */}
        <div className="w-1/2 hidden md:block">
          <img src={login} alt="Login" className="w-full h-full object-cover" />
        </div>

        {/* Right side */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
          <div className="w-full max-w-md p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
              Login to your account
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700">Email</label>
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
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>

            <p className="mt-4 text-center text-gray-500">
              Don’t have an account?{" "}
              <Link to="/register" className="text-green-600">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
