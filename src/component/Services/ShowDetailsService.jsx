

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ShowDetailsService = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServiceDetails = async () => {
    try {
      const response = await axios.get(`https://theway4business.27lashabab.com/api/services/${id}`);
      setService(response.data);
    } catch (err) {
      console.error('Error fetching service details:', err);
      setError('❌ حدث خطأ أثناء جلب تفاصيل الخدمة.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center text-white mt-10">
        <i className="fas fa-spinner fa-spin mr-2"></i>
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (!service) {
    return <div className="text-center text-white mt-10">Service not found</div>;
  }

  return (
    <div className="container mx-auto p-6">

<div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl
                      px-4 py-10 sm:px-6 sm:py-12 md:px-12 md:py-16
                      flex items-center justify-center
                      shadow-2xl shadow-cyan-400/50
                        my-10 mx-auto max-w-6xl mt-24">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold italic text-center"
              style={{
                textShadow: '0 0 5px rgba(255, 255, 255, 0.7), 0 0 10px rgba(255, 255, 255, 0.5)'
              }}>
            Service Details
          </h1>
      </div>

      <div className=" p-6 rounded-xl shadow-lg text-white mx-auto">
        {service.main_image_url && (
          <img 
            src={service.main_image_url}
            alt={service.title}
            className="w-full  rounded-lg mb-6"
          />
        )}
        <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
        <p className="text-lg mb-4">{service.full_description || service.description}</p>
        <p className="text-xl font-semibold">
          Price: {service.price !== "0.00" ? `${service.price} AED` : 'Free'}
        </p>
      </div>
    </div>
  );
};

export default ShowDetailsService;
