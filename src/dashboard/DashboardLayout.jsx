
import React from 'react';
import Sidebar from './DashboardSidebar';
import DashboardNavbar from './DashboardNavbar';
import { Outlet, useNavigate } from 'react-router-dom';


const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* ✅ Sidebar ثابت */}
      <div className="w-64 fixed left-0 top-0 h-full z-30">
        <Sidebar handleLogout={handleLogout} />
      </div>

      {/* ✅ المحتوى الرئيسي */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* ✅ Navbar ثابت فوق */}
        <div className="fixed top-0 left-64 right-0 z-20">
          <DashboardNavbar />
        </div>

        {/* ✅ محتوى الصفحة بيعمل Scroll */}
        <div className="mt-16 p-6 overflow-y-auto h-full">
          <Outlet /> {/* باقي صفحات لوحة التحكم */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;


