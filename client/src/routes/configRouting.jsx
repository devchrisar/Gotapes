import Home from "../page/Home/Home";
import Error404 from "../page/Error/Error404";
import User from "../page/User/User";
import Users from "../page/Users/Users";
import About from "../page/About/About";
import Status from "../page/Status/Status";
import Tos from "../page/Tos/Tos";
import Cookie from "../page/Cookie/Cookie";
import Privacy from "../page/Privacy/Privacy";

export default [
  {
    path: "/tos",
    exact: true,
    page: Tos,
  },
  {
    path: "/cookies",
    exact: true,
    page: Cookie,
  },
  {
    path: "/privacy",
    exact: true,
    page: Privacy,
  },
  {
    path: "/about",
    exact: true,
    page: About,
  },
  {
    path: "/status",
    exact: true,
    page: Status,
  },
  {
    path: "/users",
    exact: true,
    page: Users,
  },
  {
    path: "/user/:id",
    exact: true,
    page: User,
  },
  {
    path: "/",
    exact: true,
    page: Home,
  },
  {
    path: "*",
    page: Error404,
  },
];
