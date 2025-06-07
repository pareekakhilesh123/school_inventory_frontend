import React from 'react'
  
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'

import { Outlet } from 'react-router-dom';
function Dashboard() {
  return ( 
    <div>
      <Navbar />
      <div className="flex">
      
        <Sidebar />
        <div className="flex-1 p-4 bg-gray-100 min-h-screen">
     
          <Outlet />
        </div>
      </div>
    </div>

  )
}

export default Dashboard