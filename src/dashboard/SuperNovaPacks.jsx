

// import React from 'react'

// const SuperNovaPacks = () => {
//   return (
//     <div className="text-black p-4">SuperNovaPacks</div>
//   )
// }

// export default SuperNovaPacks;

import React, { useState } from 'react';

const CreatePackageForm = () => {
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [price, setPrice] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('short_description', shortDescription);
    formData.append('full_description', fullDescription);
    formData.append('price', price);
    formData.append('main_image', mainImage);
    galleryImages.forEach((img) => formData.append('images[]', img));

    try {
      const token = localStorage.getItem('token');
    
      const res = await fetch('https://theway4business.27lashabab.com/api/packages/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: formData,
      });
    
      const data = await res.json();
    
      if (!res.ok) {
        console.error('🧨 Server Response:', data);
        throw new Error(data.message || 'Failed to create package');
      }
    
      // Success
      setTitle('');
      setShortDescription('');
      setPrice('');
      setMainImage(null);
      setGalleryImages([]);
      alert("✅ Package added successfully");
    } catch (err) {
      console.error('❌ Catch Error:', err);
      alert(`❌ Error: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-black text-center">Add New Package</h2>

      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full border p-2 text-black" />
      <textarea placeholder="Short Description" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required className="w-full border resize-none p-2 text-black" />
      <textarea
        placeholder="Full Description"
        value={fullDescription}
        onChange={(e) => setFullDescription(e.target.value)}
        required
        className="w-full border p-2 text-black focus:outline-none resize-none"
      />

      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full border p-2 text-black" />

      <input type="file" accept="image/*" onChange={(e) => setMainImage(e.target.files[0])} required />
      <input type="file" accept="image/*" multiple onChange={(e) => setGalleryImages([...e.target.files])} />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
    </form>
  );
};

export default CreatePackageForm;

