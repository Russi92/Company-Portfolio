

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const SuperNovaImages = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const fileInputRef = useRef(null);

  // جلب الصور
  const fetchImages = async () => {
    try {
      const res = await axios.get(
        "https://theway4business.27lashabab.com/api/services"
      );
      const allImages = res.data.flatMap((service) =>
        service.image_urls.map((url) => ({ id: service.id, url }))
      );
      setImages(allImages.reverse());
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedImage) return alert("اختر صورة أولاً");

    const formData = new FormData();
    formData.append("main_image", selectedImage);
    formData.append("title", "Image Only");
    formData.append("description", "Temporary image upload");
    formData.append("price", "0");
    formData.append("images[]", selectedImage);

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "https://theway4business.27lashabab.com/api/services/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedImage(null);
      setPreviewUrl(null);
      setSelectedRowId(null);
      fileInputRef.current.value = "";
      fetchImages();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("فشل رفع الصورة. تأكد من التوكن وصحة البيانات.");
    }
  };

  const handleEdit = async () => {
    if (!selectedRowId) return alert("اختر صف لتعديله");
    if (!selectedImage) return alert("اختر صورة لتعديلها");

    const formData = new FormData();
    formData.append("main_image", selectedImage);
    formData.append("title", "Updated Image");
    formData.append("description", "Updated image for service");
    formData.append("price", "0");
    formData.append("images[]", selectedImage);

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `https://theway4business.27lashabab.com/api/services/update/${selectedRowId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("تم تعديل الصورة بنجاح");
      setSelectedImage(null);
      setPreviewUrl(null);
      setSelectedRowId(null);
      fileInputRef.current.value = "";
      fetchImages();
    } catch (error) {
      console.error("Error updating image:", error);
      alert("فشل في تعديل الصورة");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("هل تريد حذف هذه الصورة؟");
    if (!confirmDelete) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `https://theway4business.27lashabab.com/api/services/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchImages();
      alert("تم الحذف بنجاح");
    } catch (error) {
      console.error("خطأ في الحذف:", error);
      alert("فشل في حذف الصورة");
    }
  };

  return (
    <div className="p-6 text-white bg-gray-700">
      <h2 className="text-2xl font-bold mb-4">Super Nova Images</h2>

      <form onSubmit={handleUpload} className="mb-6">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.target.files[0];
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
          }}
          className="mb-2"
        />

        {previewUrl && (
          <div className="mb-4">
            <img
              src={previewUrl}
              alt="Preview"
              className="h-32 object-contain border border-gray-300 rounded"
            />
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload Image
          </button>

          <button
            type="button"
            onClick={handleEdit}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Edit Image
          </button>
        </div>
      </form>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200 text-black">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image, index) => (
            <tr
              key={index}
              onClick={() => setSelectedRowId(image.id)}
              className={`cursor-pointer ${
                selectedRowId === image.id ? "bg-blue-100" : ""
              }`}
            >
              <td className="border p-2 text-center">{index + 1}</td>
              <td className="border p-2 flex justify-center">
                <img
                  src={image.url}
                  alt={`img-${index}`}
                  className="h-20 object-cover"
                />
              </td>
              <td className="border p-2 text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // عشان ما يختارش الصف كـ selected
                    handleDelete(image.id);
                  }}
                  className="text-red-600 hover:text-red-800"
                  title="حذف"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuperNovaImages;
