


// import React, { useState } from 'react'
// import axios from 'axios'

// const Followers = () => {
//   const [email, setEmail] = useState('')
//   const [showMessage, setShowMessage] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       const res = await axios.post('https://theway4business.27lashabab.com/api/followers/create', {
//         email: email,
//       })

//       if (res.status === 200 || res.status === 201) {
//         setShowMessage(true)
//         setEmail('')

//         // اخفاء الرسالة بعد 3 ثواني
//         setTimeout(() => {
//           setShowMessage(false)
//         }, 3000)
//       }
//     } catch (err) {
//       console.error('Error submitting email:', err)
//     }
//   }

//   return (
//     <div className='text-center mb-10'>
//       <div className='font-extrabold text-5xl mb-5'>Stories and interviews</div>

//       <div>
//         Subscribe to learn about new product features, the latest in technology,
//         <br />
//         solutions, and updates.
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className='mt-5 flex justify-center items-center'>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder='Enter your email'
//             required
//             className='w-56 h-10 rounded p-2 text-black border-none focus:outline-none'
//           />

//           <button
//             type="submit"
//             className="ms-2 border border-solid border-white text-black px-4 py-2 rounded"
//             style={{ backgroundColor: '#00FFFF' }}
//           >
//             Subscribe
//           </button>
//         </div>

//         <div className='text-xs mt-2'>We care about your data in our <span className='underline cursor-pointer'>privacy policy</span> </div>
//       </form>

//       {showMessage && (
//         <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-green-600 font-bold text-xl p-6 rounded-lg shadow-lg z-50">
//             ✅ Thanks for subscribing!
//         </div>
//         )}

//     </div>
//   )
// }

// export default Followers;

import React, { useState } from 'react'
import axios from 'axios'

const Followers = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setShowMessage(false)

    try {
      const res = await axios.post('https://theway4business.27lashabab.com/api/followers/create', {
        email,
      })

      if (res.status === 200 || res.status === 201) {
        setEmail('')

        // عرض الـ Spinner لمدة ثانيتين
        setTimeout(() => {
          setIsLoading(false)
          setShowMessage(true)

          // بعد 3 ثواني من عرض الرسالة يتم إخفاؤها
          setTimeout(() => {
            setShowMessage(false)
          }, 3000)
        }, 2000)
      }
    } catch (err) {
      setIsLoading(false)
      console.error('Error submitting email:', err)
    }
  }

  return (
    <div className='text-center mb-10'>
      <div className='font-extrabold text-5xl mb-5'>Stories and interviews</div>

      <div>
        Subscribe to learn about new product features, the latest in technology,
        <br />
        solutions, and updates.
      </div>

      <form onSubmit={handleSubmit}>
        <div className='mt-5 flex justify-center items-center'>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            required
            className='w-56 h-10 rounded p-2 text-black border-none focus:outline-none'
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`ms-2 border border-solid border-white text-black px-4 py-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{ backgroundColor: '#00FFFF' }}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-black mx-auto"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                />
              </svg>
            ) : (
              'Subscribe'
            )}
          </button>
        </div>

        <div className='text-xs mt-2'>We care about your data in our <span className='underline cursor-pointer'>privacy policy</span> </div>
      </form>

      {showMessage && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-green-600 font-bold text-xl p-6 rounded-lg shadow-lg z-50">
          ✅ Thanks for subscribing!
        </div>
      )}
    </div>
  )
}

export default Followers

