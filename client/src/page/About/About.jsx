import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Flex,
  Text,
  Divider,
  Heading,
  Avatar,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import * as luxon from "luxon";
import logo from "/assets/svg/logo_GotapesWt-png.png";
import CheckBadge from "/assets/svg/check_badge.svg";
import button_badge from "/assets/svg/button_badge_apeeps.svg";
import bg_placeholder from "/assets/svg/about_bg01.svg";
import "./About.scss";

export default function About() {
  return (
    <Flex flexDirection="column">
      <Helmet>
        <title>About Gotapes</title>
        <meta
          name="description"
          content="Gotapes is a social network platform designed to connect and share their thoughts, ideas, and updates within the vibrant ape community."
        />
      </Helmet>
      <Flex alignItems="center" justifyItems="center" mb={4}>
        <Box className="banner">
          <Text fontSize="100px" fontWeight="bold" mb={4} align="center">
            About Gotapes
          </Text>
        </Box>
      </Flex>
      <Box flex={1} p={6}>
        <Flex height="100%" alignItems="center" justifyContent="center">
          <Box display="flex" flexDirection="row">
            <Box flex={1}>
              <img
                src={bg_placeholder}
                alt="Image"
                width="100%"
                height="auto"
              />
            </Box>
            <Box flex={1} pl={6}>
              <Text fontSize="xl" mb={6}>
                Gotapes is a social network platform designed to connect and
                share their thoughts, ideas, and updates within the vibrant ape
                community.
              </Text>
              <Text fontSize="2xl" fontWeight="bold" mb={4} align="center">
                Apeeps
              </Text>
              <Text fontSize="xl" mb={6} align="center">
                Apeeps is the term we use to refer to the messages or posts and
                also the heart and soul of Gotapes. It combines elements of
                &quot;ape&quot; and &quot;peeps&quot; (slang for people),
                creating a unique and playful term to describe the vibrant
                conversations and interactions within our community, from
                insightful discussions to playful banter, Apeeps embodies the
                diversity of thoughts and ideas within our platform. Join us and
                start contributing to the lively tapestry of Apeeps!.
              </Text>
              <Text fontSize="2xl" fontWeight="bold" mb={4} align="center">
                Meet Christopher Henry Arias Arcia
              </Text>
              <Text fontSize="xl" align="center">
                Christopher Henry Arias Arcia is a backend developer and the
                creative mind behind Gotapes. With a passion for innovation and
                expertise in backend technologies, Christopher has played a
                crucial role in building and shaping the Gotapes platform. His
                dedication to creating a seamless user experience for ape
                enthusiasts is evident in every aspect of Gotapes.
              </Text>
              <Link
                to="https://www.linkedin.com/in/christopher-henry-arias-arcia-758382228"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Text fontSize="xl" fontWeight="bold" mb={4} align="center">
                  Meet him on LinkedIn
                </Text>
              </Link>
              <Divider my={8} />

              <Flex direction="column" alignItems="center">
                <Heading fontSize="2xl" fontWeight="bold" mb={4}>
                  Our Vision
                </Heading>
                <Text fontSize="xl" align="center">
                  At Gotapes, we envision a world where apes and ape enthusiasts
                  can come together to share their passion, inspire each other,
                  and create meaningful connections. We believe in the power of
                  community and the transformative impact it can have on
                  individuals and society as a whole. Our goal is to foster an
                  inclusive and engaging environment that encourages
                  collaboration, learning, and growth within the ape community.
                  Together, let&apos;s build a future where every ape feels
                  valued, heard, and supported.
                </Text>
              </Flex>

              <Divider my={8} />
              <Flex direction="column" alignItems="center">
                <Heading fontSize="2xl" fontWeight="bold" mb={4}>
                  Join the Gotapes Community
                </Heading>
                <Text fontSize="xl" align="center">
                  Are you an ape enthusiast looking to connect with like-minded
                  individuals? Join the Gotapes community today and explore a
                  world of exciting discussions, creative expression, and
                  engaging interactions. Whether you are a seasoned ape expert
                  or just starting your journey, Gotapes offers a welcoming
                  space where you can share your thoughts, learn from others,
                  and make lasting connections. Join us in celebrating the ape
                  spirit and be a part of a thriving community!
                </Text>
              </Flex>

              <Divider my={8} />

              <Flex direction="column" alignItems="center">
                <Heading fontSize="2xl" fontWeight="bold" mb={4}>
                  Privacy Policy
                </Heading>
                <Text fontSize="xl" align="center">
                  Our users&apos; privacy is of utmost importance to us. We are
                  committed to protecting your personal information and ensuring
                  that your data is handled securely. Our Privacy Policy
                  outlines the types of information we collect, how we use and
                  store it, and your rights and options regarding your data. We
                  encourage you to review our Privacy Policy to understand how
                  we safeguard your privacy and maintain the trust of our
                  community.
                </Text>
                <Link to="/privacy" target="_blank" rel="noopener noreferrer">
                  <Text fontSize="xl" fontWeight="bold" mb={4} align="center">
                    Read our Privacy Policy
                  </Text>
                </Link>
              </Flex>
              <Flex direction="column" alignItems="center">
                <Divider my={8} />
                <Heading fontSize="2xl" fontWeight="bold" mb={4}>
                  Our Team
                </Heading>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
      <Box className="banner_message">
        <Flex
          alignItems="center"
          p={4}
          rounded="md"
          ml={40}
          mt={40}
          maxWidth="60%"
          className="banner_message_content"
        >
          <Box flexShrink={0} mr={4}>
            <Avatar
              src="https://res.cloudinary.com/developersco/image/upload/v1685131948/Apex/Gotapes/uploads/avatars/6462cceafb5eb17a630937db.png"
              alt="christopher arias"
              mr={4}
              mb={170}
              size="lg"
            />
          </Box>
          <Flex direction="column" flex="1">
            <Flex align="center">
              <Link
                to="/user/6462cceafb5eb17a630937db"
                rel="noopener"
                target="_blank"
              >
                <Text fontWeight="bold">Christopher Arias</Text>
              </Link>
              <Box ml={2} mb="2">
                <Image
                  src={CheckBadge}
                  alt="Check Badge"
                  boxSize={6}
                  style={{
                    width: "16px",
                    height: "16px",
                    marginLeft: "10px",
                  }}
                />
              </Box>
              <Text fontSize="sm" fontWeight="normal" color="gray.500" ml={2}>
                @Gotapes
              </Text>
              <Text color="gray.500" ml={2} mr={1}>
                ·
              </Text>
              <Text fontSize="sm" fontWeight="normal" color="gray.500" ml={2}>
                {luxon.DateTime.fromISO(
                  "2023-06-19T00:00:00.000Z"
                ).toRelative()}
              </Text>
            </Flex>
            <Text mt={2} fontWeight="bold" fontSize="30px">
              APEX Innovators (Ape-based Professional Engineering eXperts) is
              the engineering team behind Gotapes. We are a group of genius apes
              with expertise and innovation in the field of engineering. Our
              dedicated team works tirelessly to develop and enhance the
              platform&apos;s features, ensuring a seamless and enjoyable social
              networking experience for all users.
            </Text>
          </Flex>
        </Flex>
      </Box>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        pb={6}
      >
        <Text fontSize="100px" fontWeight="bold" mb={4} align="center">
          Gotapes is for everyone
        </Text>
        <Box
          width="50%"
          borderRadius="56px"
          flexDirection="row"
          paddingRight="64px"
          paddingLeft="64px"
          paddingBottom="56px"
          paddingTop="56px"
          background="rgb(29, 160, 242) none repeat scroll 0% 0% / auto padding-box border-box"
          justifyContent="space-between"
          display="flex"
          boxSizing="border-box"
        >
          <Box boxSizing="border-box">
            <Heading fontSize="2xl" fontWeight="bold" mb={4}>
              Contact Us
            </Heading>
            <Text
              padding="0px"
              margin="0px"
              fontSize="17px"
              lineHeight="30px"
              marginBottom="0px"
              color="rgb(80, 82, 86)"
            >
              We value your feedback and suggestions. If you have any questions,
              concerns, or ideas for improvement, please don&apos;t hesitate to
              reach out to us. Our dedicated support team is here to assist you
              and ensure you have the best experience on Gotapes.
            </Text>
          </Box>
          <Flex alignItems="flex-end" boxSizing="border-box">
            <Box
              border="0px none rgb(255, 255, 255)"
              boxShadow="rgba(8, 11, 14, 0.06) 0px 0px 1px 0px, rgba(8, 11, 14, 0.1) 0px 1px 1px 0px"
              width="14rem"
              borderRadius="16000px"
              height="48px"
              background="rgb(0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box"
              justifyContent="space-between"
              paddingRight="24px"
              paddingLeft="24px"
              lineHeight="24px"
              fontSize="14px"
              transition="all 0.4s ease-in-out 0s"
              fontFamily='"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
              fontWeight={500}
              color="rgb(255, 255, 255)"
              position="relative"
              alignItems="center"
              display="flex"
              boxSizing="border-box"
            >
              Email: christopherarias@hotmail.es
            </Box>
          </Flex>
        </Box>
      </Flex>
      <footer className="footer">
        <Box align="center" bg="gray.900" py={8} px={4}>
          <Flex alignItems="center" justifyContent="center" mb={8}>
            <Heading fontWeight="bold" color="white" mr={2}>
              Keep scrolling on Gotapes
            </Heading>
            <Link to="/">
              <img
                src={button_badge}
                className="button_badge"
                alt="Button Badge"
                width="200px"
                height="100px"
              />
            </Link>
          </Flex>
          <Divider borderColor="gray.600" my={4} />
          <Flex
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Box flex="0 0 100%" mb={4} align="left">
              <Flex alignItems="center" justifyContent="space-between">
                <Box mr={4}>
                  <img src={logo} alt="Logo" width="100" height="100" />
                </Box>
                <Box>
                  <Text fontSize="xl" fontWeight="bold" mb={2} color="white">
                    Brand
                  </Text>
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    <li style={{ margin: "8px 0" }}>
                      <Link
                        to="/"
                        component={Text}
                        fontSize="xl"
                        fontWeight="bold"
                        color="gray.300"
                        align="center"
                      >
                        Home
                      </Link>
                    </li>
                    <li style={{ margin: "8px 0" }}>
                      <Link
                        to="/status"
                        component={Text}
                        fontSize="xl"
                        fontWeight="bold"
                        color="gray.300"
                        align="center"
                      >
                        Status
                      </Link>
                    </li>
                  </ul>
                </Box>
                <Box>
                  <Text fontSize="xl" fontWeight="bold" mb={2} color="white">
                    Legal notices
                  </Text>
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    <li style={{ margin: "8px 0" }}>
                      <Link
                        to="/privacy"
                        component={Text}
                        fontSize="xl"
                        fontWeight="bold"
                        color="gray.300"
                        align="center"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li style={{ margin: "8px 0" }}>
                      <Link
                        to="/tos"
                        component={Text}
                        fontSize="xl"
                        fontWeight="bold"
                        color="gray.300"
                        align="center"
                      >
                        Terms of Service
                      </Link>
                    </li>
                    <li style={{ margin: "8px 0" }}>
                      <Link
                        to="/cookies"
                        component={Text}
                        fontSize="xl"
                        fontWeight="bold"
                        color="gray.300"
                        align="center"
                      >
                        Cookies Policy
                      </Link>
                    </li>
                  </ul>
                </Box>
              </Flex>
            </Box>
          </Flex>
          <Box width="100%" fontSize="sm" color="gray.500" align="right">
            {new Date().getFullYear() > 2021 && ` ${new Date().getFullYear()}`}{" "}
            ©Gotapes
          </Box>
        </Box>
      </footer>
    </Flex>
  );
}
