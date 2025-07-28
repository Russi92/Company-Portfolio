// import './index.css';
// import Navbar from './component/Navbar';
// import { BrowserRouter ,Route, Routes } from 'react-router-dom';
// import Home from './component/Home';
// import Footer from './component/Footer';
// import Login from './dashboard/Login';
// import DashboardLayout from './dashboard/DashboardLayout'
// import DashboardHome from './dashboard/DashboardHome';
// import DashboardNavbar from './dashboard/DashboardNavbar';



// function App() {

//   return (
//     <>
    
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path='/' element={<Home />}/>
//         <Route path='/login' element={<Login />}/>
//         <Route path="/dashboard" element={
//           <DashboardLayout>
//             <DashboardNavbar />
//             <DashboardHome />
//           </DashboardLayout>
//         } />
//       </Routes>
//       <Footer />
//     </BrowserRouter>
//     </>
//   )
// }

// export default App;








// import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// import Navbar from './component/Navbar';
// import Footer from './component/Footer';
// import Home from './component/Home';
// import Login from './dashboard/Login';
// import DashboardLayout from './dashboard/DashboardLayout';
// import DashboardHome from './dashboard/DashboardHome';

// function AppContent() {
//   const location = useLocation();
//   const isDashboardRoute = location.pathname.startsWith('/dashboard');

//   return (
//     <>
//       {!isDashboardRoute && <Navbar />}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/dashboard"
//           element={
//             <DashboardLayout>
//               <DashboardHome />
//             </DashboardLayout>
//           }
//         />
//       </Routes>
//       {!isDashboardRoute && <Footer />}
//     </>
//   );
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <AppContent />
//     </BrowserRouter>
//   );
// }

// export default App;





import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Home from './component/Home';
import Login from './dashboard/Login';
import DashboardLayout from './dashboard/DashboardLayout';
import DashboardHome from './dashboard/DashboardHome';
import DashboardUsers from './dashboard/DashboardUsers';
import DashboardGallery from './dashboard/DashboardGallery';
import DashboardBlogs from './dashboard/DashboardBlogs';
import DashboardServices from './dashboard/dashboardServices';

function AppContent() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboardRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard Layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="home" element={<DashboardHome />} />
          <Route path="users" element={<DashboardUsers />} />
          <Route path='gallery' element={<DashboardGallery />}/>
          <Route path='blogs' element={<DashboardBlogs />}/>
          <Route path='services' element={<DashboardServices />}/>
        </Route>
      </Routes>
      {!isDashboardRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;


