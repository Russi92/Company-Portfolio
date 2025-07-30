

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const VideoTiktok = () => {
  const [videos, setVideos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('https://theway4business.27lashabab.com/api/tiktok-videos');
        setVideos([...res.data].reverse());
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const openModal = (videoId) => {
    setCurrentVideoId(videoId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentVideoId('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <h2 className="text-center text-4xl md:text-5xl font-extrabold text-white-300 drop-shadow-lg mb-6 tracking-wide">TikTok Reels</h2>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        centeredSlides
        className="w-full max-w-6xl"
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {videos.map((video) => (
          <SwiperSlide key={video.id} className="flex justify-center" style={{color:"white"}}>
            <div
              className="w-[300px] h-[530px] bg-black rounded-xl overflow-hidden shadow-lg relative cursor-pointer"
              onClick={() => openModal(extractVideoId(video.video_link))}
            >
              <img
                src={video.thumbnail_url}
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-2xl font-bold">
                ▶️
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="TikTok Video"
        className="bg-black rounded-xl overflow-hidden max-w-[400px] mx-auto my-10 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      >
        <iframe
          src={`https://www.tiktok.com/embed/v2/${currentVideoId}?autoplay=1`}
          width="100%"
          height="600px"
          allow="encrypted-media"
          allowFullScreen
          className="border-none"
        ></iframe>
      </Modal>
    </div>
  );
};

function extractVideoId(link) {
  const match = link.match(/video\/(\d+)/);
  return match ? match[1] : '';
}

export default VideoTiktok;
