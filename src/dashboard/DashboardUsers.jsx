


import React, { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // ✅ جديد

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/users/getall', {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("✅ Users fetched:", res.data);
      setUsers(res.data.users);
    } catch (error) {
      console.error('❌ Error fetching users:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Unauthorized, please login.");
      return;
    }

    try {
      if (editMode) {
        await axios.put(`/users/${editingId}`,
          {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            password_confirmation: newUser.password,
            role: newUser.role,
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        console.log("✅ User updated");
      } else {
        await axios.post('/create-user',
          {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            password_confirmation: newUser.password,
            role: newUser.role,
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        console.log("✅ User created");
      }

      setNewUser({ name: '', email: '', password: '', role: '' });
      setEditMode(false);
      setEditingId(null);
      setShowForm(false);
      fetchUsers();

    } catch (err) {
      console.error('❌ Error:', err.response?.data || err.message);
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  const handleDeleteUser = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) {
      console.error("❌ Error deleting user:", err.response?.data || err.message);
      alert("Failed to delete user.");
    }
  };

  const handleEditUser = (user) => {
    setShowForm(true);
    setEditMode(true);
    setEditingId(user.id);
    setNewUser({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
    });
  };

  return (
    <div className="p-6 text-black bg-gray-700 rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Users</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showForm ? 'Close' : 'Add User'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddUser} className="mb-6 bg-gray-100 p-4 rounded shadow">
          <div className="mb-2">
            <label className="block font-semibold">Name:</label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded focus:outline-none"
            />
          </div>

          <div className="mb-2">
            <label className="block font-semibold">Email:</label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded focus:outline-none"
            />
          </div>

          <div className="mb-2 relative">
            <label className="block font-semibold">Password:</label>
            <input
              type={showPassword ? "text" : "password"} // ✅ متغير الحالة
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded focus:outline-none pr-10"
            />
            <span
              className="absolute top-9 right-3 text-gray-600 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
            </span>
          </div>

          <div className="mb-2">
            <label className="block font-semibold">Role:</label>
            <select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded focus:outline-none"
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded mt-2">
            {editMode ? 'Update User' : 'Create User'}
          </button>
        </form>
      )}

      {loading ? (
        <p>Loading users...</p>
      ) : users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b text-center">{user.id}</td>
                  <td className="py-2 px-4 border-b text-center">{user.role}</td>
                  <td className="py-2 px-4 border-b text-center">{user.name}</td>
                  <td className="py-2 px-4 border-b text-center">{user.email}</td>
                  <td className="py-2 px-4 border-b text-center space-x-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-blue-600 hover:underline"
                    >
                      <i className="fas fa-pen"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:underline"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Users;
