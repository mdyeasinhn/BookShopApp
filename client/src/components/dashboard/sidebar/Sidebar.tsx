import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'

import { AiOutlineBars } from 'react-icons/ai'
import {  BsGraphUp } from 'react-icons/bs'
import { NavLink, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import logo from '../../../assets/images/logo-1.svg'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/redux/hooks'
import { useGetUserByEmailQuery } from '@/redux/features/users/usersMangementApi'
import { selectCurrentUser } from '@/redux/features/auth/authSlice'
import AdminMenu from './menu/AdminMenu'
import UserMenu from './menu/UserMenu'
const Sidebar = () => {
    const [isActive, setActive] = useState(false);
    const [toggle, setToggle] = useState(true);
    // const dispatch = useDispatch();
    const user = useAppSelector(selectCurrentUser);
    // const navigate = useNavigate();


    const { data: userData } = useGetUserByEmailQuery(user?.email);
    // console.log("user data-->",userData)

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }

  const toggleHandler = (e) => {
    console.log(e.target.checked);
    setToggle(e.target.checked)
  }
  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
              <img
                // className='hidden md:block'
                src={logo}
                alt='logo'
                width='150'
                height='150'
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto'>
              <Link to='/'>
                <img
                  // className='hidden md:block'
                  src={logo}
                  alt='logo'
                  width='150'
                  height='150'
                />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {/* Statistics */}
              <NavLink
                to='statistics'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                <BsGraphUp className='w-5 h-5' />

                <span className='mx-4 font-medium'>Statistics</span>
              </NavLink>

             
          {userData?.data?.role === "admin" && <AdminMenu closeSidebar={handleToggle}/>}
          {userData?.data?.role === "user" && <UserMenu closeSidebar={handleToggle}/>}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <NavLink
            to='/dashboard/profile'
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
              }`
            }
          >
            <FcSettings className='w-5 h-5' />

            <span className='mx-4 font-medium'>Profile</span>
          </NavLink>
          <button
           
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar