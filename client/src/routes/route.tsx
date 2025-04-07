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
import Contact from "../pages/contact/Contact";
import PrivateRoute from "./privateRoute";
import Order from "@/pages/user/order/Order";



const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/login',
                element: <LoginForm />
            },
            {
                path: '/register',
                element: <RegisterForm />
            },
            {
                path: '/books',
                element: <Books />
            },
            {
                path: '/books/:id',
                element: <BookDeatails />
            },
            {
                path: '/contact',
                element: <Contact />
            },

        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: 'add-book',
                element: <PrivateRoute role="admin"><CreateBook /></PrivateRoute>
            },
            {
                path: 'all-books',
                element: <PrivateRoute role="admin"><AllBooks /></PrivateRoute>
            },
            {
                path: 'manage-users',
                element: <PrivateRoute role="admin"><ManageUsers /></PrivateRoute>
            },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'my-orders',
                element: <PrivateRoute role="user"><Order/></PrivateRoute>
            },
        ]
    }
]);

export default router;