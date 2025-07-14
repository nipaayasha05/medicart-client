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
import Invoice from "../pages/Invoice/Invoice";

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
        element: <Invoice />,
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
        path: "manage-banner-advertise",
        element: <ManageBannerAdvertise />,
      },
    ],
  },
]);
