import Home from "../page/Home/Home";
import Error404 from "../page/Error/Error404";
import User from "../page/User/User";
import Users from "../page/Users/Users";

export default [
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
