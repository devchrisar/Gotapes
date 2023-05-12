import Home from "../page/Home/Home";
import Error404 from "../page/Error/Error404";
import User from "../page/User/User";

export default [
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
