import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, User, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import logo from "../../assets/images/logo-1.svg";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUserByEmailQuery } from "@/redux/features/users/usersMangementApi";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Books", href: "/books" },
  { name: "Contact", href: "/contact" },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const user = useAppSelector(selectCurrentUser);

  // fetch user data
  const { data: userData } = useGetUserByEmailQuery(user?.email);

  // close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter navItems based on user login status
  const filteredNavItems = user ? [...navItems] : navItems;

  return (
    <nav className="bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Left - Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="logo" className="w-auto h-6 sm:h-7" />
          </Link>

          {/* Right side - Navigation items, Profile and Menu */}
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation - Shown on lg screens and up */}
            <div className="hidden lg:flex items-center space-x-6">
              {filteredNavItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `px-3 py-2 text-gray-700 dark:text-gray-200 rounded-xl ${
                      isActive
                        ? "text-rose-500 dark:text-rose-400 bg-gray-100 dark:bg-gray-700"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Profile - Always visible */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  type="button"
                  className="flex items-center focus:outline-none"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                    {userData?.data?.photo ? (
                      <img
                        src={userData?.data?.photo}
                        className="object-cover w-full h-full"
                        alt="avatar"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-600">
                        <User className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                      </div>
                    )}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Profile dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <Link
                        to="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          dispatch(logout());
                          setIsProfileOpen(false);
                        }}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button className="px-3 py-2 rounded-xl font-semibold text-white shadow-md bg-gradient-to-r from-rose-500 to-rose-500 hover:scale-105 hover:shadow-lg hover:shadow-rose-500/50 transition-all">
                  <User className="h-5 w-5 mr-1" />
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu items (appears below) */}
        <div
          className={`lg:hidden ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="pt-2 pb-3 space-y-1">
            {filteredNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `block px-3 py-2 text-gray-700 dark:text-gray-200 rounded-xl ${
                    isActive
                      ? "text-rose-500 dark:text-rose-400 bg-gray-100 dark:bg-gray-700"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;