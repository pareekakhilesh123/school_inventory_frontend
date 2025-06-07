 import React  from "react";
import { login } from "../../assest";
import Navbar from "../../components/Navbar/Navbar";



const Error = () => {
  return (
    <div className="Navbar">
      <Navbar />
      <div className="flex flex-col md:flex-row h-screen w-screen">
        {/* Left side */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4">
          <div className="w-full max-w-md text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">404 Error Page</h2>
            <p className="text-gray-700 mb-2">Page not found</p>
            <p className="text-gray-600">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full  hidden md:block">
          <img
            src={login}
            alt="Error Illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Error;
