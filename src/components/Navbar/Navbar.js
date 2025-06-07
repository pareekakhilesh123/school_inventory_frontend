import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogin = () => {
    
    navigate("/login");
  };

   const handleSignup = () => {
    
    navigate("/register");
  };

  return (
    <nav className="bg-gray-800 w-full shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
     
          <div className="flex items-center">
            <span className="text-white font-bold text-xl">  Inventory Dashboard</span>
          </div>
 
          <div className="hidden sm:flex space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white text-sm font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white text-sm font-medium">
              About
            </Link>
          </div>
 
          <div>

   <button
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-green-600 text-white m-4 px-4 py-2 rounded-md text-sm font-semibold"
            >
              Login
            </button>
            <button
              onClick={handleSignup}
              className="bg-blue-500 hover:bg-green-600 text-white m-4 px-2 py-2 rounded-md text-sm font-semibold"
            >
              Sign Up 
            </button>

            {/* <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold"
            >
              Logout
            </button> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
 