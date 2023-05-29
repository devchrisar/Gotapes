import { React, useState } from "react";
import "./SignInSignUp.scss";
import {
  Box,
  Flex,
  Container,
  Image,
  Text,
  Stack,
  Button,
  Heading,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUsers,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../components/Modal/BasicModal/BasicModal";
import SignUpForm from "../../components/SingUpForm/SingUpForm";
import SignInForm from "../../components/SignInForm/SignInForm";
import LogoWhite from "/assets/svg/logo_GotapesWt-png.png";
import Logo from "/assets/svg/logo_Gotapes-svg.svg";

export default function SignInSignUp(props) {
  const { setRefreshCheckLogin } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const openModal = (content) => {
    setShowModal(true);
    setContentModal(content);
  };
  return (
    <>
      <Box minH="100vh">
        <Container maxW="none" m="0" p="0" className="signin_signup">
          <Flex>
            <LeftComponent />
            <RightComponent
              openModal={openModal}
              setShowModal={setShowModal}
              setRefreshCheckLogin={setRefreshCheckLogin}
            />
          </Flex>
        </Container>
        <BasicModal show={showModal} setShow={setShowModal}>
          {contentModal}
        </BasicModal>
      </Box>
    </>
  );
}

function LeftComponent() {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <Box className="signin_signup__left" w="50%" h="100vh">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        <Image className="signin_signup__left__logo" src={Logo} alt="logo" />
        <Stack spacing="40px">
          <Text className="signin_signup__left__title">
            <FontAwesomeIcon icon={faUsers} />
            Where the ape community comes alive!🐵
          </Text>
          <Text className="signin_signup__left__title">
            <FontAwesomeIcon icon={faSearch} />
            Stop searching, start finding
          </Text>
          <Text className="signin_signup__left__title">
            <FontAwesomeIcon icon={faComment} />
            Get wild with your ideas
          </Text>
        </Stack>
      </motion.div>
    </Box>
  );
}

function RightComponent(props) {
  const { openModal, setShowModal, setRefreshCheckLogin } = props;
  return (
    <Box className="signin_signup__right" w="50%" h="100vh">
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box className="signin_signup__right__content">
          <Image src={LogoWhite} alt="logo" />
          <Heading as="h2">
            Embrace your primal instincts and express yourself on Gotapes - the
            social network for apes who are not afraid to show their true
            colors!
          </Heading>
          <Text as="h3">Sign up to get started</Text>
          <Button
            className="btn btn-primary"
            onClick={() =>
              openModal(<SignUpForm setShowModal={setShowModal} />)
            }
          >
            Create Account
          </Button>
          <Text>
            By signing up, you agree to the{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://gotapes.netlify.app/tos"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="https://gotapes.netlify.app/privacy"
              target="_blank"
              rel="noreferrer"
            >
              Privacy Policy
            </a>
            , including the
            <a
              target="_blank"
              rel="noreferrer"
              href="https://gotapes.netlify.app/gotapes&cookies"
            >
              {" "}
              Cookie Policy
            </a>
            .
          </Text>
          <Text as="h3">¿Already have an account?</Text>
          <Button
            className="btn btn-outline-primary"
            onClick={() =>
              openModal(
                <SignInForm
                  setShowModal={setShowModal}
                  setRefreshCheckLogin={setRefreshCheckLogin}
                />
              )
            }
          >
            Sign In
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
}
