import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../home/Navbar";
import Footer from "../home/Footer";
// import Nav from "../home/Nav";




const MainLayout = () => {

    const location = useLocation();
    const isLogin = location.pathname.includes('login') || location.pathname.includes('register');
    return (
        <div className="">

            {isLogin || <Navbar />}

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
            {isLogin || <Footer />}
        </div>
    );
};

export default MainLayout;