import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import logo from '../../assets/images/logo-1.svg'
import { useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useGetUserByEmailQuery } from "@/redux/features/users/usersMangementApi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useAppSelector(selectCurrentUser);
  const { data: userData } = useGetUserByEmailQuery(user?.email);
  return (
    <div className="fixed w-full  bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              width="150"
              height="150"
            />
          </Link>

          <div className="flex gap-8">
            <div>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-rose-500 font-bold" : "font-bold text-black"
                }
                to="/"
              >
                Home
              </NavLink>
            </div>
            <div>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-rose-500 font-bold" : "font-bold text-black"
                }
                to="/books"
              >
                Books
              </NavLink>
            </div>
            <div>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-rose-500 font-bold" : "font-bold text-black"
                }
                to="/contact"
              >
                Contact
              </NavLink>
            </div>
          </div>

          {/* Right Side User Menu or Login */}
          <div className="relative">
            {user ? (
              <>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-1 border-[1px] border-neutral-200 rounded-full cursor-pointer hover:shadow-md transition"
                >
                  <img
                    src={userData?.data?.photo || "https://i.pravatar.cc/40"} // fallback avatar
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>

                {isOpen && (
                  <div className="absolute right-0 top-12 w-40 bg-white rounded-xl shadow-md text-sm">
                    <div className="flex flex-col cursor-pointer">
                      <Link
                        to="/dashboard"
                        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => dispatch(logout())}
                        className="px-4 py-3 text-left hover:bg-neutral-100 transition font-semibold"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 bg-rose-500 text-white rounded-full font-semibold hover:bg-rose-600 transition"
              >
                Login
              </Link>
            )}
          </div>


        </div>
      </div>
    </div>
  );
};

export default Navbar;
