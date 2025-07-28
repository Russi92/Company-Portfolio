

import { Link, useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    // لو مخزن Token احذفه
    // localStorage.removeItem('token')
    
    // رجّع المستخدم لصفحة الـ Home
    navigate('/')
  }

  return (
    <div className="w-64 bg-gray-800 min-h-screen text-white p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul>
          <li className="mb-4">
            <Link to="/dashboard/home" className="hover:text-gray-300">Home</Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/users" className="hover:text-gray-300">Users</Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/gallery" className="hover:text-gray-300">Gallery</Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/blogs" className="hover:text-gray-300">Blogs</Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/services" className="hover:text-gray-300">Services</Link>
          </li>
        </ul>
      </div>

      {/* زر الـ Logout */}
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded mt-4">
        Logout
      </button>
    </div>
  )
}

export default Sidebar;

