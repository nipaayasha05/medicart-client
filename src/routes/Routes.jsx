import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";

import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../Home/Home";
import ManageMedicine from "../Dashboard/ManageMedicine/ManageMedicine";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
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
    ],
  },
]);
