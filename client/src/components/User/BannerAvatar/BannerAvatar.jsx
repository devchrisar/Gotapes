import React, { useState, useEffect } from "react";
import { Box, Button, Skeleton } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { API_HOST } from "../../../utils/constant";
import {
  checkFollowApi,
  followUserApi,
  unfollowUserApi,
} from "../../../api/follow";
import "./BannerAvatar.scss";
import Placeholder from "/assets/svg/placeholder.svg";
import ConfigModal from "../../Modal/ConfigModal/ConfigModal";
import EditUserForm from "../EditUserForm/EditUserForm";

const MotionBox = motion(Box);

export default function BannerAvatar({ user, loggedUser, handleUserUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [follow, setFollow] = useState(null);
  const [reloadfollow, setReloadfollow] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const bannerUrl = user?.banner
    ? `${API_HOST}/obtain_Banner?id=${user.id}`
    : null;
  const avatarUrl = user?.avatar
    ? `${API_HOST}/obtain_Avatar?id=${user.id}`
    : Placeholder;

  useEffect(() => {
    if (user) {
      checkFollowApi(user?.id).then((response) => {
        if (response?.status) {
          setFollow(true);
        } else {
          setFollow(false);
        }
      });
    }
    setReloadfollow(false);
  }, [user, reloadfollow]);

  const handleFollow = () => {
    followUserApi(user.id).then(() => {
      setReloadfollow(true);
    });
  };

  const handleUnfollow = () => {
    unfollowUserApi(user.id).then(() => {
      setReloadfollow(true);
    });
  };

  let buttonContent = null;

  if (user && loggedUser._id === user.id) {
    buttonContent = (
      <Button
        variant="outline"
        onClick={() => setShowModal(true)}
        className="btn btn-outline-primary"
      >
        Edit Profile
      </Button>
    );
  } else if (user && follow) {
    buttonContent = (
      <Button
        variant="outline"
        className="btn"
        color="white"
        onClick={handleUnfollow}
      >
        Unfollow
      </Button>
    );
  } else if (user && !follow) {
    buttonContent = (
      <Button
        variant="solid"
        className="btn btn-outline-primary"
        onClick={handleFollow}
      >
        Follow
      </Button>
    );
  }

  return (
    <AnimatePresence>
      <MotionBox
        className="banner-avatar"
        h="220px"
        bgImage={`url('${bannerUrl}')`}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Skeleton isLoaded={!!user} startColor="#192734" endColor="#15212b">
          <MotionBox
            className="avatar"
            bgImage={`url('${avatarUrl}')`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </Skeleton>
        {user && follow !== null && (
          <Box className="options">{buttonContent}</Box>
        )}
        <ConfigModal show={showModal} setShow={setShowModal}>
          <EditUserForm
            user={user}
            setShowModal={setShowModal}
            onClose={handleCloseModal}
            handleUserUpdate={handleUserUpdate}
          />
        </ConfigModal>
      </MotionBox>
    </AnimatePresence>
  );
}
