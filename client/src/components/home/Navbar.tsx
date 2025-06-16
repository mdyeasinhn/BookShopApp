import { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaUser,
  FaCog,
  FaBook,
  FaHome,
  FaPhone,
  FaInfoCircle,
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaGraduationCap,
  FaFlask,
  FaBolt,
  FaGlobe,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import logo from '../../assets/images/logo-1.svg'
import { useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUserByEmailQuery } from "@/redux/features/users/usersMangementApi";
import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const user = useAppSelector(selectCurrentUser);
  const { data: userData } = useGetUserByEmailQuery(user?.email);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsOpen(false)
    setIsUserMenuOpen(false)
  }, [location.pathname])

  // Close user menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLElement &&
        !event.target.closest(".user-menu") &&
        !event.target.closest(".user-menu-btn")
      ) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const navigationLinks = [
    { to: "/", label: "Home", icon: FaHome },
    { to: "/books", label: "Books", icon: FaBook },
    { to: "/categories", label: "Categories", icon: FaSearch, hasMegaMenu: true },
    { to: "/bestsellers", label: "Bestsellers", icon: FaHeart },
    { to: "/about", label: "About", icon: FaInfoCircle },
    { to: "/contact", label: "Contact", icon: FaPhone },
  ];

  const categories = [
    { name: "Fiction", icon: FaBook, to: "/categories/fiction" },
    { name: "Non-Fiction", icon: FaGraduationCap, to: "/categories/non-fiction" },
    { name: "Science", icon: FaFlask, to: "/categories/science" },
    { name: "History", icon: FaGlobe, to: "/categories/history" },
    { name: "Fantasy", icon: FaBolt, to: "/categories/fantasy" },
    { name: "Biography", icon: FaUser, to: "/categories/biography" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
           
              <img src={logo} alt="" />
            
            
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              return (
                <div key={link.to} className="relative">
                  <NavLink
                    to={link.to}
                    onMouseEnter={() => link.hasMegaMenu && setIsMegaMenuOpen(true)}
                    onMouseLeave={() => link.hasMegaMenu && setIsMegaMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        isActive
                          ? "text-rose-600 bg-rose-50"
                          : "text-gray-700 hover:text-rose-600 hover:bg-rose-50"
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                    {link.hasMegaMenu && (
                      <FaChevronDown className="w-4 h-4" />
                    )}
                  </NavLink>
                  {link.hasMegaMenu && isMegaMenuOpen && (
                    <div
                      onMouseEnter={() => setIsMegaMenuOpen(true)}
                      onMouseLeave={() => setIsMegaMenuOpen(false)}
                      className="absolute left-0 top-full mt-2 w-[600px] bg-white rounded-xl shadow-lg border border-gray-100 p-6 grid grid-cols-3 gap-4"
                    >
                      {categories.map((category) => {
                        const CategoryIcon = category.icon;
                        return (
                          <Link
                            key={category.to}
                            to={category.to}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-rose-50 transition-colors"
                          >
                            <CategoryIcon className="w-5 h-5 text-rose-500" />
                            <span className="text-sm font-medium text-gray-700">{category.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Icon (Desktop) */}
            <button className="hidden mdlg:flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition-colors">
              <FaSearch className="w-5 h-5" />
            </button>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <FaShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Link>

            {/* User Menu */}
            <div className="relative user-menu">
              {user ? (
                <>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-1 rounded-full border-2 border-gray-200 hover:border-orange-300 transition-colors"
                  >
                    <img
                      src={userData?.data?.photo || "https://i.pravatar.cc/40"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <FaChevronDown
                      className={`w-4 h-4 text-gray-600 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{userData?.data?.name || "User"}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-rose-50 transition-colors"
                      >
                        <FaUser className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Dashboard</span>
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-rose-50 transition-colors"
                      >
                        <FaCog className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Profile Settings</span>
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-rose-50 transition-colors"
                      >
                        <FaShoppingCart className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">My Orders</span>
                      </Link>
                      <Link
                        to="/wishlist"
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-rose-50 transition-colors"
                      >
                        <FaHeart className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Wishlist</span>
                      </Link>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={() => dispatch(logout())}
                          className="w-full text-left px-4 py-3 hover:bg-rose-50 transition-colors"
                        >
                          <span className="text-sm font-medium text-rose-600">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-700 hover:text-rose-600 transition-colors"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            >
              {isOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="py-4 space-y-2 border-t border-gray-100">
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              return (
                <div key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                        isActive
                          ? "text-rose-600 bg-rose-50"
                          : "text-gray-700 hover:text-rose-600 hover:bg-rose-50"
                      }`
                    }
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </NavLink>
                  {link.hasMegaMenu && (
                    <div className="pl-8 pt-2 space-y-2">
                      {categories.map((category) => {
                        const CategoryIcon = category.icon;
                        return (
                          <Link
                            key={category.to}
                            to={category.to}
                            className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-700 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <CategoryIcon className="w-4 h-4 text-rose-500" />
                            <span className="text-sm">{category.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mobile Search */}
            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                <FaSearch className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search books..."
                  className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Mobile Auth Links */}
            {!user && (
              <div className="px-4 py-2 space-y-2">
                <Link
                  to="/login"
                  className="block w-full px-4 py-3 text-center text-gray-700 border border-gray-200 rounded-lg font-medium hover:bg-rose-50 transition-colors"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;