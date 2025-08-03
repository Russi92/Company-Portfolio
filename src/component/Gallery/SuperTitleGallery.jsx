



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SuperTitle = () => {
  const [description, setDescription] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchSuperTitle = async () => {
      try {
        const res = await axios.get('https://theway4business.27lashabab.com/api/super-title');
        const data = res.data;
        setDescription(data.data.description);
        setMainImage(data.main_image_url);     // ✅ حفظ صورة الـ Main
        setImages(data.image_urls);            // ✅ صور الجاليري
      } catch (error) {
        console.error("Error fetching Super Title:", error);
      }
    };

    fetchSuperTitle();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-36 mb-10">

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 justify-center sm:justify-between">

        {/* النص والزرار */}
        <div className="w-full lg:w-1/2 ">
          <div
            className="relative h-[40px] max-w-md mx-auto mb-6"
     
          >
            {/* <div className="md:text-6xl font-bold absolute inset-0 bottom-16 flex justify-center items-center text-white m-auto w-fit">
              SUPER NOVA PACKS
            </div> */}
            <div className="text-lg sm:text-4xl md:text-4xl lg:text-4xl font-bold absolute inset-0 bottom-16 flex justify-center items-center text-white m-auto w-fit">
               SUPER NOVA PACKS
            </div>
          </div>

          <p className="text-white text-sm md:text-base mb-6">{description}</p>
        </div>

        {/* الصور */}
        <div className="w-full lg:w-1/2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* ✅ عرض Main Image أولاً */}
            {mainImage && (
              <img
                src={mainImage}
                alt="main-super-title"
                className="rounded-lg shadow-md object-cover w-full h-60"
              />
            )}

            {/* ✅ عرض صور الجاليري بعدها */}
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`super-img-${index}`}
                className="rounded-lg shadow-md object-cover w-full h-60"
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SuperTitle;


