


import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SuperNovaImg = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSuperNovaImg = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // إضافة معامل فريد (Timestamp) لمنع المتصفح من استخدام النسخة المخزنة مؤقتًا (Caching)
      const timestamp = new Date().getTime();
      const res = await axios.get(`https://theway4business.27lashabab.com/api/services?_t=${timestamp}`);

      // تجميع الصور الرئيسية فقط من جميع العناصر
      const mainImages = res.data.map(item => item.main_image_url).filter(Boolean);
      
      // عكس ترتيب الصور بحيث تظهر الأحدث أولاً
      setImages(mainImages.reverse());
      
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('حدث خطأ أثناء جلب الصور.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // جلب الصور مرة واحدة فقط عند تحميل المكون
    fetchSuperNovaImg();
  }, []);

  return (
    <div className="container mx-auto my-10 px-4">
    
      {isLoading ? (
        <p className="text-center text-white text-lg">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((url, index) => (
            <div key={index} className="w-full">
              <img
                src={url}
                alt={`SuperNova ${index}`}
                className="w-full h-64 object-cover rounded-xl shadow-md"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-white text-lg">لا توجد صور للعرض حالياً.</p>
      )}
    </div>
  );
};

export default SuperNovaImg;