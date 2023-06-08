import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  Skeleton,
  SkeletonCircle,
  Flex,
} from "@chakra-ui/react";
import { API_HOST } from "../../utils/constant";
import Placeholder from "/assets/svg/placeholder.svg";
import { getUserApi } from "../../api/user";
import CheckBadge from "/assets/svg/check_badge.svg";

export default function User({ user }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getUserApi(user.id);
      setUserInfo(response);
    })();
  }, [user]);

  return (
    <Link to={`/user/${user.id}`} className="list-users__user">
      <Box display="flex" alignItems="center">
        <SkeletonCircle
          isLoaded={!!userInfo}
          startColor="#192734"
          endColor="#15212b"
          boxSize="64px"
          borderRadius="full"
          mr={3}
        >
          <Image
            boxSize="64px"
            borderRadius="full"
            mr={3}
            maxW="none"
            src={
              userInfo?.avatar
                ? `${API_HOST}/obtain_Avatar?id=${user.id}`
                : Placeholder
            }
            alt={`${user.name} ${user.lastName}`}
          />
        </SkeletonCircle>
        <Box>
          <Skeleton isLoaded={!!user} startColor="#192734" endColor="#15212b">
            <Flex align="center">
              <Text fontSize="xl" fontWeight="bold">
                {user.name} {user.lastName}
              </Text>
              {user?.isVerified && (
                <Box ml={2} mb="2">
                  <Image
                    src={CheckBadge}
                    alt="Check Badge"
                    boxSize={6}
                    style={{ width: "16px", height: "16px" }}
                  />
                </Box>
              )}
            </Flex>
          </Skeleton>
          <Skeleton
            isLoaded={!!userInfo}
            startColor="#192734"
            endColor="#15212b"
          >
            <Text>{userInfo?.email}</Text>
          </Skeleton>
          <Skeleton
            isLoaded={!!userInfo}
            startColor="#192734"
            endColor="#15212b"
          >
            <Text>{userInfo?.bio}</Text>
          </Skeleton>
        </Box>
      </Box>
    </Link>
  );
}
