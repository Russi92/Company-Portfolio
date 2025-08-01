



import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateTiktokReel = () => {
  const [videoLink, setVideoLink] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [editingVideo, setEditingVideo] = useState(null);

  // 🔁 تحميل الريلز
  const fetchVideos = async () => {
    try {
      const res = await axios.get(
        "https://theway4business.27lashabab.com/api/tiktok-videos"
      );
      setVideos(res.data.reverse());
    } catch (error) {
      console.error("خطأ في تحميل الريلز:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // ✅ إنشاء أو تعديل ريل
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoLink || (!thumbnail && !editingVideo)) {
      alert("يرجى إدخال رابط الفيديو ورفع الصورة المصغرة");
      return;
    }

    const formData = new FormData();
    formData.append("video_link", videoLink);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      const token = localStorage.getItem("token");
      const url = editingVideo
        ? `https://theway4business.27lashabab.com/api/tiktok-videos/update/${editingVideo.id}`
        : "https://theway4business.27lashabab.com/api/tiktok-videos/create";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Error Response:", data);
        throw new Error(data.message || "Error");
      }

      alert(editingVideo ? "✅ تم تعديل الريل بنجاح" : "✅ تم إنشاء الريل بنجاح");
      setVideoLink("");
      setThumbnail(null);
      setEditingVideo(null);
      fetchVideos();
    } catch (err) {
      console.error("❌ Catch Error:", err);
      alert(`حدث خطأ: ${err.message}`);
    }
  };


  const handleEdit = (video) => {
    setEditingVideo(video);
    setVideoLink(video.video_link);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-700">
      {/* ✅ نموذج إنشاء / تعديل ريل */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-6 mb-10"
      >
        <h2 className="text-xl font-bold mb-4 text-center text-black">
          {editingVideo ? "Edit TikTok Reel" : "Create New TikTok Reel"}
        </h2>

        <label className="block mb-2 font-semibold text-black">Video URL</label>
        <input
          type="url"
          className="w-full border p-2 mb-4 focus:outline-none text-black"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          required
        />

        <label className="block mb-2 font-semibold text-black">
          Video Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
          className="mb-4"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {editingVideo ? "Update Video" : "Add Video"}
        </button>
      </form>

      {/* 📋 جدول الريلز */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-bold mb-4 text-black">ِAll Reels</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-200 ">
              <th className="p-2 text-black">#</th>
              <th className="p-2 text-black">image</th>
              <th className="p-2 text-black">Url</th>
              <th className="p-2 text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video, index) => (
              <tr key={video.id} className="border-t text-center">
                <td className="p-2 text-black">{index + 1}</td>
                <td className="p-2 text-center">
                  <img
                    src={video.thumbnail_url}
                    alt="thumb"
                    className="w-20 h-20 object-cover rounded mx-auto"
                  />
                </td>
                <td className="p-2">
                  <a
                    href={video.video_link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline "
                  >
                     Open Video
                  </a>
                </td>

                <td className="p-2 flex justify-center items-center gap-4">
                  <button
                    onClick={() => handleEdit(video)}
                    className="text-blue-600 hover:text-blue-800"
                    title="تعديل"
                  >
                    <i className="fas fa-pen"></i>
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateTiktokReel;
