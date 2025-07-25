// import React from 'react'
// import logo from '../assets/logo.png'
// import { Link } from 'react-router-dom'

// const Navbar = () => {
//   return (
//     <>
//         <div >
//             <nav
//                 className="text-white px-6 py-4 shadow-md flex w-full"
//                 style={{
//                     background: `linear-gradient(to right, #003A3A 0%, #004949 8%, #007171 23%)`,
//                 }}>

//             <div>

//                 <div>
//                     <img src={logo} alt="" />
//                 </div>

//                 <div>
//                     <div>
//                         <Link to='/'>Home</Link>
//                         <Link>Gallery</Link>
//                         <Link>Blogs</Link>
//                         <Link>Service</Link>
//                     </div>
//                 </div>

//             </div>
//         </nav>
//         </div>
//     </>
//   )
// }

// export default Navbar;






// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import logo from "../assets/logo.png";
// import Tiktok from "../assets/social/Tiktok.png"
// import fb from "../assets/social/fb.png"
// import twi from "../assets/social/twi.png"
// import insta from "../assets/social/insta.png"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav
//       className="text-white px-6 py-4 shadow-md w-full fixed top-0"
//       style={{
//         background: `linear-gradient(to right, #003A3A 0%, #004949 8%, #007171 23%)`,
//       }}
//     >
//       <div className="container mx-auto flex items-center justify-between">
//         {/* Logo */}
//         <div className="flex items-center gap-2">
//           <img src={logo} alt="Logo" className="h-10 w-auto" />
//         </div>

//         {/* Desktop Links */}
//         <div className="hidden md:flex gap-20 text-lg">
//           <Link to="/" className="hover:underline ms-2">
//             Home
//           </Link>
//           <Link to="/gallery" className="hover:underline">
//             Gallery
//           </Link>
//           <Link to="/blogs" className="hover:underline">
//             Blogs
//           </Link>
//           <Link to="/services" className="hover:underline">
//             Services
//           </Link>

//           <div className="flex items-center">
//                 <Link>
//                     <img src={Tiktok} alt="tiktok" />
//                 </Link>
//                 <Link className="ms-8">
//                     <img src={fb} alt="tiktok" />
//                 </Link>
//                 <Link className="ms-8">
//                     <img src={twi} alt="tiktok" />
//                 </Link>
//                 <Link className="ms-8">
//                     <img src={insta} alt="tiktok" />
//                 </Link>
//             </div>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden">
//           <button onClick={() => setIsOpen(!isOpen)}>
//             <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
//           </button>
//         </div>
//       </div>

//       {/* Mobile Links */}
//       {isOpen && (
//         <div className="md:hidden mt-4 flex flex-col gap-3 text-lg px-4">
//           <Link to="/" onClick={() => setIsOpen(false)} className="hover:underline">
//             Home
//           </Link>
//           <Link to="/gallery" onClick={() => setIsOpen(false)} className="hover:underline">
//             Gallery
//           </Link>
//           <Link to="/blogs" onClick={() => setIsOpen(false)} className="hover:underline">
//             Blogs
//           </Link>
//           <Link to="/services" onClick={() => setIsOpen(false)} className="hover:underline">
//             Services
//           </Link>

//             <div className="flex items-center">
//                 <Link>
//                     <img src={Tiktok} alt="tiktok" />
//                 </Link>
//                 <Link className="ms-2">
//                     <img src={fb} alt="tiktok" />
//                 </Link>
//                 <Link className="ms-2">
//                     <img src={twi} alt="tiktok" />
//                 </Link>
//                 <Link className="ms-2">
//                     <img src={insta} alt="tiktok" />
//                 </Link>
//             </div>

//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;







import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoLocal from "../assets/logo.png";
import Tiktok from "../assets/social/Tiktok.png";
import fb from "../assets/social/fb.png";
import twi from "../assets/social/twi.png";
import insta from "../assets/social/insta.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState({});
  const [logoUrl, setLogoUrl] = useState(logoLocal);

  useEffect(() => {
    fetch("https://theway4business.27lashabab.com/api/settings")
      .then((res) => res.json())
      .then((data) => {
        const d = data.data;
        setSocialLinks({
          tiktok: d.tiktok_link,
          facebook: d.facebook_link,
          twitter: d.twitter_link,
          instagram: d.instagram_link,
        });
        setLogoUrl(d.logo_url || logoLocal);
      })
      .catch((err) => console.error("Error fetching settings:", err));
  }, []);

  return (
    <nav
      className="text-white px-6 py-4 shadow-md w-full fixed top-0 z-40"
      style={{
        background: `linear-gradient(to right, #003A3A 0%, #004949 8%, #007171 23%)`,
      }}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logoUrl} alt="Logo" className="h-10 w-auto" />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-20 text-lg">
          <Link to="/" className="hover:underline ms-2">Home</Link>
          <Link to="/gallery" className="hover:underline">Gallery</Link>
          <Link to="/blogs" className="hover:underline">Blogs</Link>
          <Link to="/services" className="hover:underline">Services</Link>

          <div className="flex items-center">
            <Link to={socialLinks.tiktok || "#"} target="_blank">
              <img src={Tiktok} alt="tiktok" />
            </Link>
            <Link to={socialLinks.facebook || "#"} target="_blank" className="ms-8">
              <img src={fb} alt="facebook" />
            </Link>
            <Link to={socialLinks.twitter || "#"} target="_blank" className="ms-8">
              <img src={twi} alt="twitter" />
            </Link>
            <Link to={socialLinks.instagram || "#"} target="_blank" className="ms-8">
              <img src={insta} alt="instagram" />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 text-lg px-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:underline">Home</Link>
          <Link to="/gallery" onClick={() => setIsOpen(false)} className="hover:underline">Gallery</Link>
          <Link to="/blogs" onClick={() => setIsOpen(false)} className="hover:underline">Blogs</Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className="hover:underline">Services</Link>

          <div className="flex items-center">
            <Link to={socialLinks.tiktok || "#"} target="_blank">
              <img src={Tiktok} alt="tiktok" />
            </Link>
            <Link to={socialLinks.facebook || "#"} target="_blank" className="ms-2">
              <img src={fb} alt="facebook" />
            </Link>
            <Link to={socialLinks.twitter || "#"} target="_blank" className="ms-2">
              <img src={twi} alt="twitter" />
            </Link>
            <Link to={socialLinks.instagram || "#"} target="_blank" className="ms-2">
              <img src={insta} alt="instagram" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

