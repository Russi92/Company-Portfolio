import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom arrows for the slider
const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-2 z-10 transform -translate-y-1/2 cursor-pointer text-white bg-black/50 p-2 rounded-full"
    onClick={onClick}
  >
    <FaArrowLeft />
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-2 z-10 transform -translate-y-1/2 cursor-pointer text-white bg-black/50 p-2 rounded-full"
    onClick={onClick}
  >
    <FaArrowRight />
  </div>
);

// Slider configuration
const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 3000,
  arrows: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
};

const SuperNovaPacks = () => {
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch('/api/packages', {
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!res.ok) throw new Error("Failed to fetch packages");
        const data = await res.json();
        setPackages(data.data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };

    fetchPackages();
  }, []);

  return (
    <>
    <h1 className="text-center text-4xl md:text-5xl font-extrabold text-white-300 drop-shadow-lg mb-6 tracking-wide">
        SUPER NOVA PACKS
      </h1>
    
    
    <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {error && <p className="text-red-600 col-span-full">{error}</p>}
    
      {packages.map((item) => {
        let allImages = [item.main_image_url];
        try {
          const parsed = JSON.parse(item.images.replace(/\\/g, ""));
          allImages = [item.main_image_url, ...parsed.map(img => `https://theway4business.27lashabab.com/${img}`)];
        } catch {
          // Fallback if image JSON is invalid
        }

        

        return (
           
            
          <div
            key={item.id}
            className="rounded-xl shadow-md overflow-hidden p-4 group relative border-solid border-2"
          >
            <Slider {...sliderSettings}>
              {allImages.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`Package ${item.id} - ${index}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fallback.jpg";
                  }}
                  className="w-full h-52 object-contain rounded-xl"
                />
              ))}
            </Slider>

            <h2 className="text-xl font-bold mt-4 mb-2 text-white text-center">{item.title}</h2>
            <p className="text-sm text-white mb-2 text-center">{item.short_description}</p>
            <p className="text-sm text-white mb-2 text-center"> {item.full_description}</p>
            <div className='flex items-center justify-between'>
            <button className='border-solid border-2 px-7 py-2 rounded-md'>Button</button>
            <p className="text-lg font-semibold text-white ">Price: {item.price} AED</p>
            </div>
          </div>
            

        );
      })}
    </div>

</>

  );
};

export default SuperNovaPacks;
