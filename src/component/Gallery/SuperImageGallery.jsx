// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// const SuperNovaImg = () => {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     const fetchSuperNovaImg = async () => {
//       try {
//         const res = await axios.get('https://theway4business.27lashabab.com/api/services');
        
//         // تجميع كل الصور من جميع العناصر
//         const allImages = res.data.flatMap(item => item.image_urls || []);
        
//         setImages(allImages.reverse());
//       } catch (error) {
//         console.log('Error fetching images:', error);
//       }
//     };

//     fetchSuperNovaImg();
//   }, []);

//   return (
//     <div className="container mx-auto my-10">
//       {images.length > 0 ? (
//         <div className="flex flex-wrap justify-center gap-4">
//           {images.map((url, index) => (
//             <div key={index} className="w-full sm:w-1/2 md:w-1/3">
//               <img
//                 src={url}
//                 alt={`SuperNova ${index}`}
//                 className="w-full h-64 object-cover rounded-xl shadow-md"
//               />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-white">Loading ...</p>
//       )}
//     </div>
//   );
// };

// export default SuperNovaImg;

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SuperNovaImg = () => {
  const [images, setImages] = useState([]);

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

  useEffect(() => {
    fetchSuperNovaImg();
    // Polling every 30 seconds to check for new or updated images
    const interval = setInterval(fetchSuperNovaImg, 100);
    return () => clearInterval(interval); // تنظيف الـ interval لما الكومبوننت يتفكك
  }, []);

  return (
    <div className="container mx-auto my-10">
      {images.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4">
          {images.map((url, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3">
              <img
                src={url}
                alt={`SuperNova ${index}`}
                className="w-full h-64 object-cover rounded-xl shadow-md"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-white">Loading ...</p>
      )}
    </div>
  );
};

export default SuperNovaImg;