

// import React, { useState } from 'react';
// import axios from 'axios';

// const CreateSuperNovaCard = () => {
//   const [title, setTitle] = useState('');
//   const [shortDesc, setShortDesc] = useState('');
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [successMsg, setSuccessMsg] = useState('');

//   const handleImagesChange = (e) => {
//     setImages(Array.from(e.target.files));
//   };
//   // console.log('Sending token:', localStorage.getItem('access_token'));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title || !shortDesc || images.length === 0) {
//       alert('Please fill all fields and select at least one image');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('short_description', shortDesc);

//     images.forEach((img, idx) => {
//       formData.append(`images[${idx}]`, img); // depending on API structure
//     });

//     try {
//       setLoading(true);
//       const res = await axios.post(
//         'https://theway4business.27lashabab.com/api/posts',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );

//       setSuccessMsg('Card created successfully!');
//       setTitle('');
//       setShortDesc('');
//       setImages([]);
//     } catch (error) {
//       console.error('Error creating post:', error);
//       alert('Something went wrong while creating the card.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md text-black">
//       <h2 className="text-2xl font-bold mb-4">Create SuperNova Card</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1 font-semibold">Title</label>
//           <input
//             type="text"
//             className="w-full border px-3 py-2 rounded"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-semibold">Short Description</label>
//           <textarea
//             className="w-full border px-3 py-2 rounded"
//             rows="3"
//             value={shortDesc}
//             onChange={(e) => setShortDesc(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-semibold">Upload Images</label>
//           <input
//             type="file"
//             multiple
//             onChange={handleImagesChange}
//             className="w-full"
//             accept="image/*"
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//           disabled={loading}
//         >
//           {loading ? 'Uploading...' : 'Create'}
//         </button>

//         {successMsg && <p className="text-green-600 mt-3">{successMsg}</p>}
//       </form>
//     </div>
//   );
// };

// export default CreateSuperNovaCard;




import React, { useState, useRef } from 'react';
import axios from 'axios';

const CreateSuperNovaCard = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [innerImage, setInnerImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const mainImageRef = useRef(null);
  const innerImageRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !shortDesc || !fullDesc || !mainImage || !innerImage) {
      alert('Please fill all fields and select 2 images');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('short_description', shortDesc);
    formData.append('full_description', fullDesc);
    formData.append('main_image', mainImage);
    formData.append('inner_main_image', innerImage);

    try {
      setLoading(true);
      const res = await axios.post(
        'https://theway4business.27lashabab.com/api/posts',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setSuccessMsg('Card created successfully!');
      setTitle('');
      setShortDesc('');
      setFullDesc('');
      setMainImage(null);
      setInnerImage(null);
      mainImageRef.current.value = '';
      innerImageRef.current.value = '';

      if (onPostCreated) {
        onPostCreated(res.data.post);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Something went wrong while creating the card.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md text-black">
      <h2 className="text-2xl font-bold mb-4">Create SuperNova Card</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Short Description</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            rows="2"
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Full Description</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            rows="3"
            value={fullDesc}
            onChange={(e) => setFullDesc(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Main Image</label>
          <input
            type="file"
            onChange={(e) => setMainImage(e.target.files[0])}
            accept="image/*"
            className="w-full"
            ref={mainImageRef}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Inner Main Image</label>
          <input
            type="file"
            onChange={(e) => setInnerImage(e.target.files[0])}
            accept="image/*"
            className="w-full"
            ref={innerImageRef}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Create'}
        </button>

        {successMsg && <p className="text-green-600 mt-3">{successMsg}</p>}
      </form>
    </div>
  );
};

export default CreateSuperNovaCard;




