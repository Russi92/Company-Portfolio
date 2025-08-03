// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // لاستخدام axios لعمل طلبات الـ HTTP

// const DashboardGallery = () => {
//   // حالة لتخزين قائمة الخدمات/الصور التي سيتم جلبها من الـ API
//   const [services, setServices] = useState([]);
//   // حالة لتخزين رسائل الحالة (نجاح، خطأ، تحميل) لعرضها للمستخدم
//   const [status, setStatus] = useState('');
//   // توكن المصادقة، يتم جلبه من localStorage
//   const token = localStorage.getItem('token');

//   // دالة لجلب الخدمات/الصور من الـ API
//   const fetchServices = async () => {
//     setStatus('جاري جلب الصور...'); // رسالة أثناء التحميل
//     try {
//       const res = await axios.get('https://theway4business.27lashabab.com/api/services', {
//         headers: {
//           // إرسال توكن المصادقة في الـ headers
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       // تحديث حالة الخدمات بالبيانات التي تم جلبها
//       setServices(res.data);
//       setStatus('تم جلب الصور بنجاح.'); // رسالة نجاح
//     } catch (error) {
//       console.error('Error fetching services:', error);
//       // في حالة وجود خطأ، نعرض رسالة خطأ للمستخدم
//       setStatus('حدث خطأ أثناء جلب الصور ❌. تأكد من أنك مسجل الدخول.');
//     }
//   };

//   // useEffect Hook لجلب الخدمات بمجرد تحميل المكون لأول مرة
//   useEffect(() => {
//     fetchServices();
//   }, []); // [] تعني أن هذا الـ effect سيتم تشغيله مرة واحدة فقط عند تحميل المكون

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6 text-black">معرض الصور</h2>

//       {/* عرض رسالة الحالة (تحميل، نجاح، خطأ) */}
//       {status && <p className="mb-4 text-gray-700">{status}</p>}

//       {/* إذا كان هناك خدمات (صور)، نعرضها في شبكة */}
//       {services.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {services.map((service) => (
//             <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
//               {/* عرض الصورة الرئيسية لكل خدمة */}
//               <img
//                 src={service.main_image_url}
//                 alt={service.title || 'صورة معرض'} // نستخدم العنوان إذا كان موجودًا أو نصًا افتراضيًا
//                 className="w-full h-48 object-cover"
//               />

//             </div>
//           ))}
//         </div>
//       ) : (
//         // في حالة عدم وجود صور بعد التحميل
//         !status.includes('جاري جلب الصور') && !status.includes('خطأ') && (
//           <p className="text-lg text-gray-600">لا توجد صور لعرضها حالياً.</p>
//         )
//       )}
//     </div>
//   );
// };

// export default DashboardGallery;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const DashboardGallery = () => {
//   const [services, setServices] = useState([]);
//   const [status, setStatus] = useState('');
//   const token = localStorage.getItem('token');

//   // دالة لجلب الخدمات/الصور من الـ API
//   const fetchServices = async () => {
//     setStatus('جاري جلب الصور...');
//     try {
//       const res = await axios.get('https://theway4business.27lashabab.com/api/services', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setServices(res.data);
//       setStatus('تم جلب الصور بنجاح.');
//     } catch (error) {
//       console.error('Error fetching services:', error);
//       setStatus('حدث خطأ أثناء جلب الصور ❌. تأكد من أنك مسجل الدخول.');
//     }
//   };

//   // دالة لحذف صورة معينة بناءً على الـ ID
//   const handleDelete = async (id) => {
//     // تأكيد من المستخدم قبل الحذف لتجنب الحذف العرضي
//     if (!window.confirm('هل أنت متأكد من حذف هذه الصورة؟ لا يمكن التراجع عن هذا الإجراء!')) {
//       return; // إلغاء عملية الحذف إذا لم يؤكد المستخدم
//     }

//     setStatus('جاري حذف الصورة...');
//     try {
//       // إرسال طلب DELETE إلى الـ API مع الـ ID في الرابط
//       await axios.delete(`https://theway4business.27lashabab.com/api/services/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`, // إرسال توكن المصادقة
//         },
//       });
//       setStatus('تم حذف الصورة بنجاح ✅');
//       // بعد الحذف، نقوم بجلب قائمة الخدمات المحدثة لعرضها
//       fetchServices();
//     } catch (error) {
//       console.error('Delete error:', error);
//       // في حالة وجود خطأ أثناء الحذف، نعرض رسالة خطأ
//       setStatus('حدث خطأ أثناء حذف الصورة ❌. (قد يكون بسبب الصلاحيات أو مشكلة في الخادم)');
//     }
//   };

//   // useEffect Hook لجلب الخدمات بمجرد تحميل المكون لأول مرة
//   useEffect(() => {
//     fetchServices();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6 text-black">معرض الصور</h2>

//       {status && <p className="mb-4 text-gray-700">{status}</p>}

//       {services.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {services.map((service) => (
//             <div
//               key={service.id}
//               className="bg-white rounded-lg shadow-md overflow-hidden relative transform transition duration-300 hover:scale-105"
//             >
//               <img
//                 src={service.main_image_url}
//                 alt={service.title || 'صورة معرض'}
//                 className="w-full h-48 object-cover"
//               />

//               {/* زر الحذف */}
//               <div className="absolute top-2 right-2">
//                 <button
//                   onClick={() => handleDelete(service.id)}
//                   className="bg-red-600 text-white px-3 py-1 rounded-full text-sm hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
//                   title="حذف الصورة"
//                 >
//                   <i className="fas fa-trash"></i> {/* يتطلب Font Awesome */}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         !status.includes('جاري جلب الصور') && !status.includes('خطأ') && (
//           <p className="text-lg text-gray-600">There are no images currently</p>
//         )
//       )}
//     </div>
//   );
// };

