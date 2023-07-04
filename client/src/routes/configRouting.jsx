import Home from "../page/Home/Home";
import Error404 from "../page/Error/Error404";
import User from "../page/User/User";
import Users from "../page/Users/Users";
import About from "../page/About/About";
import Status from "../page/Status/Status";
import Tos from "../page/Tos/Tos";
import Cookie from "../page/Cookie/Cookie";
import Privacy from "../page/Privacy/Privacy";
import ForgotPassword from "../page/ForgotPassword/ForgotPassword";
import ForgotPasswordSended from "../page/ForgotPasswordSended/ForgotPasswordSended";

export default [
  {
    path: "/tos",
    exact: true,
    page: Tos,
    secure: false,
  },
  {
    path: "/cookies",
    exact: true,
    page: Cookie,
    secure: false,
  },
  {
    path: "/privacy",
    exact: true,
    page: Privacy,
    secure: false,
  },
  {
    path: "/about",
    exact: true,
    page: About,
    secure: true,
  },
  {
    path: "/status",
    exact: true,
    page: Status,
    secure: true,
  },
  {
    path: "/forgot-password/:token",
    exact: true,
    page: ForgotPassword,
    secure: false,
  },
  {
    path: "/forgot-password",
    exact: true,
    page: ForgotPasswordSended,
    secure: false,
  },
  {
    path: "/users",
    exact: true,
    page: Users,
    secure: true,
  },
  {
    path: "/user/:id",
    exact: true,
    page: User,
    secure: true,
  },
  {
    path: "/",
    exact: true,
    page: Home,
    secure: true,
  },
  {
    path: "*",
    page: Error404,
    secure: true,
  },
];
