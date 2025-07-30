

// import React, { useEffect, useState } from 'react';

// const SuperTitle = () => {
//   const [description, setDescription] = useState('');
//   const [mainImagePreview, setMainImagePreview] = useState('');
//   const [galleryPreviews, setGalleryPreviews] = useState(['', '']);
//   const [mainImage, setMainImage] = useState(null);
//   const [galleryImages, setGalleryImages] = useState([null, null]);

//   const [original, setOriginal] = useState({
//     description: '',
//     mainImage: '',
//     gallery: ['', ''],
//   });

//   useEffect(() => {
//     const fetchSuperTitle = async () => {
//       try {
//         const res = await fetch('https://theway4business.27lashabab.com/api/super-title');
//         const data = await res.json();

//         setDescription(data.data.description);
//         setMainImagePreview(data.main_image_url);
//         setGalleryPreviews(data.image_urls.slice(0, 2));

//         setOriginal({
//           description: data.data.description,
//           mainImage: data.main_image_url,
//           gallery: data.image_urls.slice(0, 2),
//         });
//       } catch (error) {
//         console.error('❌ Error fetching SuperTitle:', error);
//       }
//     };

//     fetchSuperTitle();
//   }, []);

//   const handleGalleryChange = (index, file) => {
//     const newImages = [...galleryImages];
//     newImages[index] = file;
//     setGalleryImages(newImages);

//     const newPreviews = [...galleryPreviews];
//     newPreviews[index] = URL.createObjectURL(file);
//     setGalleryPreviews(newPreviews);
//   };

//   const handleReset = () => {
//     setDescription(original.description);
//     setMainImagePreview(original.mainImage);
//     setGalleryPreviews(original.gallery);
//     setMainImage(null);
//     setGalleryImages([null, null]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('description', description);

//     if (mainImage) formData.append('main_image', mainImage);
//     galleryImages.forEach((img) => {
//       if (img) formData.append('images[]', img);
//     });

//     try {
//       const token = localStorage.getItem('token');

//       const res = await fetch('https://theway4business.27lashabab.com/api/super-title/update', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Accept': 'application/json',
//         },
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         console.error("❌ Error Response:", data);
//         throw new Error(data.message || 'Failed to update SuperTitle');
//       }

//       alert('✅ SuperTitle updated successfully!');
//     } catch (err) {
//       console.error('❌ Catch Error:', err);
//       alert(`❌ Error: ${err.message}`);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow max-w-3xl mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-4 text-center text-black">Edit Super Title</h2>

//       <label className="block mb-2 text-black font-semibold">Description</label>
//       <textarea
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         className="w-full border p-2 mb-4 text-black"
//         rows={5}
//         required
//       />

//       <label className="block mb-2 text-black font-semibold">Main Image</label>
//       {mainImagePreview && (
//         <img src={mainImagePreview} alt="Main Preview" className="h-32 w-auto rounded shadow mb-2" />
//       )}
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => {
//           setMainImage(e.target.files[0]);
//           setMainImagePreview(URL.createObjectURL(e.target.files[0]));
//         }}
//         className="mb-6"
//       />

//       <label className="block mb-2 text-black font-semibold">Gallery Images (2 صور فقط)</label>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//         {[0, 1].map((index) => (
//           <div key={index}>
//             {galleryPreviews[index] && (
//               <img
//                 src={galleryPreviews[index]}
//                 alt={`Gallery Preview ${index}`}
//                 className="h-28 w-full object-cover rounded shadow mb-1"
//               />
//             )}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => handleGalleryChange(index, e.target.files[0])}
//               className="text-sm"
//             />
//           </div>
//         ))}
//       </div>

//       <div className="flex gap-4">
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           Update
//         </button>
//         <button
//           type="button"
//           onClick={handleReset}
//           className="bg-gray-400 text-white px-4 py-2 rounded"
//         >
//           Reset to Original
//         </button>
//       </div>
//     </form>
//   );
// };

// export default SuperTitle;



import React, { useEffect, useState } from 'react';

const SuperTitle = () => {
  const [description, setDescription] = useState('');
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [galleryPreviews, setGalleryPreviews] = useState(['', '']);
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([null, null]);

  const [original, setOriginal] = useState({
    description: '',
    mainImage: '',
    gallery: ['', ''],
  });

  useEffect(() => {
    const fetchSuperTitle = async () => {
      try {
        const res = await fetch('https://theway4business.27lashabab.com/api/super-title');
        const data = await res.json();

        const images = data.image_urls.slice(0, 2); // تأكد إنها صورتين بس

        setDescription(data.data.description);
        setMainImagePreview(data.main_image_url);
        setGalleryPreviews(images);

        setOriginal({
          description: data.data.description,
          mainImage: data.main_image_url,
          gallery: images,
        });
      } catch (error) {
        console.error('❌ Error fetching SuperTitle:', error);
      }
    };

    fetchSuperTitle();
  }, []);

  const handleGalleryChange = (index, file) => {
    const newImages = [...galleryImages];
    newImages[index] = file;
    setGalleryImages(newImages);

    const newPreviews = [...galleryPreviews];
    newPreviews[index] = URL.createObjectURL(file);
    setGalleryPreviews(newPreviews);
  };

  const handleReset = () => {
    setDescription(original.description);
    setMainImagePreview(original.mainImage);
    setGalleryPreviews(original.gallery);
    setMainImage(null);
    setGalleryImages([null, null]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('description', description);

    if (mainImage) formData.append('main_image', mainImage);
    galleryImages.forEach((img) => {
      if (img) formData.append('images[]', img);
    });

    try {
      const token = localStorage.getItem('token');

      const res = await fetch('https://theway4business.27lashabab.com/api/super-title/update', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Error Response:", data);
        throw new Error(data.message || 'Failed to update SuperTitle');
      }

      alert('✅ SuperTitle updated successfully!');
    } catch (err) {
      console.error('❌ Catch Error:', err);
      alert(`❌ Error: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">Edit Super Title</h2>

      {/* Description */}
      <label className="block mb-2 text-black font-semibold">Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 mb-4 text-black resize-none"
        rows={5}
        required
      />

      {/* Main Image */}
      <label className="block mb-2 text-black font-semibold">Main Image</label>
      {mainImagePreview && (
        <img src={mainImagePreview} alt="Main Preview" className="h-32 w-auto rounded shadow mb-2" />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setMainImage(e.target.files[0]);
          setMainImagePreview(URL.createObjectURL(e.target.files[0]));
        }}
        className="mb-6"
      />

      {/* Gallery Images */}
      <label className="block mb-2 text-black font-semibold">Gallery Images</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {[0, 1].map((index) => (
          <div key={index}>
            {galleryPreviews[index] && (
              <img
                src={galleryPreviews[index]}
                alt={`Gallery Preview ${index}`}
                className="h-28 w-full object-cover rounded shadow mb-1"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleGalleryChange(index, e.target.files[0])}
              className="text-sm"
            />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Reset to Original
        </button>
      </div>
    </form>
  );
};

export default SuperTitle;

