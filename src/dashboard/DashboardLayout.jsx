


import React from 'react'
import Sidebar from './DashboardSidebar'
import DashboardNavbar from './DashboardNavbar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className="flex bg-white">
      <Sidebar />
      <div className="flex-1">
        <DashboardNavbar />
        <div className="p-6">
          <Outlet /> {/* هنا هتظهر باقي صفحات لوحة التحكم */}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout

