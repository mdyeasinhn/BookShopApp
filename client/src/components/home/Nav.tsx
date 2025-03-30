import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import logo from '../../assets/images/logo-1.svg'
import Container from "../shared/Container";
const Nav = () => {
    const links = (
        <ul className="flex space-x-6 text-lg">
            <li>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "text-rose-500 font-bold" : "font-bold text-black"
                    }
                    to="/"
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "text-rose-500 font-bold" : "font-bold text-black"
                    }
                    to="/books"
                >
                    Books
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "text-rose-500 font-bold" : "font-bold text-black"
                    }
                    to="/contact"
                >
                    Contact
                </NavLink>
            </li>
            <li>
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "text-rose-500 font-bold" : "font-bold text-black"
                    }
                    to="/dashboard"
                >
                   Dashboard
                </NavLink>
            </li>
        </ul>
    );

    return (
     
         <nav className="flex items-center justify-between px-8 py-4  fixed w-full  bg-white z-10 shadow-sm">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-black">
            <Link to="/">
            <img
              src={logo}
              alt="logo"
              width="150"
              height="150"
            />
          </Link>  
            </Link>

            {/* Centered Links */}
            <div className="hidden lg:flex">{links}</div>

            {/* Buttons */}
            <Link to='/login' className="flex space-x-3">
                <Button className=" px-5 py-2 rounded-xl bg-rose-400 hover:bg-rose-400">
                   Login
                </Button>
                
            </Link>
        </nav>
    );
};

export default Nav;
