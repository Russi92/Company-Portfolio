

import React, { useState } from 'react';

const CreateTiktokReel = () => {
  const [videoLink, setVideoLink] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoLink || !thumbnail) {
      alert("يرجى إدخال رابط الفيديو ورفع الصورة المصغرة");
      return;
    }

    const formData = new FormData();
    formData.append('video_link', videoLink);
    formData.append('thumbnail', thumbnail);

    try {
      const token = localStorage.getItem('token');

      const res = await fetch('https://theway4business.27lashabab.com/api/tiktok-videos/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Error Response:", data);
        throw new Error(data.message || 'Error');
      }

      alert('✅ Create Reel Successfully');
      setVideoLink('');
      setThumbnail(null);
    } catch (err) {
      console.error("❌ Catch Error:", err);
      alert(`حدث خطأ: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-xl font-bold mb-4 text-center text-black">Create New TikTok Reels</h2>

      <label className="block mb-2 font-semibold text-black">Video URL</label>
      <input
        type="url"
        className="w-full border p-2 mb-4 focus:outline-none text-black"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
        required
      />

      <label className="block mb-2 font-semibold text-black">Video Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setThumbnail(e.target.files[0])}
        className="mb-4"
        required
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Add Video
      </button>
    </form>
  );
};

export default CreateTiktokReel;
