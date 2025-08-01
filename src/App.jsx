

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Home from './component/Home';
import Login from './dashboard/Login';
import DashboardLayout from './dashboard/DashboardLayout';
import DashboardHome from './dashboard/DashboardHome';
import DashboardUsers from './dashboard/DashboardUsers';
import DashboardGallery from './dashboard/DashboardGallery';
import DashboardBlogs from './dashboard/DashboardBlogs';
import DashboardServices from './dashboard/DashboardServices';
import SuperNovaPacks from './dashboard/SuperNovaPacks';
import SuperTitle from './dashboard/SuperTitle';
import TikTokReels from './dashboard/TikTokReels';
import SuperNovaImages from './dashboard/SuperNovaImages';
import SuperNovaCards from './dashboard/SuperNovaCards';
import TestImonials from './dashboard/TestImonials';
import Subscribe from './dashboard/Subscribe';
import Faqs from './dashboard/Faqs';
import Partners from './dashboard/Partners';
import Gallery from './component/Gallery/Gallery';
import Blogs from './component/Blogs/Blogs'



function AppContent() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboardRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/gallery' element={<Gallery />}/>
        <Route path='/blogs' element={<Blogs />}/>
     

        {/* Dashboard Layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* <Route path="home" element={<DashboardHome />} /> */}
          <Route path="users" element={<DashboardUsers />} />
          <Route path='gallery' element={<DashboardGallery />}/>
          <Route path='blogs' element={<DashboardBlogs />}/>
          <Route path='services' element={<DashboardServices />}/>
          <Route path='Super-Nova-Packs' element={<SuperNovaPacks />}/>
          <Route path='Super-Title' element={<SuperTitle />}/>
          <Route path='TikTok-Reels' element={<TikTokReels />}/>
          <Route path='Super-Nova-Images' element={<SuperNovaImages />}/>
          <Route path='Super-Nova-Cards' element={<SuperNovaCards />}/>
          <Route path='TestImonials' element={<TestImonials />}/>
          <Route path='Subscribe' element={<Subscribe />}/>
          <Route path='Faqs' element={<Faqs />}/>
          <Route path='Partners' element={<Partners />}/> 
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


