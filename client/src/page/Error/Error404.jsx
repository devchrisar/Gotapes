import React, { useState } from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "/assets/svg/logo_Gotapes-svg.svg";
import AsyncSelect from "react-select/async";
import { customStyles } from "../../../src/components/User/EditUserForm/custom/customStyles";
import { getUserApi, searchUserApi } from "../../api/user";
import { useDebouncedCallback } from "use-debounce";
import "./Error404.scss";

export default function Error404() {
  const MotionBox = motion(Box);
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
      const response = await searchUserApi(`search=${inputValue}`);

      let users = [];
      if (Array.isArray(response)) {
        users = response;
      } else if (response && Array.isArray(response.data)) {
        users = response.data;
      }

      if (users.length > 0) {
        const options = users
          .sort((a, b) => {
            const aMatch = getMatchScore(a, inputValue);
            const bMatch = getMatchScore(b, inputValue);
            return bMatch - aMatch;
          })
          .map((user) => ({
            value: user.id,
            label: `${user.name} ${user.lastName}`,
          }));

        return options;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  const getMatchScore = (user, inputValue) => {
    const fullName = user.name + " " + user.lastName;
    const reversedFullName = user.lastName + " " + user.name;

    if (fullName.toLowerCase().includes(inputValue.toLowerCase())) {
      return 4;
    } else if (
      reversedFullName.toLowerCase().includes(inputValue.toLowerCase())
    ) {
      return 3;
    } else if (user.name.toLowerCase().includes(inputValue.toLowerCase())) {
      return 2;
    } else if (user.lastName.toLowerCase().includes(inputValue.toLowerCase())) {
      return 1;
    }

    return 0;
  };

  const handleUserChange = (selectedOption) => {
    setSelectedUser(selectedOption);
  };

  const onSearch = useDebouncedCallback(loadOptions, 500);

  const handleProfileView = async () => {
    if (selectedUser) {
      const userId = selectedUser.value;
      try {
        const result = await getUserApi(userId);
        if (!result || Object.keys(result).length === 0) {
          throw new Error("User not found");
        }
        navigate(`/user/${userId}`);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box position="absolute" top={4} right={4}>
        <Link to="/" className="menu_link">
          Home
        </Link>
      </Box>
      <MotionBox
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        textAlign="center"
        maxWidth="400px"
        p={4}
        mt={4}
      >
        <Box mb={2}>
          <img src={logo} alt="Logo" />
        </Box>
        <Box fontSize="xl" fontWeight="bold">
          Sorry, that page doesn't exist!
        </Box>
        <Heading my={2}>
          Thanks for noticing - we're going to fix it up and have things back to
          normal soon.
        </Heading>
        <Flex alignItems="center" my={4}>
          <Box width="800px" mr={4}>
            <AsyncSelect
              placeholder="Search for a full name or last name, or @username"
              menuPlacement="top"
              cacheOptions
              defaultOptions
              loadOptions={loadOptions}
              value={selectedUser}
              styles={customStyles}
              onChange={handleUserChange}
              onInputChange={onSearch}
            />
          </Box>
          <Box maxWidth="800px">
            <Button
              colorScheme="blue"
              onClick={handleProfileView}
              disabled={!selectedUser}
            >
              Search
            </Button>
          </Box>
        </Flex>
        <Box fontSize="sm" color="gray.500">
          {new Date().getFullYear() > 2021 && ` ${new Date().getFullYear()}`}{" "}
          ©Gotapes
        </Box>
        <Flex justifyContent="center" mt={4}>
          <Box mr={4}>
            <Link to="/about">About</Link>
          </Box>
          <Box>
            <Link to="/status">Status</Link>
          </Box>
        </Flex>
      </MotionBox>
    </Flex>
  );
}
