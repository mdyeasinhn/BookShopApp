import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../home/Footer";




const MainLayout = () => {
    return (
        <div className="">

            <Navbar></Navbar>

            <div
                style={{
                    padding: 24,
                    minHeight: 360,

                }}
            >
                <div className='pt-10 min-h-[calc(100vh-68px)]'>
                    <Outlet />
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;