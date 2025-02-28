import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import logo from '../../assets/images/circular-wheat-with-opened-book-and-pen-writer-inside-free-vector.jpg'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed w-full  bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              width="80"
              height="50"
            />
          </Link>

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
                  <Link
                    to="/dashboard"
                    className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/login"
                    className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                  >
                    Login
                  </Link>
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
