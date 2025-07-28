import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Partners = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await axios.get('https://theway4business.27lashabab.com/api/partners');
        setPartners(res.data.data);
      } catch (err) {
        console.error('Error fetching partners:', err);
      }
    };

    fetchPartners();
  }, []);

  return (
    <>
        <h2 className='text-center text-4xl md:text-5xl font-extrabold text-white-300 drop-shadow-lg mb-6 tracking-wide'>Partners</h2>
        <div className="py-10 px-4" style={{ background: '#003A3A' }}>


        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6">
            {partners.map((partner) => (
            <div key={partner.id} className="flex justify-center items-center w-36 h-20">
                <img
                src={partner.image_url}
                alt={partner.name}
                className="h-20 object-contain transition-transform hover:scale-105 duration-300"
                />
            </div>
            ))}
        </div>
        </div>
    </>
  );
};

export default Partners;
