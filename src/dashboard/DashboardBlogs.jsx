

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'tailwindcss/tailwind.css';

const DashboardBlogs = () => {
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // جلب الـ Blogs من الـ API
  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('التوكن غير موجود. يرجى تسجيل الدخول.');
        return;
      }
      const response = await axios.get('https://theway4business.27lashabab.com/api/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(response.data.data || response.data); // التعامل مع البيانات سواء كانت داخل data أو مباشرة
    } catch (error) {
      setErrorMessage('❌ حدث خطأ أثناء جلب المدونات');
      console.error('Error fetching blogs:', error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    // Validate required fields
    if (!title.trim()) {
      setErrorMessage('يرجى إدخال العنوان');
      return;
    }
    if (!shortDescription.trim()) {
      setErrorMessage('يرجى إدخال وصف قصير');
      return;
    }
    if (!fullDescription.trim()) {
      setErrorMessage('يرجى إدخال الوصف الكامل');
      return;
    }
    if (!editingId && !mainImage) {
      setErrorMessage('يرجى اختيار صورة رئيسية');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('short_description', shortDescription);
    formData.append('full_description', fullDescription);
    
    // إرسال الصورة فقط إذا تم اختيارها
    if (mainImage) {
      formData.append('main_image', mainImage);
      // بناءً على البيانات التي أرسلتها، الـ API قد يتوقع صورة أخرى
      formData.append('inner_main_image', mainImage); 
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('التوكن غير موجود. يرجى تسجيل الدخول.');
      return;
    }

    try {
      let response;
      if (editingId) {
        // --- التعديل الرئيسي هنا ---
        // استخدام PUT لتعديل مدونة موجودة
        // يتم إضافة '_method: 'PUT'' لأنه في بعض الأحيان الـ API يتطلب هذا عند استخدام formData مع PUT/PATCH
        formData.append('_method', 'POST'); 
        response = await axios.post(
          `https://theway4business.27lashabab.com/api/posts/${editingId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // استخدام POST لإنشاء مدونة جديدة
        response = await axios.post(
          'https://theway4business.27lashabab.com/api/posts',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setSuccessMessage(editingId ? '✔ The post was successfully updated!' : '✔ Blog created successfully!!');
      setErrorMessage('');
      setTitle('');
      setShortDescription('');
      setFullDescription('');
      setMainImage(null);
      setEditingId(null);
      e.target.reset();
      fetchBlogs(); // إعادة جلب الـ Blogs بعد الإنشاء أو التعديل
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      setErrorMessage(`❌ حدث خطأ أثناء ${editingId ? 'Edit' : 'Create'} Blog: ${errorMsg}`);
      setSuccessMessage('');
      console.error(`Error ${editingId ? 'updating' : 'creating'} blog:`, error.response?.data || error);
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setTitle(blog.title);
    setShortDescription(blog.short_description);
    setFullDescription(blog.full_description);
    setMainImage(null); // الصورة مش هتتحمل تلقائيًا، المستخدم هيختار صورة جديدة إن لزم
    setSuccessMessage('');
    setErrorMessage('');
  };

  // ملاحظة: تم تعديل handleDelete ليتجنب استخدام `window.confirm`
  const handleDelete = async (id) => {
    // يمكنك إضافة Modal بدلاً من alert
    if (!window.confirm('Are You Sure Delete This Blog ?')) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('التوكن غير موجود. يرجى تسجيل الدخول.');
        return;
      }

      await axios.delete(`https://theway4business.27lashabab.com/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage('✔ Blog Deleted !');
      setErrorMessage('');
      fetchBlogs();
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      setErrorMessage(`❌ حدث خطأ أثناء حذف المدونة: ${errorMsg}`);
      console.error('Error deleting blog:', error.response?.data || error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setShortDescription('');
    setFullDescription('');
    setMainImage(null);
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-gray-700 rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Create New Blog</h2>

        {successMessage && <p className="text-green-600 mb-3">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 mb-3">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-white">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded text-black focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-white">Short Description</label>
            <textarea
              className="w-full border border-gray-300 p-2 rounded text-black focus:outline-none resize-none"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium text-white">Full Description</label>
            <textarea
              className="w-full border border-gray-300 p-2 rounded text-black focus:outline-none resize-none"
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium text-white">Main Image</label>
            <input
              type="file"
              className="w-full text-white"
              accept="image/*"
              onChange={(e) => setMainImage(e.target.files[0])}
              required={!editingId} // الصورة إجبارية بس للإنشاء
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded"
            >
              {editingId ? 'Update Blog' : 'Create Blog'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-gray-700 rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-white">All Blogs</h2>
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-xl shadow border overflow-hidden relative">
                {/* تم تعديل هذا السطر لاستخدام blog.main_image_url */}
                {blog.main_image_url ? (
                  <img
                    src={blog.main_image_url}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                    <p className="text-gray-600">No Image</p>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-black">{blog.title}</h3>
                  <p className="text-gray-600 truncate">{blog.short_description}</p>
                </div>
                <div className="absolute top-2 right-2 space-x-2">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="text-white px-2 py-1 rounded bg-blue-600 hover:underline hover:bg-blue -700"
                  >
                    <i className="fas fa-pen"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white text-center">No Blogs Available</p>
        )}
      </div>
    </div>
  );
};

export default DashboardBlogs;