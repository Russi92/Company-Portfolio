import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SuperTitle = () => {

  const [description, setDescription] = useState('');

  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchSuperTitle = async () => {
      try {
        const res = await axios.get('https://theway4business.27lashabab.com/api/super-title');
        const data = res.data;

        setDescription(data.data.description);
        setImages(data.image_urls);
      } catch (error) {
        console.error("Error fetching Super Title:", error);
      }
    };

    fetchSuperTitle();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 mt-20">

        <div className='flex flex-row-reverse'>

            <div>

                <div
                className="shadow-lg relative h-[50px] w-[400px] m-auto"
                style={{
                    background: `linear-gradient(
                    to right,
                    #007171 19%,
                    #00B2B1 46%,
                    #00CCCB 62%,
                    #00B4DF 85%,
                    #009FF3 100%
                    )`,
                }}
                >
                    <div className="text-7xl font-bold absolute inset-0 flex justify-center items-center text-white bottom-20">
                        Super Title
                    </div>
                    
                    </div>

                
                <p className="text-white mb-6 ms-5">{description}</p>

                <div className="text-white mb-6 ms-5 flex items-center justify-between">

                    <div>

                    <div className='text-xs ms-2'>STARTING FROM</div>
                    <div className='font-bold text-2xl'>2000 AED</div>

                    </div>

                    <div className='border-solid border-white border-2 py-2 px-7 rounded-md shadow-lg cursor-pointer'>
                        Button
                    </div>

                </div>

            </div>

                <div className="px-4 sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`super-img-${index}`}
                            className="rounded-lg shadow-md object-cover w-96 h-60"
                        />
                        ))}
                    </div>

                </div>

      </div>

    </div>
  );
};

export default SuperTitle;
