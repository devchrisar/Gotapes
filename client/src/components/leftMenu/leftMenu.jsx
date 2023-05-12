import React from "react";
import "./leftMenu.scss";
import { Button, Stack, Flex, Text, Image } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faUser,
  faPowerOff,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { LogoutApi } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import Logo from "../../assets/svg/logo_GotapesWt-png.png";

export default function LeftMenu(props) {
  const { setRefreshCheckLogin } = props;
  const user = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    LogoutApi();
    setRefreshCheckLogin(true);
    navigate("/", { replace: true });
  };
  const username = "Christopher Arias"; //todo: Replace with username

  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

  return (
    <Flex direction="column" h="100%" className="left_menu">
      <Stack
        borderRightWidth={1}
        borderRightColor="gray.700"
        paddingLeft={4}
        paddingRight={12}
        paddingX={8}
        paddingY={2}
        spacing={2}
        flexGrow={1}
        alignItems="flex-start"
      >
        <img src={Logo} alt="logo" className="logo" />
        <Stack spacing={2}>
          <Link
            to="/"
            className={`menu_link ${isCurrentPath("/") && "active"}`}
          >
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
          <Link
            to="/users"
            className={`menu_link ${isCurrentPath("/users") && "active"}`}
          >
            <FontAwesomeIcon icon={faUsers} /> Users
          </Link>
          <Link
            to={`/user/${user?._id}`}
            className={`menu_link ${
              isCurrentPath(`/user/${user?._id}`) && "active"
            }`}
          >
            <FontAwesomeIcon icon={faUser} /> Profile
          </Link>
          <Link onClick={logout} className="menu_link">
            <FontAwesomeIcon icon={faPowerOff} /> Logout
          </Link>
        </Stack>
        <Button className="btn btn-primary">Apeeps</Button>
        <Stack
          alignItems="center"
          padding={4}
          direction="row"
          justifyContent="space-between"
          className="text_bottom"
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={8}
            whiteSpace="nowrap"
          >
            <Image
              height={10}
              width={10}
              borderRadius="50%"
              src="https://bit.ly/sage-adebayo"
              alt="avatar"
            />
            <Stack spacing={0} marginLeft={2}>
              <Text fontWeight="bold" fontSize="sm" color="White">
                {username.length > 5
                  ? username.substring(0, 5) + "..."
                  : username}
              </Text>
              <Text fontSize="sm" color="gray.600">
                @User
              </Text>
            </Stack>
            <FontAwesomeIcon icon={faEllipsis} />
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  );
}
