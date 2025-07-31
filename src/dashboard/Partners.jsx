// import React, { useEffect, useState } from 'react';

// const Partners = () => {
//   const [partners, setPartners] = useState([]);

//   useEffect(() => {
//     fetch('https://theway4business.27lashabab.com/api/partners')
//       .then((res) => res.json())
//       .then((data) => {
//         if (data?.data) {
//           setPartners(data.data);
//         }
//       })
//       .catch((err) => {
//         console.error("فشل تحميل الشركاء:", err);
//       });
//   }, []);

//   return (
//     <div className="text-black p-6">
//       <h2 className="text-2xl font-bold text-center mb-6">Partners</h2>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//         {partners.map((partner) => (
//           <div key={partner.id} className="bg-gray-600 rounded shadow p-2 flex items-center justify-center">
//             <img 
//               src={partner.image_url} 
//               alt={`Partner ${partner.id}`} 
//               className="w-60 h-32 object-contain"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Partners;

// import React, { useEffect, useState } from 'react';

// const Partners = () => {
//   const [partners, setPartners] = useState([]);

//   useEffect(() => {
//     fetch('https://theway4business.27lashabab.com/api/partners')
//       .then((res) => res.json())
//       .then((data) => {
//         if (data?.data) {
//           setPartners(data.data);
//         }
//       })
//       .catch((err) => {
//         console.error("فشل تحميل الشركاء:", err);
//       });
//   }, []);

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("هل أنت متأكد أنك تريد حذف هذا الشريك؟");
//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(`https://theway4business.27lashabab.com/api/partners/delete/${id}`, {
//         method: 'DELETE',
//       });

//       if (res.ok) {
//         // حذف من الواجهة
//         setPartners(prev => prev.filter(partner => partner.id !== id));
//         alert("تم الحذف بنجاح ✅");
//       } else {
//         alert("فشل الحذف ❌");
//       }
//     } catch (err) {
//       console.error("خطأ أثناء الحذف:", err);
//       alert("حدث خطأ أثناء الحذف ❌");
//     }
//   };

//   return (
//     <div className="text-black p-6">
//       <h2 className="text-2xl font-bold text-center mb-6">Partners</h2>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//         {partners.map((partner) => (
//           <div key={partner.id} className="bg-gray-600 rounded shadow p-2 flex flex-col items-center justify-center">
//             <img 
//               src={partner.image_url} 
//               alt={`Partner ${partner.id}`} 
//               className="w-60 h-32 object-contain mb-2"
//             />
//             <button 
//               onClick={() => handleDelete(partner.id)} 
//               className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition"
//             >
//               حذف
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Partners;


// import React, { useEffect, useState } from 'react';

// const Partners = () => {
//   const [partners, setPartners] = useState([]);

//   useEffect(() => {
//     fetch('https://theway4business.27lashabab.com/api/partners')
//       .then((res) => res.json())
//       .then((data) => {
//         if (data?.data) {
//           setPartners(data.data);
//         }
//       })
//       .catch((err) => {
//         console.error("فشل تحميل الشركاء:", err);
//       });
//   }, []);

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("هل أنت متأكد أنك تريد حذف هذا الشريك؟");
//     if (!confirmDelete) return;

//     try {
//       const token = localStorage.getItem('access_token'); // ✅ جلب التوكن من localStorage

//       const res = await fetch(`https://theway4business.27lashabab.com/api/partners/delete/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`, // ✅ إرسال التوكن في الهيدر
//           'Content-Type': 'application/json',
//         },
//       });

//       if (res.ok) {
//         // حذف من الواجهة
//         setPartners(prev => prev.filter(partner => partner.id !== id));
//         alert("تم الحذف بنجاح ✅");
//       } else {
//         alert("فشل الحذف ❌");
//       }
//     } catch (err) {
//       console.error("خطأ أثناء الحذف:", err);
//       alert("حدث خطأ أثناء الحذف ❌");
//     }
//   };

//   return (
//     <div className="text-black p-6">
//       <h2 className="text-2xl font-bold text-center mb-6">Partners</h2>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//         {partners.map((partner) => (
//           <div key={partner.id} className="bg-gray-600 rounded shadow p-2 flex flex-col items-center justify-center">
//             <img 
//               src={partner.image_url} 
//               alt={`Partner ${partner.id}`} 
//               className="w-60 h-32 object-contain mb-2"
//             />
//             <button 
//               onClick={() => handleDelete(partner.id)} 
//               className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition"
//             >
//               حذف
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Partners;

import React, { useEffect, useState } from 'react';

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [editingPartner, setEditingPartner] = useState(null); // الشريك الجاري تعديله
  const [newImage, setNewImage] = useState(null); // الصورة الجديدة

  useEffect(() => {
    fetch('https://theway4business.27lashabab.com/api/partners')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setPartners(data.data);
        }
      })
      .catch((err) => {
        console.error("فشل تحميل الشركاء:", err);
      });
  }, []);

  const handleEditClick = (partner) => {
    setEditingPartner(partner);
    setNewImage(null);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    console.log("token", token);

  
    if (!newImage || !editingPartner) {
      alert("❌ لم يتم اختيار صورة");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("image", newImage);
  
      const res = await fetch(`https://theway4business.27lashabab.com/api/partners/update/${editingPartner.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: formData,
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert("✅ تم التعديل بنجاح");
        setPartners((prev) =>
          prev.map((p) => (p.id === editingPartner.id ? { ...p, image_url: data.image_url } : p))
        );
        setEditingPartner(null);
      } else {
        console.error("فشل التعديل:", data);
        alert("❌ فشل التعديل");
      }
    } catch (err) {
      console.error("خطأ أثناء التعديل:", err);
      alert("❌ حصل خطأ في الاتصال");
    }
  };
  
  
  

  return (
    <div className="text-black p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Partners</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {partners.map((partner) => (
          <div key={partner.id} className="bg-gray-600 rounded shadow p-2 flex flex-col items-center justify-center">
            <img
              src={partner.image_url}
              alt={`Partner ${partner.id}`}
              className="w-60 h-32 object-contain mb-2"
            />
            <div className="flex gap-2">
            <button 
                onClick={() => handleEditClick(partner)} 
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition mt-2"
              >
                 Edit
          </button>

          
              {/* زر الحذف اتركه كما هو لو عايز */}
            </div>
          </div>
        ))}
      </div>

      {/* مودال التعديل */}
      {editingPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-96">
            <h3 className="text-xl font-bold mb-4 text-center">Edit Partner Logo </h3>
            <img 
              src={newImage ? URL.createObjectURL(newImage) : editingPartner.image_url} 
              alt="Current" 
              className="w-full h-32 object-contain mb-4 bg-gray-600" 
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewImage(e.target.files[0])}
              className="mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingPartner(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Partners;


