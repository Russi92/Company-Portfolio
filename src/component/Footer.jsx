

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFacebookF, FaTwitter, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('https://theway4business.27lashabab.com/api/settings');
        setSettings(res.data.data);
      } catch (error) {
        console.error('Error fetching footer settings:', error);
      }
    };

    fetchSettings();
  }, []);

  if (!settings) return null;

  return (
    <footer
      className="text-white py-5 px-4"
      style={{
        background: `linear-gradient(
          90deg,
          #003A3A 0%,
          #004949 8%,
          #007171 23%,
          #00B2B1 44%,
          #00CCCB 52%,
          #00B4DF 80%,
          #009FF3 100%
        )`
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img src={settings.logo_url} alt="Logo" className="w-16 h-16 object-contain" />
          <div className="text-lg">Phone: 01553936668</div>
        </div>

        {/* Social Links */}
        <div className="flex gap-5 text-2xl">
          <a href={settings.facebook_link} target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="hover:scale-110 transition" />
          </a>
          <a href={settings.twitter_link} target="_blank" rel="noopener noreferrer">
            <FaTwitter className="hover:scale-110 transition" />
          </a>
          <a href={settings.instagram_link} target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:scale-110 transition" />
          </a>
          <a href={settings.tiktok_link} target="_blank" rel="noopener noreferrer">
            <FaTiktok className="hover:scale-110 transition" />
          </a>
          <a href={settings.youtube_link} target="_blank" rel="noopener noreferrer">
            <FaYoutube className="hover:scale-110 transition" />
          </a>
        </div>
      </div>

      <div className="text-center mt-8 text-sm font-bold text-black">
        &copy; {new Date().getFullYear()} Made By Mohamed Hassan Web Developer. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
