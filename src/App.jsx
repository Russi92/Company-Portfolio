import './index.css';
import Navbar from './component/Navbar';
import { BrowserRouter ,Route, Routes } from 'react-router-dom';
import Home from './component/Home';


function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
