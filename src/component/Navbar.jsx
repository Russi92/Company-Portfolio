


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import logoLocal from "../assets/logo.png";
// import Tiktok from "../assets/social/Tiktok.png";
// import fb from "../assets/social/fb.png";
// import twi from "../assets/social/twi.png";
// import insta from "../assets/social/insta.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [socialLinks, setSocialLinks] = useState({});
//   const [logoUrl, setLogoUrl] = useState(logoLocal);

//   useEffect(() => {
//     fetch("https://theway4business.27lashabab.com/api/settings")
//       .then((res) => res.json())
//       .then((data) => {
//         const d = data.data;
//         setSocialLinks({
//           tiktok: d.tiktok_link,
//           facebook: d.facebook_link,
//           twitter: d.twitter_link,
//           instagram: d.instagram_link,
//         });
//         setLogoUrl(d.logo_url || logoLocal);
//       })
//       .catch((err) => console.error("Error fetching settings:", err));
//   }, []);

//   return (
//     <nav
//       className="text-white px-6 py-4 shadow-md w-full fixed top-0 z-40"
//       style={{
//         background: `linear-gradient(to right, #003A3A 0%, #004949 8%, #007171 23%)`,
//       }}
//     >
//       <div className="container mx-auto flex items-center justify-between">
//         {/* Logo */}
//         <div className="flex items-center gap-2">
//           <Link to="/" >
//           <img src={logoUrl} alt="Logo" className="h-10 w-auto" />
//           </Link>
//         </div>

//         {/* Desktop Links */}
//         <div className="hidden md:flex gap-20 text-lg p-3 rounded-lg" style={{
//         background: `linear-gradient(
//           90deg,
//           #003A3A 0%,
//           #004949 8%,
//           #007171 23%,
//           #00B2B1 44%,
//           #00CCCB 52%,
//           #00B4DF 80%,
//           #009FF3 100%
//         )`
//       }}>
//           <Link to="/" className="hover:underline ms-2">Home</Link>
//           <Link to="/gallery" className="hover:underline">Gallery</Link>
//           <Link to="/blogs" className="hover:underline">Blogs</Link>
//           <Link to="/services" className="hover:underline">Services</Link>

//           <div className="flex items-center">
//             <Link to={socialLinks.tiktok || "#"} target="_blank">
//               <img src={Tiktok} alt="tiktok" />
//             </Link>
//             <Link to={socialLinks.facebook || "#"} target="_blank" className="ms-8">
//               <img src={fb} alt="facebook" />
//             </Link>
//             <Link to={socialLinks.twitter || "#"} target="_blank" className="ms-8">
//               <img src={twi} alt="twitter" />
//             </Link>
//             <Link to={socialLinks.instagram || "#"} target="_blank" className="ms-8">
//               <img src={insta} alt="instagram" />
//             </Link>
//           </div>
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
//           <Link to="/" onClick={() => setIsOpen(false)} className="hover:underline">Home</Link>
//           <Link to="/gallery" onClick={() => setIsOpen(false)} className="hover:underline">Gallery</Link>
//           <Link to="/blogs" onClick={() => setIsOpen(false)} className="hover:underline">Blogs</Link>
//           <Link to="/services" onClick={() => setIsOpen(false)} className="hover:underline">Services</Link>

//           <div className="flex items-center">
//             <Link to={socialLinks.tiktok || "#"} target="_blank">
//               <img src={Tiktok} alt="tiktok" />
//             </Link>
//             <Link to={socialLinks.facebook || "#"} target="_blank" className="ms-2">
//               <img src={fb} alt="facebook" />
//             </Link>
//             <Link to={socialLinks.twitter || "#"} target="_blank" className="ms-2">
//               <img src={twi} alt="twitter" />
//             </Link>
//             <Link to={socialLinks.instagram || "#"} target="_blank" className="ms-2">
//               <img src={insta} alt="instagram" />
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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
          <NavLink to="/">
            <img src={logoUrl} alt="Logo" className="h-10 w-auto" />
          </NavLink>
        </div>

        {/* Desktop Links */}
        <div
          className="hidden md:flex gap-20 text-lg p-3 rounded-lg"
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
            )`,
          }}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-white text-black p-1 rounded font-bold"
                : "hover:underline ms-2"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              isActive
                ? "bg-white text-black p-1 rounded font-bold"
                : "hover:underline"
            }
          >
            Gallery
          </NavLink>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              isActive
                ? "bg-white text-black p-1 rounded font-bold"
                : "hover:underline"
            }
          >
            Blogs
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive
                ? "bg-white text-black p-1 rounded font-bold"
                : "hover:underline"
            }
          >
            Services
          </NavLink>

          <div className="flex items-center">
            <a href={socialLinks.tiktok || "#"} target="_blank" rel="noopener noreferrer">
              <img src={Tiktok} alt="tiktok" />
            </a>
            <a
              href={socialLinks.facebook || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="ms-8"
            >
              <img src={fb} alt="facebook" />
            </a>
            <a
              href={socialLinks.twitter || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="ms-8"
            >
              <img src={twi} alt="twitter" />
            </a>
            <a
              href={socialLinks.instagram || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="ms-8"
            >
              <img src={insta} alt="instagram" />
            </a>
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
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "bg-white text-black px-2 py-1 rounded w-fit font-bold"
                : "hover:underline"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/gallery"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "bg-white text-black px-2 py-1 rounded w-fit font-bold"
                : "hover:underline"
            }
          >
            Gallery
          </NavLink>
          <NavLink
            to="/blogs"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "bg-white text-black px-2 py-1 rounded w-fit font-bold"
                : "hover:underline"
            }
          >
            Blogs
          </NavLink>
          <NavLink
            to="/services"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "bg-white text-black px-2 py-1 rounded w-fit font-bold"
                : "hover:underline"
            }
          >
            Services
          </NavLink>

          <div className="flex items-center">
            <a href={socialLinks.tiktok || "#"} target="_blank" rel="noopener noreferrer">
              <img src={Tiktok} alt="tiktok" />
            </a>
            <a
              href={socialLinks.facebook || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="ms-2"
            >
              <img src={fb} alt="facebook" />
            </a>
            <a
              href={socialLinks.twitter || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="ms-2"
            >
              <img src={twi} alt="twitter" />
            </a>
            <a
              href={socialLinks.instagram || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="ms-2"
            >
              <img src={insta} alt="instagram" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
