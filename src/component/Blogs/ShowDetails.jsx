
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ShowDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const res = await axios.get(`https://theway4business.27lashabab.com/api/posts/${id}`);

        setService(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching service details:', err);
        setError('حدث خطأ أثناء جلب التفاصيل ❌');
        setLoading(false);
      }
    };
    fetchServiceDetails();
  }, [id]);

  if (loading) {
    return <div className="text-white text-center mt-96">Loading ...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-96">{error}</div>;
  }

  if (!service) {
    return <div className="text-white text-center mt-96">No Details</div>;
  }

  return (
    <div className="min-h-screen text-white font-sans p-6 mt-10">
        
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl
                        p-6 sm:p-10 md:p-16
                        flex items-center justify-center
                        shadow-2xl shadow-cyan-400/50
                        my-10 mx-auto max-w-6xl mt-24 w-full">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold italic text-center" style={{
            textShadow: '0 0 5px rgba(255, 255, 255, 0.7), 0 0 10px rgba(255, 255, 255, 0.5)'
        }}>
            Blogs Details
        </h1>
        </div>

      <div className="max-w-6xl mx-auto rounded-3xl p-8 shadow-2xl my-10">
        <h1 className="text-4xl font-bold text-center mb-6">{service.title}</h1>
        <div className="flex flex-col md:flex-row gap-8 justify-between">
  
          <p className="text-sm text-gray-300 text-center break-words overflow-hidden whitespace-normal">
              {service.short_description}
          </p>

          <div className="md:w-1/2 border-l-4 border-r-4 border-white shadow-[4px_0_8px_white,-4px_0_8px_white]" >
            <img
              src={service.main_image_url}
              alt={service.title}
              className="w-full h-96 object-cover rounded-xl p-5"
            />
            {service.image_urls && service.image_urls.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {service.image_urls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Additional ${index}`}
                    className="w-full h-48 object-cover rounded-xl shadow-md"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;