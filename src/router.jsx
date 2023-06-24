import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import Home from "./views/Home";
import Login from "./views/Login";
import About from "./views/About";
import GuestLayout from "./components/GuestLayout";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import Signup from "./views/Signup";
import Verified from "./views/Verified";
import OnboardAnimalOwnerPersonal from "./views/OnboardAnimalOwnerPersonal";
import OnboardAnimalOwnerAccount from "./views/OnboardAnimalOwnerAccount";
import OnboardAnimalOwnerVerify from "./views/OnboardAnimalOwnerVerify";
import OnboardVetAccount from "./views/OnboardVetAccount";
import OnboardVetPersonal from "./views/OnboardVetPersonal";
import OnboardVetVerify from "./views/OnboardVetVerify";

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
            {
                path: '/onboard-animal-owner-details',
                element: <OnboardAnimalOwnerPersonal/>

            },
            {
                path: '/onboard-animal-owner-account',
                element: <OnboardAnimalOwnerAccount/>

            },
            {
                path: '/onboard-animal-owner-verify',
                element: <OnboardAnimalOwnerVerify/>

            },
            {
                path: '/onboard-vet-account',
                element: <OnboardVetAccount/>

            },
            {
                path: '/onboard-vet-personal',
                element: <OnboardVetPersonal/>

            },
            {
                path: '/onboard-vet-verify',
                element: <OnboardVetVerify/>

            },
            {
                path: '/verified',
                element: <Verified/>

            },
        ]
    }
])

export default router
