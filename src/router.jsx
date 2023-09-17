import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import Signup from "./views/Signup";
import Home from "./views/Home";
import Login from "./views/Login";
import About from "./views/About";
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
import AddPromotion from "./views/admin/AddPromotion";
import UserFeatures from "./views/admin/UserFeatures";
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
import AdminAccountDetails from "./views/admin/AdminAccountDetails";
import AddSubscription from "./views/admin/AddSubscription";
import OnboardVetVerify from "./views/OnboardVetVerify";
import AddProduct from "./views/user/AddProduct";
import OnboardSubscription from "./views/OnboardSubscription";
import SubscribeToPlan from "./views/user/SubscribeToPlan";
import OnboardVetSubscribe from "./views/OnboardVetSubscribe";
import NotFound from "./views/NotFound";
import AddPromotionToSub from "./views/user/AddPromotionToSub";
import ClinicDetails from "./views/user/ClinicDetails";
import VetUserDetails from "./views/user/VetUserDetails";
import Farm from "./views/user/Farm";
import Pets from "./views/user/Pets";

const router = createBrowserRouter([

  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <About />,
      },
    ],
  },
  {
    path: "/",
    element: <VetLayout />,
    children: [
      {
        path: "/vet-dashboard",
        element: <Dashboard />,
      },
      {
        path: "/vet-subscription",
        element: <OnboardSubscription />,
      },
      {
        path: "/vet-home",
        element: <DashboardHome />,
      },
      {
        path: "/vet-details/:id",
        element: <Account />,
      },
      {
        path: "/vet-cases",
        element: <Cases />,
      },
      {
        path: "/vet-clients",
        element: <Clients />,
      },
      {
        path: "/vet-clinic",
        element: <Clinic />,
      },
      {
        path: "/vet-clinic-details/:id",
        element: <ClinicDetails />,
      },
      {
        path: "/vet-add-clinic",
        element: <AddClinic />,
      },
      {
        path: "/vet-add-case",
        element: <AddCase />,
      },
      {
        path: "/vet-stores",
        element: <Stores />,
      },
      {
        path: "/vet-store-details/:id",
        element: <StoreDetails />,
      },
      {
        path: "/vet-add-product",
        element: <AddProduct />,
      },
      {
        path: "/vet-add-store",
        element: <AddStore />,
      },
      {
        path: "/vet-forum",
        element: <Forum />,
      },
      {
        path: "/vet-add-to-forum",
        element: <AddForumPost />,
      },
      {
        path: "/vet-feed-calculator",
        element: <FeedCalculator />,
      },
      {
        path: "/vet-disease-prediction",
        element: <DiseasePrediction />,
      },
      {
        path: "/vet-account/:id",
        element: <Account />,
      },
      {
        path: "/vet-account-details",
        element: <AccountDetails />,
      },
      {
        path: "/vet-activities",
        element: <Activities />,
      },
      {
        path: "/vet-subscription",
        element: <SubscribeToPlan />,
      },
      {
        path: "/vet-add-promotion",
        element: <AddPromotionToSub />,
      },
      {
        path: "/vet-promotion",
        element: <Promotion />,
      },

     
    ],
  },
  {
    path: "/",
    element: <AnimalOwnerLayout />,
    children: [
      {
        path: "/animal-owner-dashboard",
        element: <Dashboard />,
      },
      {
        path: "/animal-owner-home",
        element: <DashboardHome />,
      },
      {
        path: "/livestock",
        element: <PetandLiveStock />,
      },
      {
        path: "/add-pet",
        element: <AddPet />,
      },
      {
        path: "/add-farm",
        element: <AddFarm />,
      },
      {
        path: "/animal-owner-clients",
        element: <Clients />,
      },
      {
        path: "/animal-owner-stores",
        element: <Stores />,
      },
      {
        path: "/animal-owner-store-details/:id",
        element: <StoreDetails />,
      },
      {
        path: "/animal-owner-add-product",
        element: <AddProduct />,
      },
      {
        path: "/animal-owner-add-store",
        element: <AddStore />,
      },
      {
        path: "/animal-owner-forum",
        element: <Forum />,
      },
      {
        path: "/animal-owner-add-to-forum",
        element: <AddForumPost />,
      },
      {
        path: "/animal-owner-feed-calculator",
        element: <FeedCalculator />,
      },
      {
        path: "/animal-owner-disease-prediction",
        element: <DiseasePrediction />,
      },
      {
        path: "/animal-owner-account/:id",
        element: <Account />,
      },
      {
        path: "/animal-owner-account-details",
        element: <AccountDetails />,
      },
      {
        path: "/animal-owner-activities",
        element: <Activities />,
      },
      {
        path: "/animal-owner-add-promotion",
        element: <AddPromotionToSub />,
      },
      {
        path: "/animal-owner-promotion",
        element: <Promotion />,
      },
      {
        path: "/animal-owner-clinic-details/:id",
        element: <ClinicDetails />,
      },
      {
        path: "/animal-owner-vet-details/:id",
        element: <Account />,
      },
    ],
  },
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin-dashboard",
        element: <UserFeatures />,
      },
      {
        path: "/subscriptions",
        element: <Subscriptions />,
      },
      {
        path: "/add-subscription",
        element: <AddSubscription />,
      },
      {
        path: "/admin-promotion",
        element: <AdminPromotion />,
      },
      {
        path: "/add-promotion",
        element: <AddPromotion />,
      },
      {
        path: "/forum-content",
        element: <AdminContent />,
      },
      {
        path: "/admin-account",
        element: <AdminAccount />,
      },
      {
        path: "/admin-account-details",
        element: <AdminAccountDetails />,
      },
      {
        path: "/admin-activity",
        element: <AdminActivity />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/admin-login",
        element: <AdminLogin />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/store/:id",
        element: <StoreDetails />,
      },
      {
        path: "/clinic/:id",
        element: <ClinicDetails />,
      },
      {
        path: "/veterinarian/:id",
        element: <Account />,
      },
      {
        path: "/user/:id",
        element: <Account />,
      },
      {
        path: "/farm/:id",
        element: <Farm />,
      },
      {
        path: "/pet/:id",
        element: <Pets />,
      },
      {
        path: "/otp",
        element: <Otp />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/onboard-animal-owner-details",
        element: <OnboardAnimalOwnerPersonal />,
      },
      {
        path: "/onboard-animal-owner-account",
        element: <OnboardAnimalOwnerAccount />,
      },
      {
        path: "/onboard-vet-account",
        element: <OnboardVetAccount />,
      },
      {
        path: "/onboard-vet-details",
        element: <OnboardVetPersonal />,
      },
      {
        path: "/onboard-vet-verify",
        element: <OnboardVetVerify />,
      },
      {
        path: "/onboard-vet-subscription",
        element: <OnboardVetSubscribe />,
      },
     
      {
        path: "/onboard-verify",
        element: <OnboardVerify />,
      },
      {
        path: "/verified",
        element: <Verified />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound/>
  }
]);

export default router;
