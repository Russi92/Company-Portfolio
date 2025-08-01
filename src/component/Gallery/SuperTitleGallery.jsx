



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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">

      <div className="flex flex-col lg:flex-row-reverse items-center gap-10">

        {/* النص والزرار */}
        <div className="w-full lg:w-1/2">
          <div
            className="shadow-lg relative h-[40px] max-w-md mx-auto mb-6"
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
            <div className="text-4xl md:text-6xl font-bold absolute inset-0 bottom-16 flex justify-center items-center text-white m-auto">
              Super Title
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


