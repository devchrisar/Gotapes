import React, { useState, useEffect } from "react";
import "./leftMenu.scss";
import { Button, Stack, Flex, Text, Image, Skeleton } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faUser,
  faPowerOff,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import ApeepsModal from "../Modal/apeepsModal/apeepsModal";
import { LogoutApi } from "../../api/auth";
import { getUserApi } from "../../api/user";
import useAuth from "../../hooks/useAuth";
import Logo from "/assets/svg/logo_GotapesWt-png.png";
import MenuTooltip from "./MenuTooltip/MenuTooltip";
import Placeholder from "/assets/svg/placeholder.svg";

export default function LeftMenu(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const user = useAuth();
  const { setRefreshCheckLogin } = props;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await getUserApi(user._id);
      setCurrentUser(response);
    })();
  }, [user]);

  const logout = () => {
    LogoutApi();
    setRefreshCheckLogin(true);
    navigate("/", { replace: true });
  };

  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

  const handleModalOpen = () => {
    setShowModal(true);
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
          <Button
            as="a"
            onClick={logout}
            className="menu_link"
            variant="link"
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faPowerOff} /> Logout
          </Button>
        </Stack>
        <Button className="btn btn-primary" onClick={handleModalOpen}>
          Apeeps
        </Button>
        <ApeepsModal showModal={showModal} setShowModal={setShowModal} />
        <AnimatePresence>
          <Stack
            alignItems="center"
            padding={4}
            direction="row"
            justifyContent="space-between"
            className="text_bottom"
            data-tip=""
            data-for="menu-tooltip"
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={8}
              whiteSpace="nowrap"
            >
              <Skeleton
                isLoaded={!!currentUser}
                borderRadius="50%"
                startColor="#192734"
                endColor="#15212b"
              >
                <Image
                  height={10}
                  width={10}
                  backgroundPosition="center"
                  backgroundSize="cover"
                  backgroundRepeat="no-repeat"
                  borderRadius="50%"
                  src={currentUser?.avatar || Placeholder}
                  alt="avatar"
                />
              </Skeleton>
              <Stack spacing={0} marginLeft={2}>
                <Skeleton
                  isLoaded={!!currentUser}
                  startColor="#192734"
                  endColor="#15212b"
                >
                  <Text fontWeight="bold" fontSize="sm" color="White">
                    {user.name.length > 5
                      ? `${user.name.substring(0, 5)}...`
                      : currentUser.name}
                  </Text>
                </Skeleton>

                <Text fontSize="sm" color="gray.600">
                  {currentUser?.username}
                </Text>
              </Stack>
              <FontAwesomeIcon icon={faEllipsis} />
            </Stack>
          </Stack>
        </AnimatePresence>
        <MenuTooltip setRefreshCheckLogin={setRefreshCheckLogin} />
      </Stack>
    </Flex>
  );
}
