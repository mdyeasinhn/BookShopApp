import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, User, LogOut, ChevronDown, Bell } from "lucide-react";
import { Button } from "../ui/button";
import logo from '../../assets/images/logo-1.svg';
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
  const dispatch = useDispatch();
  const user = useAppSelector(selectCurrentUser);

  // fetch user data
  const { data: userData } = useGetUserByEmailQuery(user?.email);
  console.log("profile",userData)

  // Filter navItems based on user login status
  const filteredNavItems = user
    ? [...navItems]
    : navItems;

  return (
    <nav className="relative bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="logo" className="w-auto h-6 sm:h-7" />
            </Link>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "opacity-0 -translate-x-full lg:translate-x-0 lg:opacity-100"
            }`}
          >
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
              {filteredNavItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `px-3 py-2 mx-3 mt-2 transition-colors duration-300 transform rounded-xl lg:mt-0 ${
                      isActive
                        ? "text-rose-500 dark:text-rose-400 bg-gray-100 dark:bg-gray-700"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center mt-4 lg:mt-0">
              {user && (
                <button className="hidden mx-4 text-gray-600 transition-colors duration-300 transform lg:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none">
                  <Bell className="w-6 h-6" />
                </button>
              )}

              {user ? (
                <div className="relative">
                  <button
                    type="button"
                    className="flex items-center focus:outline-none"
                    aria-label="toggle profile dropdown"
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
                    <div className="absolute right-0 z-30 w-48 mt-2 origin-top-right bg-white rounded-xl shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Link
                          to="/dashboard/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                          onClick={() => {
                            setIsProfileOpen(false);
                            setIsOpen(false);
                          }}
                        >
                          Your Profile
                        </Link>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                          onClick={() => {
                            setIsProfileOpen(false);
                            setIsOpen(false);
                          }}
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            dispatch(logout());
                            setIsProfileOpen(false);
                            setIsOpen(false);
                          }}
                          className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <Button className="relative overflow-hidden px-3 py-2 rounded-xl font-semibold text-white shadow-md transition-all duration-300 bg-gradient-to-r from-rose-500 to-rose-500 hover:scale-105 hover:shadow-rose-500/50 hover:shadow-lg">
                    <div className="relative flex items-center space-x-2">
                      <User className="h-5 w-5 text-white" />
                      <span>Login</span>
                    </div>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;