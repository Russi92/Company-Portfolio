
import React from 'react'
import Sidebar from './DashboardSidebar'
import DashboardNavbar from './DashboardNavbar'
import { Outlet, useNavigate } from 'react-router-dom'

const DashboardLayout = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="flex bg-white">
      <Sidebar handleLogout={handleLogout} />
      <div className="flex-1">
        <DashboardNavbar />
        <div className="p-6">
          <Outlet /> {/* هنا هتظهر باقي صفحات لوحة التحكم */}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout;

