

import React, { useEffect, useState } from 'react';



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

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [editingPartner, setEditingPartner] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [createImage, setCreateImage] = useState(null);
  const [authToken, setAuthToken] = useState(''); // حالة لرمز التوثيق

  // حالة لمكون الـ Modal
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

  // دالة لجلب الشركاء
  const fetchPartners = () => {
    fetch('https://theway4business.27lashabab.com/api/partners')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setPartners(data.data);
        }
      })
      .catch((err) => {
        console.error("فشل تحميل الشركاء:", err);
        displayModal("❌ فشل تحميل الشركاء. الرجاء التحقق من اتصالك بالإنترنت.", 'alert');
      });
  };

  // جلب الشركاء ورمز التوثيق عند تحميل المكون لأول مرة
  useEffect(() => {
    fetchPartners();
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

  const handleEditClick = (partner) => {
    setEditingPartner(partner);
    setNewImage(null);
  };

  const handleUpdate = async () => {
    if (!authToken) {
      displayModal("❌ لم يتم حفظ رمز التوثيق. الرجاء حفظه أولاً.", 'alert');
      return;
    }
    if (!newImage || !editingPartner) {
      displayModal("❌ لم يتم اختيار صورة", 'alert');
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", newImage);
      formData.append("name", "Hidden Name");

      const res = await fetch(`https://theway4business.27lashabab.com/api/partners/update/${editingPartner.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json',
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.data) {
        displayModal("✅ تم التعديل بنجاح", 'alert');
        // بعد التعديل، نعيد جلب البيانات بالكامل من الخادم
        fetchPartners();
        setEditingPartner(null);
      } else {
        console.error("فشل التعديل:", data);
        displayModal("❌ فشل التعديل", 'alert');
      }
    } catch (err) {
      console.error("خطأ أثناء التعديل:", err);
      displayModal("❌ حصل خطأ في الاتصال", 'alert');
    }
  };

  const handleDelete = (partnerId) => {
    if (!authToken) {
      displayModal("❌ لم يتم حفظ رمز التوثيق. الرجاء حفظه أولاً.", 'alert');
      return;
    }
    displayModal(
      "Are You Sure Delete This Partner ?",
      'confirm',
      async () => {
        try {
          const res = await fetch(`https://theway4business.27lashabab.com/api/partners/delete/${partnerId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Accept': 'application/json',
            },
          });

          if (res.ok) {
            displayModal("✅ تم حذف الشريك بنجاح", 'alert');
            // بعد الحذف، نعيد جلب البيانات بالكامل من الخادم
            fetchPartners();
          } else {
            const data = await res.json();
            console.error("فشل الحذف:", data);
            displayModal("❌ فشل الحذف", 'alert');
          }
        } catch (err) {
          console.error("خطأ أثناء الحذف:", err);
          displayModal("❌ حصل خطأ في الاتصال", 'alert');
        }
        setShowModal(false); // إغلاق الـ Modal بعد التنفيذ
      }
    );
  };

  const handleCreate = async () => {
    if (!authToken) {
      displayModal("❌ لم يتم حفظ رمز التوثيق. الرجاء حفظه أولاً.", 'alert');
      return;
    }
    if (!createImage) {
      displayModal("❌ من فضلك اختر صورة لإضافة شريك جديد", 'alert');
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(createImage.type)) {
      displayModal("❌ نوع الصورة غير مدعوم. استخدم jpeg أو png فقط.", 'alert');
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", createImage);
      formData.append("name", "Hidden Name");

      const res = await fetch("https://theway4business.27lashabab.com/api/partners/create", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json',
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.data) {
        displayModal("✅ تم إضافة الشريك بنجاح", 'alert');
        // بعد الإضافة، نعيد جلب البيانات بالكامل من الخادم
        fetchPartners();
        
        // تفريغ حقل الإدخال فورًا
        document.getElementById('create-partner-input').value = null;
        setCreateImage(null);

      } else {
        console.error("فشل الإضافة:", data);
        displayModal("❌ فشل إضافة الشريك: " + (data.message || "خطأ غير معروف"), 'alert');
      }
    } catch (err) {
      console.error("خطأ أثناء الإضافة:", err);
      displayModal("❌ حصل خطأ في الاتصال", 'alert');
    }
  };

  return (
    <div className=" text-white min-h-screen p-6 font-sans bg-gray-700">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">Partners</h2>
        
        {/* تم إزالة حقل إدخال التوكن */}

        <div className="mb-8 p-6 bg-gray-700 rounded-lg shadow-xl flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            id="create-partner-input"
            type="file"
            accept="image/*"
            onChange={(e) => setCreateImage(e.target.files[0])}
            className="w-full md:w-auto text-sm text-gray-300
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-500 file:text-white
                       hover:file:bg-blue-600 cursor-pointer"
          />
          <button
            onClick={handleCreate}
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Add New Partner
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {partners.map((partner) => (
            <div key={partner.id} className="rounded-lg shadow-lg p-4 flex flex-col items-center justify-center transition-transform transform hover:scale-105">
              <img
                src={partner.image_url}
                alt={`Partner ${partner.id}`}
                className="w-full h-24 object-contain mb-4 rounded-md"
              />
              <p className="hidden">{partner.name}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleEditClick(partner)}
                  className="text-blue-400 hover:text-blue-500 transition-colors"
                  title="تعديل"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.389-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(partner.id)}
                  className="text-red-400 hover:text-red-500 transition-colors"
                  title="حذف"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-700 p-8 rounded-lg shadow-2xl max-w-lg w-full">
            <h3 className="text-2xl font-bold mb-6 text-center text-white">Edit Partner Logo</h3>
            <div className="mb-6 bg-gray-600 p-4 rounded-lg flex items-center justify-center">
              <img
                src={newImage ? URL.createObjectURL(newImage) : editingPartner.image_url}
                alt="الشعار الحالي"
                className="w-full max-h-48 object-contain rounded-md"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewImage(e.target.files[0])}
              className="w-full text-sm text-gray-300
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-500 file:text-white
                         hover:file:bg-blue-600 cursor-pointer mb-6"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setEditingPartner(null)}
                className="px-6 py-3 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors shadow-md"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors shadow-md"
              >
                 Save Edit
              </button>
            </div>
          </div>
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

export default Partners;


