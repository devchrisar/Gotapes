import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  Image,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { size, values } from "lodash";
import Logo from "/assets/svg/logo_Gotapes-svg.svg";
import ErrIcon from "/assets/svg/close-cancel.svg";
import bg_image from "/assets/svg/rest_pssBG.png";
import toast from "react-hot-toast";
import Tilt from "react-vanilla-tilt";
import { DateTime } from "luxon";
import jwtDecode from "jwt-decode";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { userResetPasswordSchema } from "../../utils/validation";
import {
  resetPassword,
  signInUserAfterReset,
  setTokenApi,
} from "../../api/auth";
import "./ForgotPassword.scss";

function initialFormValue() {
  return {
    password: "",
    repeatPassword: "",
  };
}

export default function ForgotPassword(props) {
  const { setRefreshCheckLogin } = props;
  const [errors, setErrors] = useState({});
  const [loading, SetisLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormValue());
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [expirationTime, setExpirationTime] = useState("");

  const navigate = useNavigate();
  const { token } = useParams();
  const decodedB64Token = atob(token);
  const decodedToken = jwtDecode(decodedB64Token);

  useEffect(() => {
    if (decodedToken.exp < Date.now() / 1000) {
      setIsPageLoaded(true);
      setIsTokenExpired(true);
    }
    const calculateExpirationTime = () => {
      const expirationDate = DateTime.fromSeconds(decodedToken.exp);
      const relativeTime = expirationDate.toRelative();
      setExpirationTime(relativeTime);
    };

    calculateExpirationTime();
  }, [decodedToken.exp]);

  const validateForm = async () => {
    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });
    try {
      await userResetPasswordSchema.validate(formData, { abortEarly: false });
      SetisLoading(true);

      resetPassword(formData.password, decodedB64Token)
        .then((response) => {
          if (response.message) {
            toast.error(response.message);
          } else {
            toast.success("Password reset successful");

            signInUserAfterReset(decodedToken.email, formData.password)
              .then((response) => {
                if (response.message) {
                  toast.error(response.message);
                } else {
                  setTokenApi(response.token);
                  setRefreshCheckLogin(true);
                  setFormData(initialFormValue());
                  navigate("/");
                }
              })
              .catch(() => {
                toast.error("Internal server error, try again later", {
                  className: "toast__container",
                });
              })
              .finally(() => {
                SetisLoading(false);
              });
          }
        })
        .catch((error) => {
          toast.error(error.message, {
            className: "toast__container",
          });
        })
        .finally(() => {
          SetisLoading(false);
        });
    } catch (error) {
      const validationErrors = (error.inner || []).reduce((errors, err) => {
        errors[err.path] = err.message;
        return errors;
      }, {});
      setErrors(validationErrors);
      if (validCount !== size(formData)) {
        toast.error("You must fill in all the fields in the form", {
          className: "toast__container",
        });
      } else {
        Object.values(validationErrors).forEach((errorMessage) => {
          toast.error(errorMessage, {
            className: "toast__container",
          });
        });
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    validateForm();
  };

  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const handleRepeatPasswordChange = (e) => {
    setFormData({ ...formData, repeatPassword: e.target.value });
  };

  return (
    <Box
      cursor="auto"
      height="860.377px"
      margin="0px"
      padding="0px"
      boxSizing="border-box"
      fontSize="16px"
      fontWeight={400}
      lineHeight="24px"
      color="rgb(33, 37, 41)"
      backgroundColor="rgb(255, 255, 255)"
    >
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
            Reset Password
          </Text>
        </Flex>
      </Box>
      <Helmet>
        <title>Gotapes - Reset Password</title>
        <meta
          name="description"
          content="Reset your password and get back to Gotapes"
        />
      </Helmet>
      <Flex width="100%" margin="0px auto" padding="0px" boxSizing="border-box">
        <Flex
          width="100%"
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          padding="25px"
          background="#15212b"
          margin="0px"
          boxSizing="border-box"
        >
          <Flex
            width="960px"
            background="rgb(255, 255, 255)"
            borderRadius="10px"
            overflow="hidden"
            display="flex"
            flexWrap="wrap"
            justifyContent="space-between"
            padding="177px 130px 33px 95px"
            margin="0px"
            boxSizing="border-box"
          >
            <Box
              data-tilt=""
              width="316px"
              margin="0px"
              padding="0px"
              boxSizing="border-box"
            >
              <Tilt>
                <Image
                  src={bg_image}
                  alt="an image of the logo of Gotapes inside a blue rectangle"
                  maxWidth="100%"
                  margin="0px"
                  padding="0px"
                  boxSizing="border-box"
                  verticalAlign="middle"
                  borderStyle="none"
                />
              </Tilt>
            </Box>
            <Box
              data-bitwarden-watching="1"
              width="290px"
              margin="0px"
              padding="0px"
              boxSizing="border-box"
            >
              <Text
                fontSize="24px"
                color="rgb(51, 51, 51)"
                lineHeight="28.8px"
                textAlign="center"
                width="100%"
                display="block"
                paddingBottom="54px"
                margin="0px"
                padding="0px 0px 54px"
                boxSizing="border-box"
              >
                Reset Password
              </Text>
              <Box
                position="relative"
                width="100%"
                zIndex={1}
                marginBottom="10px"
                margin="0px 0px 10px"
                padding="0px"
                boxSizing="border-box"
              >
                <FormControl>
                  <FormLabel>Type in the new password</FormLabel>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={handlePasswordChange}
                    isInvalid={!!errors.password}
                    isReadOnly={isTokenExpired}
                  />
                  {errors.password && (
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  )}
                </FormControl>
                <Box
                  display="block"
                  position="absolute"
                  borderRadius="25px"
                  bottom="0px"
                  left="0px"
                  pointerEvents="none"
                  width="100%"
                  overflow="hidden"
                  transform="translateZ(0px)"
                >
                  <Box
                    position="absolute"
                    borderRadius="25px"
                    top="0px"
                    left="0px"
                    width="100%"
                    height="100%"
                    opacity={0}
                    transition="opacity 0.3s ease 0s, transform 0.3s ease 0s"
                    pointerEvents="none"
                    transform="translateZ(0px)"
                    zIndex={1}
                  ></Box>
                </Box>
              </Box>
              <Box
                position="relative"
                width="100%"
                zIndex={1}
                marginBottom="10px"
                margin="0px 0px 10px"
                padding="0px"
                boxSizing="border-box"
              >
                <FormControl>
                  <FormLabel>Type the new password once more</FormLabel>
                  <Input
                    type="password"
                    value={formData.repeatPassword}
                    onChange={handleRepeatPasswordChange}
                    isInvalid={!!errors.repeatPassword}
                    isReadOnly={isTokenExpired}
                  />
                  {errors.repeatPassword && (
                    <FormErrorMessage>{errors.repeatPassword}</FormErrorMessage>
                  )}
                </FormControl>
                <Box
                  display="block"
                  position="absolute"
                  borderRadius="25px"
                  bottom="0px"
                  left="0px"
                  pointerEvents="none"
                  width="100%"
                  overflow="hidden"
                  transform="translateZ(0px)"
                >
                  <Box
                    position="absolute"
                    borderRadius="25px"
                    top="0px"
                    left="0px"
                    width="100%"
                    height="100%"
                    opacity={0}
                    transition="opacity 0.3s ease 0s, transform 0.3s ease 0s"
                    pointerEvents="none"
                    transform="translateZ(0px)"
                    zIndex={1}
                  ></Box>
                </Box>
              </Box>
              <Flex
                width="100%"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                margin="0px"
                padding="0px"
                boxSizing="border-box"
              >
                <Button
                  type="submit"
                  fontSize="15px"
                  lineHeight="22.5px"
                  textAlign="center"
                  textTransform="uppercase"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  height="49.9953px"
                  borderRadius="25px"
                  padding="0px"
                  margin="0px"
                  boxSizing="border-box"
                  border="none"
                  transition="background 0.3s ease 0s"
                  outline="none"
                  overflow="visible"
                  onClick={onSubmit}
                  isDisabled={isTokenExpired}
                  _hover={{ bg: "#1da1f2", color: "#fff", opacity: 0.8 }}
                >
                  {loading ? <Spinner /> : "Reset Password"}
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Flex>
      {isPageLoaded && isTokenExpired && (
        <Box
          m="auto"
          maxW="md"
          w="full"
          bg="white"
          shadow="lg"
          rounded="lg"
          p={4}
          mt={8}
          border="1px"
          borderColor="gray.200"
          pointerEvents="auto"
          className="toast__container"
        >
          <Flex>
            <Image src={ErrIcon} alt="logo" h="50px" />
            <Box ml={3} flex={1}>
              <Text fontSize="sm" fontWeight="medium" color="white.900">
                the link to reset your password has expired, please request a
                new one
              </Text>
              <Text mt={1} fontSize="sm" color="gray.500">
                time of expiration: {expirationTime}
              </Text>
            </Box>
          </Flex>
          <Flex mt={4} borderColor="gray.200"></Flex>
        </Box>
      )}
    </Box>
  );
}
