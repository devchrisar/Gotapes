import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  Link as Chakralink,
  Divider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logo from "/assets/svg/logo_Gotapes-svg.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function ForgotPasswordSended() {
  return (
    <>
      <Box bg="white" borderBottom="1px" borderColor="gray.200" py={2} px={4}>
        <Flex justify="start" align="center">
          <Link to="/">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="forgot-password__back"
            />
          </Link>
          <Image src={Logo} alt="logo" h="50px" />
          <Text
            fontFamily="heading"
            fontWeight="bold"
            color="gray.800"
            fontSize={{ base: "md", md: "lg" }}
          >
            Forgot Password
          </Text>
        </Flex>
      </Box>
      <Box px={8} py={8} w="100%" maxW="600px" m="0 auto">
        <Heading as="h1" size="lg" mt={4} mb={2}>
          we have sent you an email
        </Heading>
        <Text>
          Great news! We wanted to inform you that the email you requested has
          been successfully sent. However, we recommend checking your spam or
          junk folder in case our message was mistakenly redirected. Sometimes,
          email filters can play tricks and move legitimate emails to the wrong
          folder. That&apos;s why we also suggest checking your primary inbox.
          If you can&apos;t find the email after these checks, we recommend
          contacting us for further assistance.
        </Text>
        <Divider my={4} borderColor="gray.600" />
        <Chakralink
          href="mailto:christopherarias@hotmail.es"
          rel="stylesheet"
          style={{ color: "#1da1f2" }}
        >
          i didn&apos;t receive the email
        </Chakralink>
      </Box>
      <Helmet>
        <title>Gotapes - Forgot Password</title>
        <meta
          name="description"
          content="have you forgotten your password? Don't worry, we'll help you get it back in no time"
        />
      </Helmet>
    </>
  );
}
