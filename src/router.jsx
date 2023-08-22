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
import AdminLogin from "./views/admin/AdminLogin";
import AdminContent from "./views/admin/AdminContent";

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
                path: '/vet-dashboard',
                element: <Dashboard />
            },
            {
                path: '/vet-home',
                element: <DashboardHome />
            },
            {
                path: '/vet-cases',
                element: <Cases />
            },
            {
                path: '/vet-clients',
                element: <Clients />
            },
            {
                path: '/vet-clinic',
                element: <Clinic />
            },
            {
                path: '/vet-add-clinic',
                element: <AddClinic />
            },
           
            {
                path: '/vet-add-case',
                element: <AddCase />
            },
            {
                path: '/vet-stores',
                element: <Stores />
            },
            {
                path: '/vet-store-details',
                element: <StoreDetails />
            },
            {
                path: '/vet-add-store',
                element: <AddStore />
            },
            {
                path: '/vet-forum',
                element: <Forum />
            },
            {
                path: '/vet-add-to-forum',
                element: <AddForumPost />
            },
            {
                path: '/vet-feed-calculator',
                element: <FeedCalculator />
            },
            {
                path: '/vet-disease-prediction',
                element: <DiseasePrediction />
            },
            {
                path: '/vet-account',
                element: <Account />
            },
            {
                path: '/vet-account-details',
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
                path: '/animal-owner-dashboard',
                element: <Dashboard />
            },
            {
                path: '/animal-owner-home',
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
                path: '/animal-owner-clients',
                element: <Clients />
            },
            {
                path: '/animal-owner-stores',
                element: <Stores />
            },
            {
                path: '/animal-owner-store-details',
                element: <StoreDetails />
            },
            {
                path: '/animal-owner-add-store',
                element: <AddStore />
            },
            {
                path: '/animal-owner-forum',
                element: <Forum />
            },
            {
                path: '/animal-owner-add-to-forum',
                element: <AddForumPost />
            },
            {
                path: '/animal-owner-feed-calculator',
                element: <FeedCalculator />
            },
            {
                path: '/animal-owner-disease-prediction',
                element: <DiseasePrediction />
            },
            {
                path: '/animal-owner-account',
                element: <Account />
            },
            {
                path: '/animal-owner-account-details',
                element: <AccountDetails />
            },
            {
                path: '/animal-owner-activities',
                element: <Activities />
            },
            {
                path: '/animal-owner-promotion',
                element: <Promotion />
            },
        ]
    },
    {
        path: '/',
        element:<AdminLayout/>,
        children: [
            {
                path: '/admin-dashboard',
                element: <UserFeatures />
            },
            {
                path: '/admin-forum',
                element: <AdminForum />
            },
            {
                path: '/subscriptions',
                element: <Subscriptions />
            },
            {
                path: '/admin-promotion',
                element: <AdminPromotion />
            },
            {
                path: '/forum-content',
                element: <AdminContent />
            },
            {
                path: '/admin-account',
                element: <AdminAccount />
            },
            {
                path: '/admin-activity',
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
                path: '/admin-login',
                element: <AdminLogin />
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
