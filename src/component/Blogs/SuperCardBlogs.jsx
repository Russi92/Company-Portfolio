

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SuperNovaCard = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('https://theway4business.27lashabab.com/api/posts');
        setServices(res.data.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      {services.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link to={`/show-details/${service.id}`} key={service.id}>
              <div className="rounded-xl overflow-hidden text-black shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={service.main_image_url}
                  alt={`img-${service.title}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-bold text-white text-center">{service.title}</h3>
                  <p className="text-sm text-gray-300 text-center break-words overflow-hidden whitespace-normal">
                    {service.short_description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-white">Loading ...</p>
      )}
    </div>
  );
};

export default SuperNovaCard;
