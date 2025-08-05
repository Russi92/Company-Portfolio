

import React from 'react'
import SuperTitle from './SuperTitleGallery'
import SuperImageGallery from '../Gallery/SuperImageGallery'

const Gallery = () => {
  return (
    <div className='container mx-auto p-6 min-h-screen'>

      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl 
                px-4 py-12 sm:px-8 md:p-16
                flex items-center justify-center 
                shadow-2xl shadow-cyan-400/50 
                my-10 mx-auto max-w-6xl mt-24">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold italic text-center"
              style={{
                textShadow: '0 0 5px rgba(255, 255, 255, 0.7), 0 0 10px rgba(255, 255, 255, 0.5)'
              }}>
            Galleries
          </h1>
      </div>

        <SuperTitle />
        <SuperImageGallery />
    </div>
  )
}

export default Gallery