import React from 'react';
import { Link } from 'react-router-dom';
import StayNestLogo from '../assets/Logos/staynest_final.png'
import { FaHome,  FaRegUser} from "react-icons/fa";
import { PiBuildingsBold } from "react-icons/pi";
import { GrTransaction } from "react-icons/gr";

// Sidebar component
const Sidebar = () => {
  return (
    <>
      <div className='h-screen bg-white w-[320px] px-8 py-8'>
        <div className='Logo w-[140px] bg-white'>
          <img className= "bg-transparent" src={StayNestLogo} alt="" />
        </div>
        <hr className='mt-5' />

        <div className=' h-[600px] flex flex-col justify-between bg-inherit'>
        <nav className="justify-between mt-4 tracking-tighter">
        <ul>
          <h3 className='text-sm text-grey-400 bg-white'>Main</h3>

          <li className="bg-white">
            <Link to="/" className="py-2 px-4 flex gap-2 items-center bg-white rounded-xl hover:bg-teal-100 hover:text-primary transition-colors duration-200">
              <FaHome className="text-xl bg-transparent" /> Dashboard
            </Link>
          </li>

          <li className="bg-white">
            <Link to="properties" className="py-2 px-4 flex gap-2 items-center bg-white rounded-xl hover:bg-teal-100 hover:text-primary transition-colors duration-200">
              <PiBuildingsBold className="text-xl bg-transparent" /> Properties
            </Link>
          </li>

          <li className="bg-white">
            <Link to="clients" className="py-2 px-4 flex gap-2 items-center bg-white rounded-xl hover:bg-teal-100 hover:text-primary transition-colors duration-200">
              <FaRegUser className="text-xl bg-transparent" /> Clients
            </Link>
          </li>

          <li className="bg-white">
            <Link to="transactions" className="py-2 px-4 flex gap-2 items-center bg-white rounded-xl hover:bg-teal-100 hover:text-primary transition-colors duration-200">
              <GrTransaction className="text-xl bg-transparent" /> Transactions
            </Link>
          </li>
        </ul>
      </nav>


      <div className='flex gap-2  bg-white'>
        <div className='w-10 h-10 bg-black rounded-[50%]'></div>
        <div>
          <h2 className='bg-white text-md'>Sachin Maharjan</h2>
          <p className='bg-white text-sm text-gray-500'>sachinmhzn123@gmail.com</p>
        </div>
      </div>
      </div>

      </div>
      
    </>
  );
};

export default Sidebar;
