

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




// import React, { useState, useRef } from 'react';
// import axios from 'axios';

// const CreateSuperNovaCard = ({ onPostCreated }) => {
//   const [title, setTitle] = useState('');
//   const [shortDesc, setShortDesc] = useState('');
//   const [fullDesc, setFullDesc] = useState('');
//   const [mainImage, setMainImage] = useState(null);
//   const [innerImage, setInnerImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [successMsg, setSuccessMsg] = useState('');

//   const mainImageRef = useRef(null);
//   const innerImageRef = useRef(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !shortDesc || !fullDesc || !mainImage || !innerImage) {
//       alert('Please fill all fields and select 2 images');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('short_description', shortDesc);
//     formData.append('full_description', fullDesc);
//     formData.append('main_image', mainImage);
//     formData.append('inner_main_image', innerImage);

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
//       setFullDesc('');
//       setMainImage(null);
//       setInnerImage(null);
//       mainImageRef.current.value = '';
//       innerImageRef.current.value = '';

//       if (onPostCreated) {
//         onPostCreated(res.data.post);
//       }
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
//             rows="2"
//             value={shortDesc}
//             onChange={(e) => setShortDesc(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-semibold">Full Description</label>
//           <textarea
//             className="w-full border px-3 py-2 rounded"
//             rows="3"
//             value={fullDesc}
//             onChange={(e) => setFullDesc(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-semibold">Main Image</label>
//           <input
//             type="file"
//             onChange={(e) => setMainImage(e.target.files[0])}
//             accept="image/*"
//             className="w-full"
//             ref={mainImageRef}
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-semibold">Inner Main Image</label>
//           <input
//             type="file"
//             onChange={(e) => setInnerImage(e.target.files[0])}
//             accept="image/*"
//             className="w-full"
//             ref={innerImageRef}
//             required
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





  // import React, { useState, useRef, useEffect } from 'react';
  // import axios from 'axios';

  // const CreateSuperNovaCard = ({ onPostCreated }) => {
  //   const [title, setTitle] = useState('');
  //   const [shortDesc, setShortDesc] = useState('');
  //   const [fullDesc, setFullDesc] = useState('');
  //   const [mainImage, setMainImage] = useState(null);
  //   const [innerImage, setInnerImage] = useState(null);
  //   const [loading, setLoading] = useState(false);
  //   const [successMsg, setSuccessMsg] = useState('');
  //   const[ selectedCard , setSelectedCard] = useState(null);
  //   const mainImageRef = useRef(null);
  //   const innerImageRef = useRef(null);

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     if (!title || !shortDesc || !fullDesc || !mainImage || !innerImage) {
  //       alert('Please fill all fields and select 2 images');
  //       return;
  //     }

  //     const formData = new FormData();
  //     formData.append('title', title);
  //     formData.append('short_description', shortDesc);
  //     formData.append('full_description', fullDesc);
  //     formData.append('main_image', mainImage);
  //     formData.append('inner_main_image', innerImage);

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
  //       setFullDesc('');
  //       setMainImage(null);
  //       setInnerImage(null);
  //       mainImageRef.current.value = '';
  //       innerImageRef.current.value = '';

  //       if (onPostCreated) {
  //         onPostCreated(res.data.post);
  //       }
  //     } catch (error) {
  //       console.error('Error creating post:', error);
  //       alert('Something went wrong while creating the card.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   // ------------------- EDIT SECTION -------------------
  //   const [cards, setCards] = useState([]);
  //   const [editId, setEditId] = useState(null);
  //   const [editTitle, setEditTitle] = useState('');
  //   const [editShortDesc, setEditShortDesc] = useState('');
  //   const [editFullDesc, setEditFullDesc] = useState('');
  //   const [editMainImage, setEditMainImage] = useState(null);
  //   const [editInnerImage, setEditInnerImage] = useState(null);

  //   const fetchPosts = async () => {
  //     try {
  //       const res = await axios.get('https://theway4business.27lashabab.com/api/posts');
  //       setCards(res.data.data);
  //     } catch (err) {
  //       console.error('Error loading cards:', err);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchPosts();
  //   }, []);

  //   const handleEditSubmit = async (e) => {
  //     e.preventDefault();
    
  //     const formData = new FormData();
  //     formData.append('title', editTitle);
  //     formData.append('short_description', editShortDesc);
  //     formData.append('full_description', editFullDesc);
    
  //     if (editMainImage) {
  //       formData.append('main_image', editMainImage);
  //     }
    
  //     if (editInnerImage) {
  //       formData.append('inner_main_image', editInnerImage);
  //     }
    
  //     try {
  //       const response = await axios.post(
  //         `https://theway4business.27lashabab.com/api/posts/${editId}`,
  //         formData,
  //         {
  //           headers: {
  //                          'Content-Type': 'multipart/form-data',
  //                          Authorization: `Bearer ${localStorage.getItem('token')}`,
  //                       },
  //         }
  //       );
  //       console.log("✅ Card updated:", response.data);
  //       setSelectedCard(null);
  //       fetchPosts(); // إعادة تحميل الكروت بعد التعديل
  //     } catch (error) {
  //       console.error("❌ Error updating card:", error);
  //     }
  //   };
    

  //   return (
  //     <div className="p-6 max-w-4xl mx-auto text-black">
  //       {/* Create Card */}
  //       <div className="bg-white rounded-xl shadow-md p-6 mb-10">
  //         <h2 className="text-2xl font-bold mb-4">Create SuperNova Card</h2>
  //         <form onSubmit={handleSubmit} className="space-y-4">
  //           <input type="text" placeholder="Title" className="w-full border px-3 py-2 rounded" value={title} onChange={(e) => setTitle(e.target.value)} required />
  //           <textarea placeholder="Short Description" className="w-full border px-3 py-2 rounded" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} required />
  //           <textarea placeholder="Full Description" className="w-full border px-3 py-2 rounded" value={fullDesc} onChange={(e) => setFullDesc(e.target.value)} required />
  //           <input type="file" accept="image/*" onChange={(e) => setMainImage(e.target.files[0])} ref={mainImageRef} required />
  //           <input type="file" accept="image/*" onChange={(e) => setInnerImage(e.target.files[0])} ref={innerImageRef} required />
  //           <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition" disabled={loading}>
  //             {loading ? 'Uploading...' : 'Create'}
  //           </button>
  //           {successMsg && <p className="text-green-600 mt-3">{successMsg}</p>}
  //         </form>
  //       </div>

  //       {/* Cards Display */}
  //       <h2 className="text-xl font-bold mb-4 text-white">Edit Existing Cards</h2>
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //         {cards.map(card => (
  //           <div key={card.id} className="bg-white p-4 rounded shadow">
  //             <img src={card.main_image_url} alt="Main" className="w-full h-40 object-cover rounded" />
  //             <img src={card.inner_main_image_url} alt="Inner" className="w-full h-40 object-cover rounded mt-2" />
  //             <h3 className="text-lg font-semibold mt-2">{card.title}</h3>
  //             <p className="text-sm mb-2">{card.short_description}</p>
  //             <button
  //               className="bg-yellow-500 text-white px-4 py-1 rounded"
  //               onClick={() => {
  //                 setEditId(card.id);
  //                 setEditTitle(card.title);
  //                 setEditShortDesc(card.short_description);
  //                 setEditFullDesc(card.full_description || '');
  //                 setEditMainImage(null);
  //                 setEditInnerImage(null);
  //               }}
  //             >Edit</button>
  //           </div>
  //         ))}
  //       </div>

  //       {/* Edit Form */}
  //       {editId && (
  //         <div className="bg-white rounded-xl shadow-md p-6 mt-10">
  //           <h2 className="text-xl font-bold mb-4">Edit Card #{editId}</h2>
  //           <form onSubmit={handleEditSubmit} className="space-y-4">
  //             <input type="text" className="w-full border px-3 py-2 rounded" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} required />
  //             <textarea className="w-full border px-3 py-2 rounded" rows="2" value={editShortDesc} onChange={(e) => setEditShortDesc(e.target.value)} required />
  //             <textarea className="w-full border px-3 py-2 rounded" rows="3" value={editFullDesc} onChange={(e) => setEditFullDesc(e.target.value)} />
  //             <input type="file" accept="image/*" onChange={(e) => setEditMainImage(e.target.files[0])} />
  //             <input type="file" accept="image/*" onChange={(e) => setEditInnerImage(e.target.files[0])} />
  //             <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">Update</button>
  //           </form>
  //         </div>
  //       )}
  //     </div>
  //   );
  // };

  // export default CreateSuperNovaCard;


  import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const CreateSuperNovaCard = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [innerImage, setInnerImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
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

  // ------------------- EDIT SECTION -------------------
  const [cards, setCards] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editShortDesc, setEditShortDesc] = useState('');
  const [editFullDesc, setEditFullDesc] = useState('');
  const [editMainImage, setEditMainImage] = useState(null);
  const [editInnerImage, setEditInnerImage] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('https://theway4business.27lashabab.com/api/posts');
      setCards(res.data.data);
    } catch (err) {
      console.error('Error loading cards:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', editTitle);
    formData.append('short_description', editShortDesc);
    formData.append('full_description', editFullDesc);

    if (editMainImage) {
      formData.append('main_image', editMainImage);
    }

    if (editInnerImage) {
      formData.append('inner_main_image', editInnerImage);
    }

    try {
      const response = await axios.post(
        `https://theway4business.27lashabab.com/api/posts/${editId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('✅ Card updated:', response.data);
      setSelectedCard(null);
      setEditId(null);
      fetchPosts();
    } catch (error) {
      console.error('❌ Error updating card:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد أنك تريد حذف هذا الكارت؟')) return;

    try {
      await axios.delete(`https://theway4business.27lashabab.com/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchPosts();
    } catch (error) {
      console.error('❌ Error deleting card:', error);
      alert('فشل حذف الكارت.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-black">
      {/* Create Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-2xl font-bold mb-4">Create SuperNova Card</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Title" className="w-full border px-3 py-2 rounded" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <textarea placeholder="Short Description" className="w-full border px-3 py-2 rounded" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} required />
          <textarea placeholder="Full Description" className="w-full border px-3 py-2 rounded" value={fullDesc} onChange={(e) => setFullDesc(e.target.value)} required />
          <input type="file" accept="image/*" onChange={(e) => setMainImage(e.target.files[0])} ref={mainImageRef} required />
          <input type="file" accept="image/*" onChange={(e) => setInnerImage(e.target.files[0])} ref={innerImageRef} required />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition" disabled={loading}>
            {loading ? 'Uploading...' : 'Create'}
          </button>
          {successMsg && <p className="text-green-600 mt-3">{successMsg}</p>}
        </form>
      </div>

      {/* Cards Display */}
      <h2 className="text-xl font-bold mb-4 text-white">Edit Existing Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map(card => (
          <div key={card.id} className="bg-white p-4 rounded shadow">
            <img src={card.main_image_url} alt="Main" className="w-full h-40 object-cover rounded" />
            <img src={card.inner_main_image_url} alt="Inner" className="w-full h-40 object-cover rounded mt-2" />
            <h3 className="text-lg font-semibold mt-2">{card.title}</h3>
            <p className="text-sm mb-2">{card.short_description}</p>
            <div className="flex gap-2">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => {
                  setEditId(card.id);
                  setEditTitle(card.title);
                  setEditShortDesc(card.short_description);
                  setEditFullDesc(card.full_description || '');
                  setEditMainImage(null);
                  setEditInnerImage(null);
                }}
              ><i className="fas fa-pen"></i></button>
              <button
                className="text-red-600 hover:underline"
                onClick={() => handleDelete(card.id)}
              ><i className="fas fa-trash"></i></button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Form */}
      {editId && (
        <div className="bg-white rounded-xl shadow-md p-6 mt-10">
          <h2 className="text-xl font-bold mb-4">Edit Card #{editId}</h2>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <input type="text" className="w-full border px-3 py-2 rounded" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} required />
            <textarea className="w-full border px-3 py-2 rounded" rows="2" value={editShortDesc} onChange={(e) => setEditShortDesc(e.target.value)} required />
            <textarea className="w-full border px-3 py-2 rounded" rows="3" value={editFullDesc} onChange={(e) => setEditFullDesc(e.target.value)} />
            <input type="file" accept="image/*" onChange={(e) => setEditMainImage(e.target.files[0])} />
            <input type="file" accept="image/*" onChange={(e) => setEditInnerImage(e.target.files[0])} />
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">Update</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateSuperNovaCard;



















