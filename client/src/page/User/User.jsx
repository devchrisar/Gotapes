import React, { useEffect, useState } from "react";
import "./User.scss";
import useAuth from "../../hooks/useAuth";
import BasicLayout from "../../layout/BasicLayout/BasicLayout";
import BannerAvatar from "../../components/User/BannerAvatar/BannerAvatar";
import InfoUser from "../../components/User/infoUser/infoUser";
import ListApeeps from "../../components/ListApeeps/ListApeeps";
import { AnimatePresence } from "framer-motion";
import { Skeleton, Divider, Heading, Button, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getUserApi } from "../../api/user";
import { getApeepsApi } from "../../api/apeeps";
import toast from "react-hot-toast";

function User({ setRefreshCheckLogin }) {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [appeps, setApeeps] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingApeeps, setLoadingApeeps] = useState(false);
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
        toast.error("internal error");
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchApeeps = async () => {
      try {
        const response = await getApeepsApi(id);

        if (!response || Object.keys(response).length === 0) {
          setApeeps([]);
          setLoadingApeeps(0);
        } else {
          setApeeps(response);
        }
      } catch (error) {
        toast.error("internal error");
        setApeeps([]);
      }
    };

    fetchApeeps();
  }, [id]);

  const moreData = async () => {
    const pageTemp = page + 1;
    setLoadingApeeps(true);
    try {
      await getApeepsApi(id, pageTemp).then((response) => {
        if (!response) {
          setLoadingApeeps(0);
        } else {
          setApeeps([...appeps, ...response]);
          setPage(pageTemp);
          setLoadingApeeps(false);
        }
      });
    } catch (error) {
      toast.error("Error loading apeeps");
    }
  };

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
        <Divider
          key="divider"
          borderColor="gray.700"
          width="100%"
          spacing={0}
        />
        <div className="user__apeeps">
          <Heading>Apeeps</Heading>
          {appeps && <ListApeeps apeeps={appeps} />}
          {!!appeps && (
            <Button
              className="user__apeeps-more"
              display="flex"
              onClick={moreData}
              variant="unstyled"
              color="#1da0f2"
              m="0 auto"
              mb="10px"
              mt="10px"
              backgroundColor="transparent"
              border={0}
            >
              {!loadingApeeps ? (
                loadingApeeps !== 0 && "show more answers"
              ) : (
                <Spinner />
              )}
            </Button>
          )}
        </div>
      </AnimatePresence>
    </BasicLayout>
  );
}

export default User;
