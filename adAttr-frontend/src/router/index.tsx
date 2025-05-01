import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "~/layouts/public-layout";
import PrivateLayout from "~/layouts/private-layout";
// import AuthLayout from "~/layouts/auth-layout";
// import { lazy } from "react";

const router = createBrowserRouter([
  // public routes
  {
    path: "*",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        lazy: () => import("../pages/home.page"),
      },
      {
        path: "contact",
        lazy: () => import("../pages/contact"),
      },
      {
        path: "FAQ",
        lazy: () => import("../pages/FAQ"),
      },
      {
        path: "",
        // element: <AuthLayout />,
        children: [
          {
            path: "login",
            lazy: () => import("../pages/login.page"),
          },
          {
            path: "register",
            lazy: () => import("../pages/register.page"),
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <PrivateLayout />,
    children: [
      {
        path: "dashboard",
        lazy: () => import("~/pages/dashboard"),
        // loader:
      },
      {
        path: "profile",
        lazy: () => import("~/pages/profile.page"),
      },
      {
        path: "integrations",
        lazy: () => import("~/pages/integrations"),
      },
      {
        path: "links",
        lazy: () => import("~/pages/links"),
      },
      {
        path: "links/:id",
        lazy: () => import("~/pages/links/analytics"),
      },
      {
        path: "analytics",
        lazy: () => import("~/pages/analytics/index"),
      },
    ],
  },
]);

export default router;
