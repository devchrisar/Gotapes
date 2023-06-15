import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { motion } from "framer-motion";
import "react-tooltip/dist/react-tooltip.css";
import { Button, VStack } from "@chakra-ui/react";
import "./MenuTooltip.scss";
import { LogoutApi } from "../../../api/auth";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { getUserApi } from "../../../api/user";

export default function MenuTooltip(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const { setRefreshCheckLogin } = props;
  const navigate = useNavigate();
  const user = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getUserApi(user._id);
      setCurrentUser(response);
    })();
  }, [user]);

  const handleTooltipHover = (tooltipId) => {
    const tooltip = document.getElementById(tooltipId);
    if (tooltip) {
      tooltip.style.setProperty("pointer-events", "auto");
    }
  };

  const handleTooltipLeave = (tooltipId) => {
    const tooltip = document.getElementById(tooltipId);
    if (tooltip) {
      tooltip.style.setProperty("pointer-events", "none");
    }
  };

  const logout = () => {
    LogoutApi();
    setRefreshCheckLogin(true);
    navigate("/", { replace: true });
  };

  const handleMouseEnter = () => {
    handleTooltipHover("menu-tooltip");
  };

  const handleMouseLeave = () => {
    handleTooltipLeave("menu-tooltip");
  };

  return (
    <Tooltip
      id="menu-tooltip"
      anchorSelect=".text_bottom"
      place="top"
      effect="solid"
      delayHide={4000}
      clickable
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <VStack spacing={2}>
          <Button as="a" variant="link">
            add a different account
          </Button>
          <Button as="a" onClick={logout} variant="link">
            Close {currentUser?.username} session
          </Button>
        </VStack>
      </motion.div>
    </Tooltip>
  );
}
