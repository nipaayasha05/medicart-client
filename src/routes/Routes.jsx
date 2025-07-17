import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import React from "react";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import DashboardLayout from "../layouts/DashboardLayout";

import ManageMedicine from "../Dashboard/seller/ManageMedicine/ManageMedicine";
import AskForAdvertisement from "../Dashboard/seller/AskForAdvertisement/AskForAdvertisement";
import ManageBannerAdvertise from "../Dashboard/admin/ManageBannerAdvertise/ManageBannerAdvertise";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";
// import Invoice from "../pages/Invoice/Invoice";
import InvoicePdf from "../pages/Invoice/InvoicePdf";
import InvoiceData from "../pages/Invoice/InvoiceData";

import PaymentHistory from "../Dashboard/seller/paymentHistory/PaymentHistory";
import PaymentManagement from "../Dashboard/admin/paymentManagement/PaymentManagement";
import Users from "../Dashboard/users/Users";
import ManageUsers from "../Dashboard/admin/manageUsers/ManageUsers";
import DashboardHome from "../Dashboard/DashboardHome/DashboardHome";
import ManageCategory from "../Dashboard/admin/ManageCategory/ManageCategory";
import CategoryDetails from "../pages/Home/categoryCard/CategoryDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout/:id",
        element: <Checkout />,
      },
      {
        path: "invoice/:id",
        element: <InvoiceData />,
      },
      {
        path: "category/:category",
        element: <CategoryDetails />,
      },
    ],
  },
  {
    path: "signup",
    Component: SignUp,
  },
  {
    path: "signin",
    Component: SignIn,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "manage-medicine",
        element: <ManageMedicine />,
      },
      {
        path: "ask-advertisement",
        element: <AskForAdvertisement />,
      },
      {
        path: "manage-category",
        element: <ManageCategory />,
      },
      {
        path: "manage-banner-advertise",
        element: <ManageBannerAdvertise />,
      },
      {
        path: "payment-management",
        element: <PaymentManagement />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
    ],
  },
]);
