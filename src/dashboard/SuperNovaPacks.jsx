// import React, { useState } from 'react';

// const CreatePackageForm = () => {
//   const [title, setTitle] = useState('');
//   const [shortDescription, setShortDescription] = useState('');
//   const [fullDescription, setFullDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [mainImage, setMainImage] = useState(null);
//   const [galleryImages, setGalleryImages] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('short_description', shortDescription);
//     formData.append('full_description', fullDescription);
//     formData.append('price', price);
//     formData.append('main_image', mainImage);
//     galleryImages.forEach((img) => formData.append('images[]', img));

//     try {
//       const token = localStorage.getItem('token');

//       const res = await fetch('https://theway4business.27lashabab.com/api/packages/create', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Accept': 'application/json',
//         },
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         console.error('🧨 Server Response:', data);
//         throw new Error(data.message || 'Failed to create package');
//       }

//       // Success
//       setTitle('');
//       setShortDescription('');
//       setPrice('');
//       setMainImage(null);
//       setGalleryImages([]);
//       alert("✅ Package added successfully");
//     } catch (err) {
//       console.error('❌ Catch Error:', err);
//       alert(`❌ Error: ${err.message}`);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow max-w-xl mx-auto">
//       <h2 className="text-xl font-bold text-black text-center">Add New Package</h2>

//       <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full border p-2 text-black" />
//       <textarea placeholder="Short Description" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required className="w-full border resize-none p-2 text-black" />
//       <textarea
//         placeholder="Full Description"
//         value={fullDescription}
//         onChange={(e) => setFullDescription(e.target.value)}
//         required
//         className="w-full border p-2 text-black focus:outline-none resize-none"
//       />

//       <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full border p-2 text-black" />

//       <input type="file" accept="image/*" onChange={(e) => setMainImage(e.target.files[0])} required />
//       <input type="file" accept="image/*" multiple onChange={(e) => setGalleryImages([...e.target.files])} />

//       <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
//     </form>
//   );
// };

// export default CreatePackageForm;

import React, { useEffect, useState } from "react";

