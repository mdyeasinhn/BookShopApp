import { useState, useEffect } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import {
  Menu,
  X,
  ChevronDown,
  User,
  Settings,
  BookOpen,
  Home,
  Phone,
  Info,
  Search,
  Heart,
  ShoppingCart,
} from "lucide-react"
import { useAppSelector } from "@/redux/hooks"
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice"
import { useDispatch } from "react-redux"
import { useGetUserByEmailQuery } from "@/redux/features/users/usersMangementApi"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const dispatch = useDispatch()
  const user = useAppSelector(selectCurrentUser)
  const { data: userData } = useGetUserByEmailQuery(user?.email)
  const location = useLocation()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
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
    { to: "/", label: "Home", icon: Home },
    { to: "/books", label: "Books", icon: BookOpen },
    { to: "/categories", label: "Categories", icon: Search },
    { to: "/bestsellers", label: "Bestsellers", icon: Heart },
    { to: "/about", label: "About", icon: Info },
    { to: "/contact", label: "Contact", icon: Phone },
  ]

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
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">BookStore</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationLinks.map((link) => {
              const Icon = link.icon
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActive
                        ? "text-orange-600 bg-orange-50"
                        : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </NavLink>
              )
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Icon (Desktop) */}
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Link>

            {/* User Menu */}
            <div className="relative user-menu">
              {user ? (
                <>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="user-menu-btn flex items-center space-x-2 p-1 rounded-full border-2 border-gray-200 hover:border-orange-300 transition-colors"
                  >
                    <img
                      src={userData?.data?.photo || "https://i.pravatar.cc/40"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <ChevronDown
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
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Dashboard</span>
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <Settings className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Profile Settings</span>
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">My Orders</span>
                      </Link>
                      <Link
                        to="/wishlist"
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <Heart className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Wishlist</span>
                      </Link>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={() => dispatch(logout())}
                          className="w-full text-left px-4 py-3 hover:bg-red-50 transition-colors"
                        >
                          <span className="text-sm font-medium text-red-600">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="py-4 space-y-2 border-t border-gray-100">
            {navigationLinks.map((link) => {
              const Icon = link.icon
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                      isActive
                        ? "text-orange-600 bg-orange-50"
                        : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </NavLink>
              )
            })}

            {/* Mobile Search */}
            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                <Search className="w-5 h-5 text-gray-500" />
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
                  className="block w-full px-4 py-3 text-center text-gray-700 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full px-4 py-3 text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
