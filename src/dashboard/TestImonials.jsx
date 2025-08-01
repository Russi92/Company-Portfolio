


import React, { useState, useEffect } from 'react';

const TestImonials = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editImage, setEditImage] = useState(null); // ✅ جديد

  useEffect(() => {
    fetch('https://theway4business.27lashabab.com/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setTestimonials(data.data.reverse());
        }
      })
      .catch((err) => console.error('فشل تحميل الآراء:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !image) return alert("كل الحقول مطلوبة");

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://theway4business.27lashabab.com/api/testimonials/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (data?.data) {
        setTestimonials((prev) => [data.data, ...prev]);
        setName('');
        setDescription('');
        setImage(null);
      } else {
        console.error("حدث خطأ", data);
      }
    } catch (error) {
      console.error("فشل الإرسال", error);
    }
  };

  const handleEdit = async (id) => {
    if (!editName || !editDescription) return alert("كل الحقول مطلوبة للتعديل");

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', editName);
      formData.append('description', editDescription);
      if (editImage) {
        formData.append('image', editImage);
      }

      const res = await fetch(`https://theway4business.27lashabab.com/api/testimonials/update/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (data?.data) {
        alert('تم التعديل بنجاح ✅');
        setTestimonials((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  name: editName,
                  description: editDescription,
                  image_url: editImage ? URL.createObjectURL(editImage) : item.image_url,
                }
              : item
          )
        );
        setEditingId(null);
        setEditImage(null);
      } else {
        console.error('فشل في التعديل', data);
      }
    } catch (err) {
      console.error('خطأ أثناء التعديل:', err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('هل أنت متأكد أنك تريد حذف هذا الرأي؟');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://theway4business.27lashabab.com/api/testimonials/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data?.message?.toLowerCase().includes('deleted')) {
        alert('تم الحذف بنجاح ✅');
        setTestimonials((prev) => prev.filter((item) => item.id !== id));
      } else {
        console.error('فشل في الحذف', data);
      }
    } catch (err) {
      console.error('خطأ أثناء الحذف:', err);
    }
  };

  return (
    <div className="p-6 text-black bg-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">New Testimonial</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8 flex flex-col items-center">
        <input
          type="text"
          placeholder="User Name"
          className="w-96 border px-3 py-2 rounded focus:outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-96 border px-3 py-2 rounded focus:outline-none resize-none"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          className="w-96 focus:outline-none"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2 text-white">All Opinion</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((item) => (
          <div key={item.id} className="bg-white shadow p-4 rounded relative">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg text-center m-auto"
            />

            {editingId === item.id ? (
              <div className="text-center space-y-2 mt-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full border px-2 py-1 rounded focus:outline-none"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={3}
                  className="w-full border px-2 py-1 rounded focus:outline-none resize-none"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditImage(e.target.files[0])}
                  className="w-full focus:outline-none"
                />
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Save Edit
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditImage(null);
                    }}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h4 className="text-lg font-bold mt-2 text-center">{item.name}</h4>
                <p className="text-sm text-gray-700 break-words whitespace-pre-line mb-2 text-center">
                  {item.description}
                </p>
              </>
            )}

            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => {
                  setEditingId(item.id);
                  setEditName(item.name);
                  setEditDescription(item.description);
                  setEditImage(null);
                }}
                className="text-blue-600 hover:underline"
                title="تعديل"
              >
                <i className="fas fa-pen"></i>
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 hover:underline"
                title="حذف"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestImonials;



