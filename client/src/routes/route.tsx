import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { LoginForm } from "@/pages/auth/Login";
import { RegisterForm } from "@/pages/auth/Register";
import NotFoundPage from "@/pages/NotFoundPage";





const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement:<NotFoundPage/>,
        children : [
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