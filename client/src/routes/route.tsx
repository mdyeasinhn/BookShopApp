import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { RegisterForm } from "@/pages/auth/Register";
import NotFoundPage from "@/pages/NotFoundPage";
import LoginForm from "@/pages/auth/Login";
import Home from "@/pages/home/Home";





const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement:<NotFoundPage/>,
        children : [
            {
               index: true,
                element : <Home/>
            },
            {
                path : '/login',
                element : <LoginForm/>
            },
            {
                path : '/register',
                element : <RegisterForm/>
            }
        ]
    },
]);

export default router;