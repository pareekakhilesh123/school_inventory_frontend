import React  from "react";
import { login } from "../../assest";


const Error = () => {
  return (
    <div className="h-screen w-screen flex">
   
      {/* Right side */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          404 Error Page 
          </h2>

            <div>
              <label className="block text-gray-700">
                Page not found
              </label>
           
            </div>

            <div>
              <label className="block text-gray-700">
                Sorry, we couldn’t find the page you’re looking for.
              </label>
          
          
            </div>

         
          
        
        </div>
      </div>

         {/* Left side */}
      <div className="w-1/2 hidden md:block">
        <img src={login} alt="Login" className="w-full h-full object-cover" />
      </div>

    </div>
  );
};
export default Error