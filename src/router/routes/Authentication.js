// ** React Imports
import { lazy } from "react";

const Login = lazy(() => import("../../views/pages/authentication/Login"));


const RegisterMultiSteps = lazy(() =>
  import("../../views/pages/authentication/register-multi-steps")
);


const ForgotPasswordBasic = lazy(() =>
  import("../../views/pages/authentication/ForgotPasswordBasic")
);

const AuthenticationRoutes = [
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true,
    },
  },
  {
    path: "/register",
    element: <RegisterMultiSteps />,
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true,
    },
  },

  {
    path: "/forgot-password",
    element: <ForgotPasswordBasic />,
    layout: "BlankLayout",
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true,
    },
  },
];

export default AuthenticationRoutes;
