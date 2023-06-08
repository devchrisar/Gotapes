import React from "react";
import { Stack, Text, Heading, Image } from "@chakra-ui/react";
import "./ListUsers.scss";
import ContentNotFound from "/assets/svg/content_not_found.svg";
import User from "./User";

export default function ListUsers({ users, searchTerm }) {
  if (!users || users.length === 0) {
    if (!searchTerm) return null;
    return (
      <Stack h="100vh" p={8} align="center" spacing={4}>
        <Image
          src={ContentNotFound}
          alt="content not found"
          width="336px"
          height="168px"
          pb={4}
        />
        <Stack textAlign="center">
          <Heading>
            There&apos;s no results that match &quot;{searchTerm}&quot;
          </Heading>
          <Text color="gray.500">
            Try searching for another thing or check your spelling
          </Text>
        </Stack>
      </Stack>
    );
  }
  return (
    <Stack className="list-users" h="100vh" spacing={4}>
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </Stack>
  );
}
