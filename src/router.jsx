import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import Signup from "./views/Signup";
import Home from './views/Home'
import Login from './views/Login'
import About from './views/About'
import Verified from "./views/Verified";
import OnboardAnimalOwnerPersonal from "./views/OnboardAnimalOwnerPersonal";
import OnboardAnimalOwnerAccount from "./views/OnboardAnimalOwnerAccount";
import OnboardVetAccount from "./views/OnboardVetAccount";
import OnboardVetPersonal from "./views/OnboardVetPersonal";
import OnboardVerify from "./views/OnboardVerify";
import Otp from "./views/Otp";
import Search from "./views/Search";
import Dashboard from "./views/user/Dashboard";
import FeedCalculator from "./views/user/FeedCalculator";
import DiseasePrediction from "./views/user/DiseasePrediction";
import Account from "./views/user/Account";
import Promotion from "./views/user/Promotion";
import AccountDetails from "./views/user/AccountDetails";
import Activities from "./views/user/Activities";
import Stores from "./views/user/Stores";
import Forum from "./views/user/Forum";
import Clients from "./views/user/Clients";
import AddFarm from "./views/user/AddFarm";
import AddPet from "./views/user/AddPet";
import AddForumPost from "./views/user/AddForumPost";
import AddStore from "./views/user/AddStore";
import Cases from "./views/user/Cases";
import StoreDetails from "./views/user/StoreDetails";
import Clinic from "./views/user/Clinic";
import AddClinic from "./views/user/AddClinic";
import AddCase from "./views/user/AddCase";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./views/admin/AdminDashboard";
import UserFeatures from "./views/admin/UserFeatures";
import AdminForum from "./views/admin/AdminForum";
import Subscriptions from "./views/admin/Subscriptions";
import AdminPromotion from "./views/admin/AdminPromotion";
import AdminAccount from "./views/admin/AdminAccount";
import AdminActivity from "./views/admin/AdminActivity";
import VetLayout from "./components/VetLayout";
import AnimalOwnerLayout from "./components/AnimalOwnerLayout";
import DashboardHome from "./views/user/DashboardHome";
import PetandLiveStock from "./views/user/PetandLiveStock";

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
        element:<VetLayout/>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/home',
                element: <DashboardHome />
            },
            {
                path: '/cases',
                element: <Cases />
            },
            {
                path: '/clients',
                element: <Clients />
            },
            {
                path: '/clinic',
                element: <Clinic />
            },
            {
                path: '/add-clinic',
                element: <AddClinic />
            },
           
            {
                path: '/add-case',
                element: <AddCase />
            },
            {
                path: '/stores',
                element: <Stores />
            },
            {
                path: '/store-details',
                element: <StoreDetails />
            },
            {
                path: '/add-store',
                element: <AddStore />
            },
            {
                path: '/forum',
                element: <Forum />
            },
            {
                path: '/add-to-forum',
                element: <AddForumPost />
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
                path: '/promotion',
                element: <Promotion />
            },
        ]
    },
    {
        path: '/',
        element:<AnimalOwnerLayout/>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/home',
                element: <DashboardHome />
            },
            {
                path: '/livestock',
                element: <PetandLiveStock />
            },
            {
                path: '/add-pet',
                element: <AddPet />
            },
            {
                path: '/add-farm',
                element: <AddFarm />
            },
            {
                path: '/clients',
                element: <Clients />
            },
            {
                path: '/stores',
                element: <Stores />
            },
            {
                path: '/store-details',
                element: <StoreDetails />
            },
            {
                path: '/add-store',
                element: <AddStore />
            },
            {
                path: '/forum',
                element: <Forum />
            },
            {
                path: '/add-to-forum',
                element: <AddForumPost />
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
                path: '/promotion',
                element: <Promotion />
            },
        ]
    },
    {
        path: '/',
        element:<AdminLayout/>,
        children: [
            {
                path: '/dashboard',
                element: <AdminDashboard />
            },
            {
                path: '/user-features',
                element: <UserFeatures />
            },
            {
                path: '/forum',
                element: <AdminForum />
            },
            {
                path: '/subscriptions',
                element: <Subscriptions />
            },
            {
                path: '/promotion',
                element: <AdminPromotion />
            },
            {
                path: '/account',
                element: <AdminAccount />
            },
            {
                path: '/activity',
                element: <AdminActivity />
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
