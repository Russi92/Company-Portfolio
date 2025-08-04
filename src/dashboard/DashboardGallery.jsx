

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const DashboardGallery = () => {
//   // حالة لتخزين قائمة الخدمات/الصور التي سيتم جلبها من الـ API
//   const [services, setServices] = useState([]);
//   // حالة لتخزين رسائل الحالة (نجاح، خطأ، تحميل) لعرضها للمستخدم
//   const [status, setStatus] = useState('');
//   // توكن المصادقة، يتم جلبه من localStorage
//   const token = localStorage.getItem('token');
  
//   // حالات جديدة لوظيفة التعديل
//   const [editingId, setEditingId] = useState(null); // لتحديد الصورة التي يتم تعديلها
//   const [editImage, setEditImage] = useState(null); // لتخزين الصورة الجديدة للتعديل

//   // دالة لجلب الخدمات/الصور من الـ API
//   const fetchServices = async () => {
//     setStatus('جاري جلب الصور...');
//     try {
//       const res = await axios.get('https://theway4business.27lashabab.com/api/services', {
//         headers: {
//           // إرسال توكن المصادقة في الـ headers
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       // تحديث حالة الخدمات بالبيانات التي تم جلبها
//       setServices(res.data);
//       setStatus('تم جلب الصور بنجاح.');
//     } catch (error) {
//       console.error('Error fetching services:', error);
//       // في حالة وجود خطأ، نعرض رسالة خطأ للمستخدم
//       setStatus('حدث خطأ أثناء جلب الصور ❌. تأكد من أنك مسجل الدخول.');
//     }
//   };

//   // دالة لحذف صورة معينة بناءً على الـ ID
//   const handleDelete = async (id) => {
//     // تأكيد من المستخدم قبل الحذف لتجنب الحذف العرضي
//     // NOTE: Replace window.confirm with a custom modal for better UX
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

//   // دالة لبدء وضع التعديل لصورة معينة
//   const startEditing = (id) => {
//     setEditingId(id);
//     setEditImage(null);
//     setStatus('');
//   };

//   // دالة لإلغاء وضع التعديل
//   const cancelEditing = () => {
//     setEditingId(null);
//     setEditImage(null);
//     setStatus('');
//   };

//   // دالة لتنفيذ عملية التعديل
//   const handleEdit = async (id) => {
//     if (!editImage) {
//       setStatus('يرجى اختيار صورة جديدة للتعديل.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('main_image', editImage);

//     setStatus('جاري تعديل الصورة...');
//     try {
//       // إرسال طلب POST إلى الـ API لتعديل الصورة
//       await axios.post(
//         `https://theway4business.27lashabab.com/api/services/update/${id}`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setStatus('تم تعديل الصورة بنجاح ✅');
//       setEditImage(null);
//       setEditingId(null);
//       fetchServices(); // تحديث القائمة بعد التعديل
//     } catch (error) {
//       console.error('Edit error:', error);
//       setStatus('حدث خطأ أثناء التعديل ❌');
//     }
//   };

//   // useEffect Hook لجلب الخدمات بمجرد تحميل المكون لأول مرة
//   useEffect(() => {
//     fetchServices();
//   }, []);

//   return (
//     <div className="p-6 bg-gray-700">
//       <h2 className="text-2xl font-bold mb-6">Galleries</h2>

//       {status && <p className="mb-4 text-gray-700"></p>}

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

//               <div className="absolute top-2 right-2 space-x-2">
//                 {editingId === service.id ? (
//                   // عرض حقل الإدخال وأزرار الحفظ والإلغاء في وضع التعديل
//                   <>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => setEditImage(e.target.files[0])}
//                       className="block text-sm w-full absolute top-12 right-2 p-2 rounded-lg bg-gray-100"
//                     />
//                     <button
//                       onClick={() => handleEdit(service.id)}
//                       className="bg-green-600 text-white px-3 py-1 rounded-full text-sm hover:bg-green-700 transition duration-200"
//                       title="حفظ التعديل"
//                     >
//                       <i className="fas fa-save"></i>
//                     </button>
//                     <button
//                       onClick={cancelEditing}
//                       className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm hover:bg-gray-700 transition duration-200"
//                       title="إلغاء التعديل"
//                     >
//                       <i className="fas fa-times"></i>
//                     </button>
//                   </>
//                 ) : (
//                   // عرض أزرار التعديل والحذف في الوضع العادي
//                   <>
//                     <button
//                       onClick={() => startEditing(service.id)}
//                       className="text-blue-600 hover:underline bg-blue-600 text-white px-3 py-1 rounded-full text-sm  transition duration-200"
//                       title="تعديل الصورة"
//                     >
//                       <i className="fas fa-pen"></i>
//                     </button>
//                     <button
//                       onClick={() => handleDelete(service.id)}
//                       className="bg-red-600 text-white px-3 py-1 rounded-full text-sm hover:bg-red-700 transition duration-200"
//                       title="حذف الصورة"
//                     >
//                       <i className="fas fa-trash"></i>
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         !status.includes('جاري جلب الصور') && !status.includes('خطأ') && (
//           <p className="text-lg text-gray-600">لا توجد صور لعرضها حالياً.</p>
//         )
//       )}
//     </div>
//   );
// };

// export default DashboardGallery;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'tailwindcss/tailwind.css';

const DashboardGallery = () => {
  // حالة لتخزين قائمة الخدمات/الصور التي سيتم جلبها من الـ API
  const [services, setServices] = useState([]);
  // حالة لتخزين رسائل الحالة (نجاح، خطأ، تحميل) لعرضها للمستخدم
  const [status, setStatus] = useState('');
  // توكن المصادقة، يتم جلبه من localStorage
  const token = localStorage.getItem('token');
  
  // حالة جديدة لوظيفة الإنشاء، فقط للصورة
  const [newImage, setNewImage] = useState(null);

  // حالات لوظيفة التعديل
  const [editingId, setEditingId] = useState(null); 
  const [editImage, setEditImage] = useState(null); 

  // دالة لجلب الخدمات/الصور من الـ API
  const fetchServices = async () => {
    setStatus('Loading...');
    try {
      const res = await axios.get('https://theway4business.27lashabab.com/api/services', {
        headers: {
          // إرسال توكن المصادقة في الـ headers
          Authorization: `Bearer ${token}`,
        },
      });
      // تحديث حالة الخدمات بالبيانات التي تم جلبها
      setServices(res.data);
      // تم حذف رسالة النجاح من هنا
      setStatus('');
    } catch (error) {
      console.error('Error fetching services:', error.response?.data || error);
      // في حالة وجود خطأ، نعرض رسالة خطأ للمستخدم
      setStatus('❌ حدث خطأ أثناء جلب الصور. تأكد من أنك مسجل الدخول.');
    }
  };

  // دالة لإنشاء خدمة جديدة
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!newImage) {
      setStatus('يرجى اختيار صورة.');
      return;
    }
    
    const formData = new FormData();
    // إرسال الصورة إلى حقول الـ API المطلوبة
    formData.append('main_image', newImage);
    formData.append('inner_image', newImage);
    formData.append('images[]', newImage);
    // بما أن الحقول الأخرى مثل title, description, price مطلوبة من قبل الـ API
    // سنرسل قيمًا افتراضية لها لتجنب الأخطاء
    formData.append('title', 'صورة جديدة');
    formData.append('description', 'وصف افتراضي');
    formData.append('price', 0);


    setStatus('جاري إنشاء الخدمة...');
    try {
      await axios.post(
        'https://theway4business.27lashabab.com/api/services/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // تم حذف رسالة النجاح من هنا
      setStatus('');
      // إعادة ضبط النموذج
      setNewImage(null);
      // تحديث القائمة
      fetchServices();
    } catch (error) {
      console.error('Create error:', error.response?.data || error);
      const errorMsg = error.response?.data?.error || error.response?.data?.message || 'حدث خطأ غير معروف';
      setStatus(`❌ حدث خطأ أثناء الإنشاء: ${errorMsg}`);
    }
  };

  // دالة لحذف صورة معينة بناءً على الـ ID
  const handleDelete = async (id) => {
    // NOTE: Replace window.confirm with a custom modal for better UX
    if (!window.confirm('هل أنت متأكد من حذف هذه الصورة؟ لا يمكن التراجع عن هذا الإجراء!')) {
      return; 
    }
    setStatus('جاري حذف الصورة...');
    try {
      await axios.delete(`https://theway4business.27lashabab.com/api/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      // تم حذف رسالة النجاح من هنا
      setStatus('');
      fetchServices();
    } catch (error) {
      console.error('Delete error:', error);
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
    formData.append('inner_image', editImage);
    formData.append('images[]', editImage);

    setStatus('جاري تعديل الصورة...');
    try {
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
      // تم حذف رسالة النجاح من هنا
      setStatus('');
      setEditImage(null);
      setEditingId(null);
      fetchServices(); // تحديث القائمة بعد التعديل
    } catch (error) {
      console.error('Edit error:', error);
      const errorMsg = error.response?.data?.error || error.response?.data?.message || 'حدث خطأ غير معروف';
      setStatus(`❌ حدث خطأ أثناء التعديل: ${errorMsg}`);
    }
  };

  // useEffect Hook لجلب الخدمات بمجرد تحميل المكون لأول مرة
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="p-6 bg-gray-800 text-white min-h-screen font-sans">
      <h1 className="text-3xl font-bold text-center mb-8">Create New Image</h1>
      
      {/* النموذج الخاص بإنشاء خدمة جديدة */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl mb-8">
        <h2 className="text-2xl font-semibold mb-4">Create</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-300">
             Image
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => setNewImage(e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
              accept="image/*"
              required
            />
          </div>
          <button
            type="submit"
            className=" 
            w-fit py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Create Image
          </button>
        </form>
      </div>

      {/* عرض حالة العملية */}
      {status && (
        <div className={`text-center p-4 rounded-md mb-8 ${status.includes('❌') ? 'bg-red-800' : 'bg-green-800'}`}>
          {status}
        </div>
      )}

      {/* عرض قائمة الخدمات/الصور */}
      <h2 className="text-2xl font-semibold mb-4 text-center">All Galleries</h2>
      
      {services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden relative">
              <img
                src={service.main_image_url}
                alt={service.title}
                className="w-full h-56 object-cover"
              />
       

              {/* أزرار التعديل والحذف */}
              <div className="absolute top-2 right-2 flex space-x-2">
                {editingId === service.id ? (
                  // وضع التعديل
                  <div className="flex flex-col space-y-2">
                    <input
                      type="file"
                      onChange={(e) => setEditImage(e.target.files[0])}
                      className="block text-sm w-full p-2 rounded-lg bg-gray-700 text-white"
                      title="اختر صورة جديدة"
                    />
                    <div className="flex space-x-2 justify-end">
                      <button
                        onClick={() => handleEdit(service.id)}
                        className="bg-green-600 text-white p-2 rounded-full text-sm hover:bg-green-700 transition duration-200"
                        title="حفظ التعديل"
                      >
                        <i className="fas fa-save"></i>
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="bg-red-600 text-white p-2 rounded-full text-sm hover:bg-red-700 transition duration-200"
                        title="إلغاء التعديل"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                ) : (
                  // الوضع العادي
                  <>
                    <button
                      onClick={() => startEditing(service.id)}
                      className="bg-blue-600 text-white p-2 rounded-full text-sm hover:bg-blue-700 transition duration-200"
                      title="تعديل الصورة"
                    >
                      <i className="fas fa-pen"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="bg-red-600 text-white p-2 rounded-full text-sm hover:bg-red-700 transition duration-200"
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
        !status.includes('Loading...') && !status.includes('خطأ') && (
          <div className="text-center text-gray-500">
            لا توجد صور لعرضها حالياً.
          </div>
        )
      )}
    </div>
  );
};

export default DashboardGallery;