// export default DashboardGallery;






import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardGallery = () => {
  // حالة لتخزين قائمة الخدمات/الصور التي سيتم جلبها من الـ API
  const [services, setServices] = useState([]);
  // حالة لتخزين رسائل الحالة (نجاح، خطأ، تحميل) لعرضها للمستخدم
  const [status, setStatus] = useState('');
  // توكن المصادقة، يتم جلبه من localStorage
  const token = localStorage.getItem('token');
  
  // حالات جديدة لوظيفة التعديل
  const [editingId, setEditingId] = useState(null); // لتحديد الصورة التي يتم تعديلها
  const [editImage, setEditImage] = useState(null); // لتخزين الصورة الجديدة للتعديل

  // دالة لجلب الخدمات/الصور من الـ API
  const fetchServices = async () => {
    setStatus('جاري جلب الصور...');
    try {
      const res = await axios.get('https://theway4business.27lashabab.com/api/services', {
        headers: {
          // إرسال توكن المصادقة في الـ headers
          Authorization: `Bearer ${token}`,
        },
      });
      // تحديث حالة الخدمات بالبيانات التي تم جلبها
      setServices(res.data);
      setStatus('تم جلب الصور بنجاح.');
    } catch (error) {
      console.error('Error fetching services:', error);
      // في حالة وجود خطأ، نعرض رسالة خطأ للمستخدم
      setStatus('حدث خطأ أثناء جلب الصور ❌. تأكد من أنك مسجل الدخول.');
    }
  };

  // دالة لحذف صورة معينة بناءً على الـ ID
  const handleDelete = async (id) => {
    // تأكيد من المستخدم قبل الحذف لتجنب الحذف العرضي
    // NOTE: Replace window.confirm with a custom modal for better UX
    if (!window.confirm('هل أنت متأكد من حذف هذه الصورة؟ لا يمكن التراجع عن هذا الإجراء!')) {
      return; // إلغاء عملية الحذف إذا لم يؤكد المستخدم
    }

    setStatus('جاري حذف الصورة...');
    try {
      // إرسال طلب DELETE إلى الـ API مع الـ ID في الرابط
      await axios.delete(`https://theway4business.27lashabab.com/api/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // إرسال توكن المصادقة
        },
      });
      setStatus('تم حذف الصورة بنجاح ✅');
      // بعد الحذف، نقوم بجلب قائمة الخدمات المحدثة لعرضها
      fetchServices();
    } catch (error) {
      console.error('Delete error:', error);
      // في حالة وجود خطأ أثناء الحذف، نعرض رسالة خطأ
      setStatus('حدث خطأ أثناء حذف الصورة ❌. (قد يكون بسبب الصلاحيات أو مشكلة في الخادم)');
    }
  };

  // دالة لبدء وضع التعديل لصورة معينة
  const startEditing = (id) => {
    setEditingId(id);
    setEditImage(null);
    setStatus('');
  };

  // دالة لإلغاء وضع التعديل
  const cancelEditing = () => {
    setEditingId(null);
    setEditImage(null);
    setStatus('');
  };

  // دالة لتنفيذ عملية التعديل
  const handleEdit = async (id) => {
    if (!editImage) {
      setStatus('يرجى اختيار صورة جديدة للتعديل.');
      return;
    }

    const formData = new FormData();
    formData.append('main_image', editImage);

    setStatus('جاري تعديل الصورة...');
    try {
      // إرسال طلب POST إلى الـ API لتعديل الصورة
      await axios.post(
        `https://theway4business.27lashabab.com/api/services/update/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatus('تم تعديل الصورة بنجاح ✅');
      setEditImage(null);
      setEditingId(null);
      fetchServices(); // تحديث القائمة بعد التعديل
    } catch (error) {
      console.error('Edit error:', error);
      setStatus('حدث خطأ أثناء التعديل ❌');
    }
  };

  // useEffect Hook لجلب الخدمات بمجرد تحميل المكون لأول مرة
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-black">Galleries</h2>

      {status && <p className="mb-4 text-gray-700"></p>}

      {services.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-md overflow-hidden relative transform transition duration-300 hover:scale-105"
            >
              <img
                src={service.main_image_url}
                alt={service.title || 'صورة معرض'}
                className="w-full h-48 object-cover"
              />

              <div className="absolute top-2 right-2 space-x-2">
                {editingId === service.id ? (
                  // عرض حقل الإدخال وأزرار الحفظ والإلغاء في وضع التعديل
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setEditImage(e.target.files[0])}
                      className="block text-sm w-full absolute top-12 right-2 p-2 rounded-lg bg-gray-100"
                    />
                    <button
                      onClick={() => handleEdit(service.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded-full text-sm hover:bg-green-700 transition duration-200"
                      title="حفظ التعديل"
                    >
                      <i className="fas fa-save"></i>
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm hover:bg-gray-700 transition duration-200"
                      title="إلغاء التعديل"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </>
                ) : (
                  // عرض أزرار التعديل والحذف في الوضع العادي
                  <>
                    <button
                      onClick={() => startEditing(service.id)}
                      className="text-blue-600 hover:underline bg-blue-600 text-white px-3 py-1 rounded-full text-sm  transition duration-200"
                      title="تعديل الصورة"
                    >
                      <i className="fas fa-pen"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-full text-sm hover:bg-red-700 transition duration-200"
                      title="حذف الصورة"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        !status.includes('جاري جلب الصور') && !status.includes('خطأ') && (
          <p className="text-lg text-gray-600">لا توجد صور لعرضها حالياً.</p>
        )
      )}
    </div>
  );
};

export default DashboardGallery;
