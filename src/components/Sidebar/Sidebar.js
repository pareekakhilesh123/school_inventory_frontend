import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-700 text-white p-4">
      <NavLink
        to="/dashboard/category"
        className="block mb-4 p-2 rounded hover:bg-gray-600"
      >
         Category
      </NavLink>
      <NavLink
        to="/dashboard/items"
        className="block p-2 rounded hover:bg-gray-600"
      >
         Items
      </NavLink>
    </div>
  );
};

export default Sidebar;
