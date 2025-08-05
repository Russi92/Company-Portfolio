
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'tailwindcss/tailwind.css';
// import { Link } from 'react-router-dom';

// const SuperService = () => {
//   // Define state variables to store services, loading status, and any errors
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to fetch services from the API
//   const fetchServices = async () => {
//     try {
//       // Make the GET request to the API endpoint
//       const response = await axios.get('https://theway4business.27lashabab.com/api/services');
//       // Set the services data from the response
//       setServices(response.data);
//     } catch (err) {
//       // Handle any errors during the fetch
//       console.error("Error fetching services:", err);
//       setError('❌ حدث خطأ أثناء جلب الخدمات. يرجى المحاولة مرة أخرى.');
//     } finally {
//       // Set loading to false once the request is complete (success or failure)
//       setLoading(false);
//     }
//   };

//   // Use useEffect to call the fetchServices function when the component mounts
//   useEffect(() => {
//     fetchServices();
//   }, []); // The empty dependency array ensures this effect runs only once

//   return (
//     <div className="container mx-auto p-6 min-h-screen">

      
//       {/* Conditional rendering based on loading and error states */}
//       {loading ? (
//         <div className="text-center text-white text-lg">
//           <i className="fas fa-spinner fa-spin mr-2"></i>
//           <span>Loading...</span>
//         </div>
//       ) : error ? (
//         <div className="text-center text-red-500 text-lg">
//           {error}
//         </div>
//       ) : services.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {services.map((service) => (
//             <Link 
//               key={service.id} 
//               className="rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
//             >
//               {/* Display the main image or a placeholder if not available */}
//               {service.main_image_url ? (
//                 <img
//                   src={service.main_image_url}
//                   alt={service.title}
//                   className="w-full h-56 object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-56 flex items-center justify-center text-gray-400">
//                   <i className="fas fa-image fa-2x"></i>
//                 </div>
//               )}
              
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
//                 <p className="text-white text-sm mb-4">{service.description}</p>
//                 <div className="flex items-center justify-between text-white">
//                   <span className="font-bold text-lg">
//                     {service.price !== "0.00" ? `${service.price} AED` : 'Free'}
//                   </span>
//                   <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
//                     Button
//                   </button>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center text-white text-lg">
//           <p>Not Available Services Right Now</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SuperService;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';

const SuperService = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    try {
      const response = await axios.get('https://theway4business.27lashabab.com/api/services');
      setServices(response.data);
    } catch (err) {
      console.error("Error fetching services:", err);
      setError('❌ حدث خطأ أثناء جلب الخدمات. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="container mx-auto p-6 min-h-screen">
      {loading ? (
        <div className="text-center text-white text-lg">
          <i className="fas fa-spinner fa-spin mr-2"></i>
          <span>Loading...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 text-lg">{error}</div>
      ) : services.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link 
              to={`/services/${service.id}`}
              key={service.id} 
              className="rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              {service.main_image_url ? (
                <img
                  src={service.main_image_url}
                  alt={service.title}
                  className="w-full h-56 object-cover"
                />
              ) : (
                <div className="w-full h-56 flex items-center justify-center text-gray-400">
                  <i className="fas fa-image fa-2x"></i>
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-white text-sm mb-4">{service.description}</p>
                <div className="flex items-center justify-between text-white">
                  <span className="font-bold text-lg">
                    {service.price !== "0.00" ? `${service.price} AED` : 'Free'}
                  </span>
                  <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">
                    التفاصيل
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center text-white text-lg">
          <p>لا توجد خدمات متاحة حالياً</p>
        </div>
      )}
    </div>
  );
};

export default SuperService;
