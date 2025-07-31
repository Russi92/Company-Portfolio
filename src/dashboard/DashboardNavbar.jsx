import logo from '../assets/logo.png';


const DashboardNavbar = () => {
    return (
      <div className="h-16 bg-gray-800 shadow-lg px-6 ">

        <div className="text-white flex justify-end pt-2"> <img className='w-10' src={logo} alt="" /></div>
      </div>
    )
  }
  
  export default DashboardNavbar
  