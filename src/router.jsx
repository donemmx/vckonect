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
import OnboardVetAccount from "./views/OnboardVetAccount";
import OnboardVetPersonal from "./views/OnboardVetPersonal";
import OnboardVerify from "./views/OnboardVerify";
import Otp from "./views/Otp";
import Search from "./views/Search";
import Dashboard from "./views/Dashboard";
import DashboardLayout from "./components/DashboardLayout";
import FeedCalculator from "./views/FeedCalculator";
import DiseasePrediction from "./views/DiseasePrediction";
import PetandLiveStock from "./views/PetandLiveStock";
import Account from "./views/Account";
import Promotion from "./views/Promotion";
import AccountDetails from "./views/AccountDetails";
import Activities from "./views/Activities";
import Stores from "./views/Stores";
import Forum from "./views/Forum";

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
        element:<DashboardLayout/>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/livestock',
                element: <PetandLiveStock />
            },
            {
                path: '/clients',
                element: <Dashboard />
            },
            {
                path: '/stores',
                element: <Stores />
            },
            {
                path: '/forum',
                element: <Forum />
            },
            {
                path: '/feed-calculator',
                element: <FeedCalculator />
            },
            {
                path: '/disease-prediction',
                element: <DiseasePrediction />
            },
            {
                path: '/account',
                element: <Account />
            },
            {
                path: '/account-details',
                element: <AccountDetails />
            },
            {
                path: '/activities',
                element: <Activities />
            },
            {
                path: '/ads-promotion',
                element: <Promotion />
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
                path: '/otp',
                element: <Otp/>
            },
            {
                path: '/search',
                element: <Search/>
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
                path: '/onboard-vet-account',
                element: <OnboardVetAccount/>
            },
            {
                path: '/onboard-vet-details',
                element: <OnboardVetPersonal/>
            },
            {
                path: '/onboard-verify',
                element: <OnboardVerify/>
            },
            {
                path: '/verified',
                element: <Verified/>
            },
        ]
    }
])

export default router
