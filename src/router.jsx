import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import Home from "./views/Home";
import Login from "./views/Login";
import About from "./views/About";
import GuestLayout from "./components/GuestLayout";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import Signup from "./views/Signup";

const router = createBrowserRouter([
    {
        path: '/',
        element:<DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Home/>

            },
            {
                path: '/about-us',
                element: <About/>
            },

        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>

            },
            {
                path: '/forgot-password',
                element: <ForgotPassword/>

            },
            {
                path: '/reset-password',
                element: <ResetPassword/>

            },
            {
                path: '/signup',
                element: <Signup/>

            },
        ]
    }
])

export default router