const CreatePackageForm = () => {
  const [packages, setPackages] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    short_description: "",
    full_description: "",
    price: "",
    main_image: null,
    gallery_images: [],
  });

  const [newPackage, setNewPackage] = useState({
    title: "",
    short_description: "",
    full_description: "",
    price: "",
    main_image: null,
    gallery_images: [],
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    const res = await fetch(
      "https://theway4business.27lashabab.com/api/packages"
    );
    const data = await res.json();
    setPackages(data.data);
  };

  const handleEditClick = (pkg) => {
    setEditId(pkg.id);
    setEditData({
      title: pkg.title,
      short_description: pkg.short_description,
      full_description: pkg.full_description,
      price: pkg.price,
      main_image: null,
      gallery_images: [],
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", editData.title);
    formData.append("short_description", editData.short_description);
    formData.append("full_description", editData.full_description);
    formData.append("price", editData.price);
    if (editData.main_image) formData.append("main_image", editData.main_image);
    editData.gallery_images.forEach((img) => formData.append("images[]", img));

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://theway4business.27lashabab.com/api/packages/${editId}/update`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: formData,
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "فشل التعديل");
      alert("✅ تم التعديل بنجاح");
      setEditId(null);
      fetchPackages();
    } catch (err) {
      alert(`❌ خطأ: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد أنك تريد حذف هذه الباقة؟")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://theway4business.27lashabab.com/api/packages/delete/${id}`,
        {
          method: "DELETE", // 👈 استخدم DELETE هنا
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "فشل الحذف");
      alert("✅ تم الحذف بنجاح");
      fetchPackages(); // تحديث القائمة
    } catch (err) {
      alert(`❌ خطأ: ${err.message}`);
    }
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewPackage((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newPackage.title);
    formData.append("short_description", newPackage.short_description);
    formData.append("full_description", newPackage.full_description);
    formData.append("price", newPackage.price);
    if (newPackage.main_image)
      formData.append("main_image", newPackage.main_image);
    newPackage.gallery_images.forEach((img) =>
      formData.append("images[]", img)
    );

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://theway4business.27lashabab.com/api/packages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: formData,
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "فشل الإضافة");
      alert("✅ تم إنشاء الباقة");
      setNewPackage({
        title: "",
        short_description: "",
        full_description: "",
        price: "",
        main_image: null,
        gallery_images: [],
      });
      fetchPackages();
    } catch (err) {
      alert(`❌ خطأ: ${err.message}`);
    }
  };

  return (
    <div className="p-6 space-y-10">
      <h2 className="text-2xl font-bold text-black text-center">
        Create New Package
      </h2>

      {/* نموذج إنشاء باقة جديدة */}
      <form
        onSubmit={handleCreateSubmit}
        className="bg-white shadow p-4 rounded space-y-4 max-w-xl mx-auto"
      >
        <input
          name="title"
          value={newPackage.title}
          onChange={handleCreateChange}
          placeholder="Title"
          className="w-full p-2 border rounded focus:outline-none text-black"
          required
        />
        <textarea
          name="short_description"
          value={newPackage.short_description}
          onChange={handleCreateChange}
          placeholder="Short Description"
          className="w-full p-2 border rounded focus:outline-none text-black"
          required
        />
        <textarea
          name="full_description"
          value={newPackage.full_description}
          onChange={handleCreateChange}
          placeholder="Full Description"
          className="w-full p-2 border rounded focus:outline-none text-black"
          required
        />
        <input
          name="price"
          type="number"
          value={newPackage.price}
          onChange={handleCreateChange}
          placeholder="Price"
          className="w-full p-2 border rounded focus:outline-none text-black"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setNewPackage({ ...newPackage, main_image: e.target.files[0] })
          }
        />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) =>
            setNewPackage({
              ...newPackage,
              gallery_images: [...e.target.files],
            })
          }
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </form>

      {/* عرض الكروت */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white shadow p-4 rounded space-y-2">
            <img
              src={pkg.main_image_url}
              alt="Main"
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-lg font-semibold text-black">{pkg.title}</h3>
            <p className="text-gray-700 text-sm">{pkg.short_description}</p>
            <p className="text-gray-600 text-xs">{pkg.full_description}</p>
            <p className="text-green-600 font-bold text-sm">{pkg.price} AED</p>
            <div className="flex gap-1 mt-2 overflow-auto">
              {pkg.image_urls.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Gallery ${i}`}
                  className="w-12 h-12 rounded"
                />
              ))}
            </div>
            <button
              onClick={() => handleEditClick(pkg)}
              className="text-blue-600 hover:underline"
            >
              <i className="fas fa-pen"></i>
            </button>

            <button
              onClick={() => handleDelete(pkg.id)}
              className="text-red-600 hover:underline ms-2"
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        ))}
      </div>

      {/* نموذج تعديل */}
      {editId && (
        <form
          onSubmit={handleEditSubmit}
          className="bg-gray-100 p-4 rounded space-y-4 shadow max-w-xl mx-auto"
        >
          <h3 className="text-lg font-bold text-center text-black">
            Edit package
          </h3>
          <input
            name="title"
            type="text"
            value={editData.title}
            onChange={handleEditChange}
            placeholder="Title"
            className="text-black w-full p-2 border rounded"
            required
          />
          <textarea
            name="short_description"
            value={editData.short_description}
            onChange={handleEditChange}
            placeholder="Short Description"
            className="text-black w-full p-2 border rounded"
            required
          />
          <textarea
            name="full_description"
            value={editData.full_description}
            onChange={handleEditChange}
            placeholder="Full Description"
            className="text-black w-full p-2 border rounded"
            required
          />
          <input
            name="price"
            type="number"
            value={editData.price}
            onChange={handleEditChange}
            placeholder="Price"
            className="w-full p-2 border rounded text-black"
            required
          />
          <input
            type="file"
            className="text-black"
            accept="image/*"
            onChange={(e) =>
              setEditData({ ...editData, main_image: e.target.files[0] })
            }
          />
          <input
            type="file"
            className="text-black"
            accept="image/*"
            multiple
            onChange={(e) =>
              setEditData({ ...editData, gallery_images: [...e.target.files] })
            }
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default CreatePackageForm;
