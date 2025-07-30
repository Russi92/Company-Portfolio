

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const SuperNovaImg = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchSuperNovaImg = async () => {
      try {
        const res = await axios.get('https://theway4business.27lashabab.com/api/services');
        
        // تجميع كل الصور من جميع العناصر
        const allImages = res.data.flatMap(item => item.image_urls || []);
        
        setImages(allImages.reverse());
      } catch (error) {
        console.log('Error fetching images:', error);
      }
    };

    fetchSuperNovaImg();
  }, []);

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-center text-4xl md:text-5xl font-extrabold text-white-300 drop-shadow-lg mb-6 tracking-wide">SuperNova Images</h2>

      {images.length > 0 ? (
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={10}
          slidesPerView={3}
          loop
        >
          {images.map((url, index) => (
            <SwiperSlide key={index}>
              <img
                src={url}
                alt={`SuperNova ${index}`}
                className="w-full h-64 object-cover rounded-xl shadow-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-white"> Loading ...</p>
      )}
    </div>
  );
};

export default SuperNovaImg;




