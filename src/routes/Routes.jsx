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
// import InvoicePdf from "../pages/Invoice/InvoicePdf";
import InvoiceData from "../pages/Invoice/InvoiceData";

import PaymentHistory from "../Dashboard/seller/paymentHistory/PaymentHistory";
import PaymentManagement from "../Dashboard/admin/paymentManagement/PaymentManagement";
import Users from "../Dashboard/users/Users";
import ManageUsers from "../Dashboard/admin/manageUsers/ManageUsers";
import DashboardHome from "../Dashboard/DashboardHome/DashboardHome";
import ManageCategory from "../Dashboard/admin/ManageCategory/ManageCategory";
import CategoryDetails from "../pages/Home/categoryCard/CategoryDetails";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";
import SalesReport from "../Dashboard/admin/salesReport/SalesReport";
import UpdateProfile from "../Dashboard/updateProfile/UpdateProfile";
import ErrorPage from "../components/ErrorPage";

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
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "checkout/:id",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "invoice/:id",
        element: (
          <PrivateRoute>
            <InvoiceData />
          </PrivateRoute>
        ),
      },
      {
        path: "category/:category",
        element: <CategoryDetails />,
      },
      {
        path: "update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
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
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-medicine",
        element: (
          <PrivateRoute>
            <SellerRoute>
              {" "}
              <ManageMedicine />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "ask-advertisement",
        element: (
          <PrivateRoute>
            <SellerRoute>
              {" "}
              <AskForAdvertisement />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-category",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageCategory />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-banner-advertise",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageBannerAdvertise />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-management",
        element: (
          <PrivateRoute>
            <AdminRoute>
              {" "}
              <PaymentManagement />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "sales-report",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <SalesReport />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <PaymentHistory />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
]);
