

// SuperNovaPeoples.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SuperNovaPeoples = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios
      .get('https://theway4business.27lashabab.com/api/testimonials')
      .then(res => {
        setTestimonials(res.data.data);
      })
      .catch(err => {
        console.error('Error fetching testimonials:', err);
      });
  }, []);

  return (
    <div className="w-full px-4 py-10">
      <h2 className="text-center text-4xl md:text-5xl font-extrabold text-white-300 drop-shadow-lg mb-6 tracking-wide">Testimonials</h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Navigation, Pagination]}
      >
        {testimonials.map(person => (
          <SwiperSlide key={person.id}>

        <div
        className=" pb-8 px-4 rounded-2xl shadow-md text-center pt-2"
        style={{
            background: `linear-gradient(
            to right,
            #007171 19%,
            #00B2B1 46%,
            #00CCCB 62%,
            #00B4DF 85%,
            #009FF3 100%
            )`,
        }}
        >


                <img
                src={person.image_url}
                alt={person.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg text-center m-auto"
                />


              <h3 className="text-xl font-semibold mb-2">{person.name}</h3>
              <p className="text-white text-sm">{person.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SuperNovaPeoples;
