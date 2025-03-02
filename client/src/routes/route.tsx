import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { RegisterForm } from "@/pages/auth/Register";
import NotFoundPage from "@/pages/NotFoundPage";
import LoginForm from "@/pages/auth/Login";
import Home from "@/pages/home/Home";
import BookDeatails from "@/components/home/FeaturedBooks/BookDeatails";
import Books from "@/pages/books/Books";





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
            },
            {
                path : '/books',
                element : <Books/>
            },
            {
                path : '/books/:id',
                element : <BookDeatails/>
            }
        ]
    },
]);

export default router;