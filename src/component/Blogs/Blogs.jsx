




import React from 'react';
import SuperCardBlogs from '../Blogs/SuperCardBlogs'


const Blogs = () => {
  return (
    <div className=" text-white min-h-screen font-sans p-6">

      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl
                      px-4 py-10 sm:px-6 sm:py-12 md:px-12 md:py-16
                      flex items-center justify-center
                      shadow-2xl shadow-cyan-400/50
                        my-10 mx-auto max-w-6xl mt-24">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold italic text-center"
              style={{
                textShadow: '0 0 5px rgba(255, 255, 255, 0.7), 0 0 10px rgba(255, 255, 255, 0.5)'
              }}>
            BLOGS
          </h1>
      </div>


      {/* القسم الثاني: المكونات الأخرى */}
      <div className="max-w-6xl mx-auto">
        {/* تم استبدال <SuperNovaCard /> بـ div مؤقت لأن المكون غير موجود */}
        <div className="p-8 text-center rounded-lg">
          <SuperCardBlogs />
        </div>
      </div>
    </div>
  );
};

export default Blogs;