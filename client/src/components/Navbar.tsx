import {
  Menubar,
  MenubarMenu,

  MenubarTrigger,
} from "@/components/ui/menubar"
import { Link } from "react-router-dom";


// Ensure this points to your custom Container component

const Navbar = () => {


  return (
    <div className="fixed w-full flex justify-center z-10  ">
        <Menubar>
          <MenubarMenu>
           <Link to="/"> <MenubarTrigger>Home</MenubarTrigger></Link>
           <Link to="/"> <MenubarTrigger>Books</MenubarTrigger></Link>
           <Link to="/"> <MenubarTrigger>About</MenubarTrigger></Link>
           <Link to="/login"> <MenubarTrigger>Login</MenubarTrigger></Link>
            
          </MenubarMenu>
        </Menubar>
    </div>
  );
};

export default Navbar;
