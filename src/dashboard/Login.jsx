

import React, { useState } from 'react'
import axios from '../api/axiosInstance'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')
  
    try {
      const res = await axios.post('/login', {
        email,
        password
      })
  
      setMessage('Login successful!')
      console.log('Response:', res.data)
  
      if (res.data.access_token) {
        localStorage.setItem('token', res.data.access_token)
      }
  
      setTimeout(() => {
        navigate('/dashboard/users')
      }, 1000)
  
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(`Login failed: ${err.response.data.message}`)
      } else {
        setError('Login failed. Please check your credentials.')
      }
      console.error('Login error:', err)
    }
  }
  
  

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#003A3A] via-[#007171] to-[#00B2B1]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded text-black focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded text-black pr-10 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-[#007171] text-white py-2 rounded hover:bg-[#005959] transition"
        >
          Login
        </button>

        {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </form>
    </div>
  )
}

export default Login;


