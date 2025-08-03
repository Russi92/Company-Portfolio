

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ handleLogout }) => {
  const [openHomeDropdown, setOpenHomeDropdown] = useState(false);
  const location = useLocation('');

  return (
    <div className="w-64 bg-gray-800 min-h-screen text-white p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul>
          {/* Home Dropdown */}
          <li className="mb-4">
            <button
              onClick={() => setOpenHomeDropdown(!openHomeDropdown)}
              className="flex items-center justify-between w-full hover:text-gray-300"
            >
              <span>
                <i className="fa-solid fa-house-chimney me-1"></i>Home
              </span>
              <span className="text-lg">{openHomeDropdown ? '−' : '+'}</span>
            </button>
            {openHomeDropdown && (
              <ul className="ml-5 mt-2 text-sm text-gray-300 space-y-2">
                {[
                  { path: '/dashboard/super-nova-packs', label: 'Super Nova Packs' },
                  { path: '/dashboard/super-title', label: 'Super Title' },
                  { path: '/dashboard/tiktok-reels', label: 'Tiktok Reels' },
                  { path: '/dashboard/Super-Nova-Images', label: 'Super Nova Images' },
                  { path: '/dashboard/Super-Nova-Cards', label: 'Super Nova Cards' },
                  { path: '/dashboard/TestImonials', label: 'TestImonials' },
                  { path: '/dashboard/Subscribe', label: 'Subscribe' },
                  { path: '/dashboard/Faqs', label: 'FAQS' },
                  { path: '/dashboard/Partners', label: 'Partners' },
                ].map(({ path, label }) => (
                  <li key={path}>
                    <Link
                      to={path}
                      className={`block ${
                        location.pathname.startsWith(path) ? 'text-black font-semibold , bg-white w-full p-1 h-7 rounded' : ''
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* باقي العناصر */}
          <li className="mb-4">
            <Link
              to="users"
              className={`hover:text-gray-300 ${
                location.pathname === '/dashboard/users' ? 'text-white font-semibold' : ''
              }`}
            >
              <i className="fa-solid fa-user-tie me-1"></i>Users
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="gallery"
              className={`hover:text-gray-300 ${
                location.pathname === '/dashboard/gallery' ? 'text-white font-semibold' : ''
              }`}
            >
              <i className="fas fa-images me-1"></i>Gallery
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="blogs"
              className={`hover:text-gray-300 ${
                location.pathname === '/dashboard/blogs' ? 'text-white font-semibold' : ''
              }`}
            >
              <i className="fa-solid fa-blog me-1"></i>Blogs
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="services"
              className={`hover:text-gray-300 ${
                location.pathname === '/dashboard/services' ? 'text-white font-semibold' : ''
              }`}
            >
              <i className="fa-solid fa-gear me-1"></i>Services
            </Link>
          </li>
        </ul>
      </div>

      <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded mt-4"
      >
        <i className="fa-solid fa-right-from-bracket fa-rotate-180 me-1"></i>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

