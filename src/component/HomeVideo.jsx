



import React, { useEffect, useState } from 'react'
import axios from 'axios'

const HomeVideo = () => {
  const [videoUrl, setVideoUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHeroSection = async () => {
      try {
        const response = await axios.get('/api/hero-section/1')
        setVideoUrl(response.data.media_url)
      } catch (err) {
        setError('Video Not Available')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchHeroSection()
  }, [])

  if (loading) return <p className='text-center'>Loading ...</p>
  if (error) return <p>{error}</p>

  return (
    <div className='mt-28 mb-10'>
      {/* <h1 className='text-center text-3xl mb-5'>Hero Video</h1> */}
      <h1 className="text-center text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-6 tracking-wide">
  Hero Video
</h1>


      {videoUrl && (
  <div className="max-w-5xl mx-auto my-10 px-4">
    <video
      className="w-full rounded-2xl shadow-lg border border-gray-200"
      src={videoUrl}
      controls
      autoPlay
      loop
      muted
    />
  </div>
)}

    </div>
  )
}

export default HomeVideo;
