import React, { useEffect, useState } from "react";
import "./User.scss";
import useAuth from "../../hooks/useAuth";
import BasicLayout from "../../layout/BasicLayout/BasicLayout";
import BannerAvatar from "../../components/User/BannerAvatar/BannerAvatar";
import InfoUser from "../../components/User/infoUser/infoUser";
import { AnimatePresence } from "framer-motion";
import { Skeleton } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getUserApi } from "../../api/user";
import toast from "react-hot-toast";

function User({ setRefreshCheckLogin }) {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const loggedUser = useAuth();

  const handleUserUpdate = (formData) => {
    setUser(formData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserApi(id);

        if (!response || Object.keys(response).length === 0) {
          toast.error("User not found", {
            className: "toast__container",
          });
        } else {
          setUser(response);
        }
      } catch (error) {
        toast.error("User not found");
      }
    };

    fetchData();
  }, [id]);

  return (
    <BasicLayout className="user" setRefreshCheckLogin={setRefreshCheckLogin}>
      <AnimatePresence key="animateUser">
        <Skeleton
          key="skeleton"
          isLoaded={!!user}
          startColor="#192734"
          endColor="#15212b"
        >
          <div key="title" className="user__title">
            <h2>{user ? `${user.name} ${user.lastName}` : "User not found"}</h2>
          </div>
        </Skeleton>
        <BannerAvatar
          key="banner_avatar"
          user={user}
          loggedUser={loggedUser}
          handleUserUpdate={handleUserUpdate}
        />
        <InfoUser
          user={user}
          handleUserUpdate={handleUserUpdate}
          key="user_info"
        />
        <div className="user__apeeps">Apeeps List</div>
      </AnimatePresence>
    </BasicLayout>
  );
}

export default User;
