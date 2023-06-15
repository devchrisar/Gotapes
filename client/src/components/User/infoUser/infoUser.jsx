import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Box, Text, Link, Icon, Skeleton, Flex, Image } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";
import { DateTime } from "luxon";
import {
  faEarthAmericas,
  faArrowUpRightFromSquare,
  faCakeCandles,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import CheckBadge from "/assets/svg/check_badge.svg";
import "./infoUser.scss";

export default function InfoUser({ user, handleUserUpdate }) {
  const [birthDate, setBirthDate] = useState(null);
  const [joinedDate, setJoinedDate] = useState(null);

  useEffect(() => {
    if (user?.createdAt) {
      const createdDateTime = DateTime.fromISO(user.createdAt, { zone: "utc" });
      const browserLanguage = navigator.language;
      const formattedJoinedDate = createdDateTime
        .setZone("utc")
        .toLocaleString({
          locale: browserLanguage,
          timeZone: "utc",
          month: "long",
          year: "numeric",
        });
      setJoinedDate(formattedJoinedDate);
    }
    if (user?.birthDate) {
      const parsedDate = DateTime.fromISO(user.birthDate, { zone: "utc" });
      const browserLanguage = navigator.language;
      const formattedDate = parsedDate.setZone("utc").toLocaleString({
        locale: browserLanguage,
        timeZone: "utc",
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      setBirthDate(formattedDate);
    }
  }, [user?.birthDate, user?.createdAt]);

  useEffect(() => {
    if (user) {
      handleUserUpdate(user);
    }
  }, [user, handleUserUpdate]);

  return (
    <AnimatePresence>
      <Box className="info-user" p={4}>
        <Helmet>
          <title>
            {user
              ? `Gotapes - ${user.name} ${user.lastName} ${user.username}`
              : "Gotapes - User Not Found"}
          </title>
          <meta
            name="description"
            content={
              user
                ? `Gotapes profile of ${user?.name} ${user?.lastName} ${user?.username} ${user?.bio}`
                : "Gotapes - User Not Found"
            }
          />
        </Helmet>
        <Skeleton isLoaded={!!user} startColor="#192734" endColor="#15212b">
          <Flex align="center">
            <Text fontSize="xl" fontWeight="bold" mb="2">
              {`${user?.name} ${user?.lastName}`}
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
        <Skeleton isLoaded={!!user} startColor="#192734" endColor="#15212b">
          <Text color="gray.600" mb="2">
            {user?.username}
          </Text>
        </Skeleton>
        <Skeleton isLoaded={!!user} startColor="#192734" endColor="#15212b">
          <Text color="gray.600" mb="4">
            {user?.email}
          </Text>
        </Skeleton>
        <Skeleton isLoaded={!!user} startColor="#192734" endColor="#15212b">
          {user?.bio && (
            <Text className="description" mb="4">
              {user.bio}
            </Text>
          )}
        </Skeleton>
        <Box className="more-info">
          <Skeleton isLoaded={!!user} startColor="#192734" endColor="#15212b">
            {user?.location && (
              <Box display="flex" alignItems="center" color="gray.600">
                <Icon as={FontAwesomeIcon} icon={faEarthAmericas} mr="2" />
                <Text fontSize="15px">{user.location}</Text>
              </Box>
            )}
          </Skeleton>
          <Skeleton isLoaded={!!user} startColor="#192734" endColor="#15212b">
            {user?.webSite && (
              <Link
                href={`${user.webSite.startsWith("http") ? "" : "https://"}${
                  user.webSite
                }`}
                target="_blank"
                rel="noreferrer"
                display="flex"
                alignItems="center"
                color="blue.500"
                fontSize="15px"
              >
                <Text>{user.webSite}</Text>
                <Icon
                  as={FontAwesomeIcon}
                  icon={faArrowUpRightFromSquare}
                  ml="2"
                />
              </Link>
            )}
          </Skeleton>
          <Skeleton isLoaded={!!user} startColor="#192734" endColor="#15212b">
            {user?.birthDate && (
              <Box display="flex" alignItems="center" color="gray.600">
                <Icon as={FontAwesomeIcon} icon={faCakeCandles} mr="2" />
                <Text fontSize="15px">{birthDate}</Text>
              </Box>
            )}
          </Skeleton>
        </Box>
        <Skeleton isLoaded={!!user} startColor="#192734" endColor="#15212b">
          {user?.createdAt && (
            <Text color="gray.600" mt={2}>
              <Icon as={FontAwesomeIcon} icon={faCalendarDays} mr="2" />
              Joined in {joinedDate}
            </Text>
          )}
        </Skeleton>
      </Box>
    </AnimatePresence>
  );
}
