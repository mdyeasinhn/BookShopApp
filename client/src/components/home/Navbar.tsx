import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import logo from '../../assets/images/logo-1.svg'
import { useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useAppSelector(selectCurrentUser);
  console.log("user", user)
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

          {/* Dropdown Menu */}
          <div className="relative">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="p-4 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
            >
              <AiOutlineMenu />
            </div>

            {isOpen && (
              <div className="absolute right-0 top-12 w-40 bg-white rounded-xl shadow-md text-sm">
                <div className="flex flex-col cursor-pointer">
                  {user && (
                    <Link
                      to="/dashboard"
                      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Dashboard
                    </Link>
                  )}
                  {user ? (
                    <button
                    onClick={() => dispatch(logout())}
                      className="px-4 py-3 text-left hover:bg-neutral-100 transition font-semibold"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
