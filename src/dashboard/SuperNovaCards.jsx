


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
//   const [selectedCard, setSelectedCard] = useState(null);
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
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       console.log('✅ Card updated:', response.data);
//       setSelectedCard(null);
//       setEditId(null);
//       fetchPosts();
//     } catch (error) {
//       console.error('❌ Error updating card:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('هل أنت متأكد أنك تريد حذف هذا الكارت؟')) return;

//     try {
//       await axios.delete(`https://theway4business.27lashabab.com/api/posts/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       fetchPosts();
//     } catch (error) {
//       console.error('❌ Error deleting card:', error);
//       alert('فشل حذف الكارت.');
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto text-white bg-gray-700">
//       {/* Create Card */}
//       <div className="bg-white rounded-xl shadow-md p-6 mb-10">
//         <h2 className="text-2xl font-bold mb-4 text-black">Create SuperNova Card</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input type="text" placeholder="Title" className="w-full border px-3 py-2 rounded text-black" value={title} onChange={(e) => setTitle(e.target.value)} required />
//           <textarea placeholder="Short Description" className="w-full border px-3 py-2 rounded text-black" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} required />
//           <textarea placeholder="Full Description" className="w-full border px-3 py-2 rounded text-black" value={fullDesc} onChange={(e) => setFullDesc(e.target.value)} required />
//           <input type="file" className='text-black' accept="image/*" onChange={(e) => setMainImage(e.target.files[0])} ref={mainImageRef} required />
//           <input type="file" className='text-black' accept="image/*" onChange={(e) => setInnerImage(e.target.files[0])} ref={innerImageRef} required />
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
//             <div className="flex gap-2">
//               <button
//                 className="text-blue-600 hover:underline"
//                 onClick={() => {
//                   setEditId(card.id);
//                   setEditTitle(card.title);
//                   setEditShortDesc(card.short_description);
//                   setEditFullDesc(card.full_description || '');
//                   setEditMainImage(null);
//                   setEditInnerImage(null);
//                 }}
//               ><i className="fas fa-pen"></i></button>
//               <button
//                 className="text-red-600 hover:underline"
//                 onClick={() => handleDelete(card.id)}
//               ><i className="fas fa-trash"></i></button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Edit Form */}
//       {editId && (
//         <div className="bg-white rounded-xl shadow-md p-6 mt-10">
//           <h2 className="text-xl font-bold mb-4 text-black">Edit Card #{editId}</h2>
//           <form onSubmit={handleEditSubmit} className="space-y-4">
//             <input type="text" className="w-full border px-3 py-2 rounded text-black" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} required />
//             <textarea className="w-full border px-3 py-2 rounded text-black" rows="2" value={editShortDesc} onChange={(e) => setEditShortDesc(e.target.value)} required />
//             <textarea className="w-full border px-3 py-2 rounded text-black" rows="3" value={editFullDesc} onChange={(e) => setEditFullDesc(e.target.value)} />
//             <input type="file" accept="image/*" onChange={(e) => setEditMainImage(e.target.files[0])}/>
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

// مكون Modal مخصص
const CustomModal = ({ message, onConfirm, onCancel, showConfirmButton }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
        <p className="text-center text-lg font-semibold mb-4">{message}</p>
        <div className="flex justify-center gap-4 mt-4">
          {showConfirmButton && (
            <button
              onClick={onConfirm}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          )}
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors"
          >
            {showConfirmButton ? 'Cancel' : 'إغلاق'}
          </button>
        </div>
      </div>
    </div>
  );
};

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

  // حالات الـ Modal
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(null); // 'alert', 'confirm'
  const [modalAction, setModalAction] = useState(() => () => {}); // دالة للتأكيد

  // دالة لعرض الـ Modal
  const displayModal = (message, type, action = () => {}) => {
    setModalMessage(message);
    setModalType(type);
    setModalAction(() => action);
    setShowModal(true);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !shortDesc || !fullDesc || !mainImage || !innerImage) {
      displayModal('من فضلك املأ كل الحقول واختر صورتين.', 'alert');
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

      setSuccessMsg('تم إنشاء الكارت بنجاح!');
      setTitle('');
      setShortDesc('');
      setFullDesc('');
      setMainImage(null);
      setInnerImage(null);
      mainImageRef.current.value = '';
      innerImageRef.current.value = '';

      // الحل: بعد إنشاء الكارت بنجاح، نقوم بإعادة جلب البيانات
      fetchPosts();

      if (onPostCreated) {
        onPostCreated(res.data.post);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      displayModal('حدث خطأ ما أثناء إنشاء الكارت.', 'alert');
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
      // استخدام الـ Modal لعرض رسالة الخطأ
      displayModal('فشل في تحميل الكروت.', 'alert');
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
      fetchPosts(); // إعادة جلب البيانات بعد التعديل
    } catch (error) {
      console.error('❌ Error updating card:', error);
      displayModal('حدث خطأ أثناء تحديث الكارت.', 'alert');
    }
  };

  const handleDelete = (id) => {
    // استبدال window.confirm بـ CustomModal
    displayModal(
      'Are You Sure Delete This Card ?',
      'confirm',
      async () => {
        try {
          await axios.delete(`https://theway4business.27lashabab.com/api/posts/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          fetchPosts(); // إعادة جلب البيانات بعد الحذف
        } catch (error) {
          console.error('❌ Error deleting card:', error);
          displayModal('فشل حذف الكارت.', 'alert');
        } finally {
          setShowModal(false); // إغلاق الـ Modal
        }
      }
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-white bg-gray-700">
      {/* Create Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-2xl font-bold mb-4 text-black">Create SuperNova Card</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Title" className="w-full border px-3 py-2 rounded text-black" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <textarea placeholder="Short Description" className="w-full border px-3 py-2 rounded text-black" value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} required />
          <textarea placeholder="Full Description" className="w-full border px-3 py-2 rounded text-black" value={fullDesc} onChange={(e) => setFullDesc(e.target.value)} required />
          <input type="file" className='text-black' accept="image/*" onChange={(e) => setMainImage(e.target.files[0])} ref={mainImageRef} required />
          <input type="file" className='text-black' accept="image/*" onChange={(e) => setInnerImage(e.target.files[0])} ref={innerImageRef} required />
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
            <h3 className="text-lg font-semibold mt-2 text-black">{card.title}</h3>
            <p className="text-sm mb-2 text-black">{card.short_description}</p>
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
          <h2 className="text-xl font-bold mb-4 text-black">Edit Card #{editId}</h2>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <input type="text" className="w-full border px-3 py-2 rounded text-black" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} required />
            <textarea className="w-full border px-3 py-2 rounded text-black" rows="2" value={editShortDesc} onChange={(e) => setEditShortDesc(e.target.value)} required />
            <textarea className="w-full border px-3 py-2 rounded text-black" rows="3" value={editFullDesc} onChange={(e) => setEditFullDesc(e.target.value)} />
            <input type="file" accept="image/*" onChange={(e) => setEditMainImage(e.target.files[0])}/>
            <input type="file" accept="image/*" onChange={(e) => setEditInnerImage(e.target.files[0])} />
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">Update</button>
          </form>
        </div>
      )}

      {/* عرض الـ Modal */}
      {showModal && (
        <CustomModal
          message={modalMessage}
          onConfirm={modalAction}
          onCancel={() => setShowModal(false)}
          showConfirmButton={modalType === 'confirm'}
        />
      )}
    </div>
  );
};

export default CreateSuperNovaCard;



















