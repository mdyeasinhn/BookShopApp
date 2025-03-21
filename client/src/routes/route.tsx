import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { RegisterForm } from "@/pages/auth/Register";
import NotFoundPage from "@/pages/NotFoundPage";
import LoginForm from "@/pages/auth/Login";
import Home from "@/pages/home/Home";
import BookDeatails from "@/components/home/FeaturedBooks/BookDeatails";
import Books from "@/pages/books/Books";
import DashboardLayout from "@/components/layout/DashBoardLayout";
import CreateBook from "@/pages/Admin/CreateBook";
import AllBooks from "@/pages/Admin/AllBooks";
import ManageUsers from "@/pages/Admin/MangeUsers";
import Profile from "@/pages/profile/Profile";





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
    {
        path:'/dashboard',
        element : <DashboardLayout/>,
        children:[
            {
                path: 'add-book',
                element: <CreateBook/>
            },
            {
                path: 'all-books',
                element: <AllBooks/>
            },
            {
                path: 'manage-users',
                element: <ManageUsers/>
            },
            {
                path: 'profile',
                element: <Profile/>
            }
        ]
    }
]);

export default router;