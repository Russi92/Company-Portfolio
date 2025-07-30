

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';

// const SuperNovaCard = () => {
//   const [services, setServices] = useState([]);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const res = await axios.get('https://theway4business.27lashabab.com/api/posts');
//         setServices(res.data);
//       } catch (error) {
//         console.error('Error fetching services:', error);
//       }
//     };

//     fetchServices();
//   }, []);

//   return (
//     <div className="container mx-auto py-10 px-4">
//       <h2 className="text-center text-4xl md:text-5xl font-extrabold text-white-300 drop-shadow-lg mb-6 tracking-wide">SuperNova Cards</h2>

//       {services.length > 0 ? (
//         <Swiper
//           modules={[Navigation]}
//           navigation
//           spaceBetween={20}
//           loop
//           breakpoints={{
//             320: { slidesPerView: 1 },
//             640: { slidesPerView: 1 },
//             768: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//             1280: { slidesPerView: 4 },
//           }}
//         >
//           {services.map((service) => (
//             <SwiperSlide key={service.id}>
//               <div className="rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300" style={{
//                     background: `linear-gradient(
//                     to right,
//                     #007171 19%,
//                     #00B2B1 46%,
//                     #00CCCB 62%,
//                     #00B4DF 85%,
//                     #009FF3 100%
//                     )`,
//                 }}>
//                 <img
//                   src={service.main_image_url}
//                   alt={service.title}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="text-xl font-semibold mb-2 text-white text-center">{service.title}</h3>
//                   <p className="text-white text-sm line-clamp-3">{service.short_description}</p>
//                   <p className="text-white text-sm line-clamp-3">{service.full_description}</p>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       ) : (
//         <p className="text-center text-white">Loading  ...</p>
//       )}
//     </div>
//   );
// };

// export default SuperNovaCard;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SuperNovaCard = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('https://theway4business.27lashabab.com/api/posts');
        setServices(res.data.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-center text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-wide">SuperNova Cards</h2>

      {services.length > 0 ? (
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          loop
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {services.map((service) => {
            const images = [
              service.main_image_url,
              service.inner_main_image_url,
              // لو حبيت تستخرج الصور من full_description بعدين، ممكن تضيفها هنا.
            ];

            return (
              <SwiperSlide key={service.id}>
                <div className="rounded-lg border border-gray-300 overflow-hidden text-black">
                  {/* Slider داخل الكارت */}
                  <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    loop
                    className="w-full h-48"
                  >
                    {images.map((img, idx) => (
                      <SwiperSlide key={idx}>
                        <img
                          src={img}
                          alt={`img-${idx}`}
                          className="w-full h-48 object-cover"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <div className="p-4 space-y-2">
                    <h3 className="text-lg font-bold text-white text-center">{service.title}</h3>
                    <p className="text-sm text-white text-center">{service.short_description}</p>
                    <div className="text-sm text-white text-center">{service.full_description}</div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <p className="text-center text-white">Loading ...</p>
      )}
    </div>
  );
};

export default SuperNovaCard;


