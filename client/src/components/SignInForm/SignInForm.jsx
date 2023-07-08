import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  FormLabel,
  FormControl,
  FormErrorMessage,
  Button,
  Input,
  Heading,
  Text,
  Link,
  Spinner,
  Flex,
  Icon,
  Box,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import "./SignInForm.scss";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { values, size, isEmpty } from "lodash";
import {
  loginFieldSchema,
  userForgotPasswordSchema,
} from "../../utils/validation";
import {
  signInApi,
  setTokenApi,
  checkGoogleAccountExists,
  checkUsernameExists,
  sendPasswordResetEmail,
} from "../../api/auth";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import SignUpForm from "../SingUpForm/SingUpForm";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function initialFormValue() {
  return {
    email: "",
    password: "",
  };
}

export default function SignInForm(props) {
  const { setShowModal, setRefreshCheckLogin } = props;
  const [formData, setFormData] = useState(initialFormValue());
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [isLoading, SetisLoading] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(true);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isUserForgotPassword, setIsUserForgotPassword] = useState(false);
  const [userClaimNewPassword, setUserClaimNewPassword] = useState("");

  let validCount = 0;

  const navigate = useNavigate();

  const goToNextStep = () => {
    setStep(step + 1);
  };

  const displayErrorToast = (errorMessage) => {
    toast.error(errorMessage, {
      className: "toast__container",
    });
  };

  const validateEmail = async () => {
    try {
      await loginFieldSchema.validate(
        { email: formData.email },
        { abortEarly: false },
      );
      setErrors({});
      goToNextStep();
    } catch (error) {
      const validationErrors = (error.inner || []).reduce((errors, err) => {
        errors[err.path] = err.message;
        return errors;
      }, {});
      setErrors(validationErrors);
      if (validCount !== size(formData)) {
        displayErrorToast("You must fill in all the fields in the form");
      } else {
        Object.values(validationErrors).forEach((errorMessage) => {
          displayErrorToast(errorMessage);
        });
      }
    }
  };

  const validateForm = async () => {
    try {
      await loginFieldSchema.validate(formData, { abortEarly: false });
      SetisLoading(true);
      signInApi(formData)
        .then((response) => {
          if (response.message) {
            displayErrorToast(response.message);
          } else {
            setTokenApi(response.token);
            setRefreshCheckLogin(true);

            setFormData(initialFormValue());
            setShowModal(false);
          }
        })
        .catch(() => {
          displayErrorToast("Internal server error, try again later");
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
        displayErrorToast("You must fill in all the fields in the form");
      } else {
        Object.values(validationErrors).forEach((errorMessage) => {
          displayErrorToast(errorMessage);
        });
      }
    }
  };

  const handleGoogleSignIn = async (credential) => {
    try {
      const decodedToken = jwtDecode(credential);
      const email = decodedToken.email;

      const accountExists = await checkGoogleAccountExists(email);
      if (accountExists.exists) {
        const user = {
          email,
          password: "",
        };

        const signInResponse = await signInApi(user);
        const { token } = signInResponse;

        if (token) {
          setTokenApi(token);
          setRefreshCheckLogin(true);
          setShowModal(false);
        } else {
          displayErrorToast("Failed to sign in with Google");
        }
      } else {
        displayErrorToast("The account does not exist. Please register first.");
      }
    } catch (error) {
      displayErrorToast("Internal server error, try again later");
    } finally {
      SetisLoading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });

    if (step === 1) {
      await validateEmail();
    } else if (step === 2) {
      await validateForm();
    }
  };

  const sendPasswordResetEmailAndHandleResponse = async (userClaim) => {
    try {
      const emailResponse = await sendPasswordResetEmail(userClaim);
      if (emailResponse.status === 200) {
        toast.success("Email sent successfully", {
          className: "toast__container",
        });
        setShowModal(false);
        navigate("/forgot-password");
      } else if (emailResponse.status === 429) {
        displayErrorToast(
          "Too many requests, try again later or wait 30 minutes",
        );
      } else {
        displayErrorToast("Failed to send the email. Please try again.");
      }
    } catch (error) {
      displayErrorToast("Internal server error, try again later");
    }
  };

  const handleForgotPasswordSubmitForUsername = async () => {
    try {
      SetisLoading(true);
      const response = await checkUsernameExists(userClaimNewPassword);
      if (!response.exists) {
        displayErrorToast(
          "The account does not exist | email or @username are incorrect",
        );
      } else {
        await sendPasswordResetEmailAndHandleResponse(userClaimNewPassword);
      }
    } catch (error) {
      displayErrorToast("Internal server error, try again later");
    } finally {
      SetisLoading(false);
    }
  };

  const handleForgotPasswordSubmitForEmail = async () => {
    try {
      SetisLoading(true);
      const exists = (await checkGoogleAccountExists(userClaimNewPassword))
        .exists;
      if (exists) {
        await sendPasswordResetEmailAndHandleResponse(userClaimNewPassword);
      } else {
        displayErrorToast(
          "The account does not exist | email or @username are incorrect",
        );
      }
    } catch (error) {
      displayErrorToast("Internal server error, try again later");
    } finally {
      SetisLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await userForgotPasswordSchema.validate(
        { userClaimNewPassword },
        { abortEarly: false },
      );

      if (isEmpty(userClaimNewPassword)) {
        displayErrorToast("You must fill in this field");
        return;
      }

      if (userClaimNewPassword.startsWith("@")) {
        await handleForgotPasswordSubmitForUsername();
      } else {
        await handleForgotPasswordSubmitForEmail();
      }
    } catch (error) {
      const validationErrors = (error.inner || []).reduce((errors, err) => {
        errors[err.path] = err.message;
        return errors;
      }, {});
      setErrors(validationErrors);
      Object.values(validationErrors).forEach((errorMessage) => {
        displayErrorToast(errorMessage);
      });
    }
  };

  const handleGoogleLoginSuccess = ({ credential }) => {
    SetisLoading(true);
    handleGoogleSignIn(credential);
  };

  const handleGoogleLoginFailure = () => {
    displayErrorToast("Failed to sign in with Google");
  };

  const handleGoogleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
    setIsEmailEmpty(e.target.value === "");
  };

  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handleRouteUserToSignUp = () => {
    setIsSigningUp(true);
  };

  const handleRouteUserToForgotPassword = () => {
    setIsUserForgotPassword(true);
  };

  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const renderSignUpForm = () => {
    return <SignUpForm setShowModal={setShowModal} />;
  };

  const renderForgotPasswordForm = () => {
    return (
      <div className="sign-in-form__forgot-password">
        <Heading as="h2">Forgot password</Heading>
        <Text>
          If you provide your email address or @username if you don&apos;t
          remember it, we&apos;ll send you a link to reset your password.
        </Text>
        <FormControl>
          <FormLabel>Email | @username</FormLabel>
          <Input
            type="text"
            value={userClaimNewPassword}
            onChange={(e) => setUserClaimNewPassword(e.target.value)}
            isInvalid={!!errors.userClaimNewPassword}
          />
        </FormControl>
        <Button
          onClick={handleForgotPasswordSubmit}
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          {!isLoading ? "Send" : <Spinner />}
        </Button>
        <Button
          className="btn_Back"
          variant="unstyled"
          onClick={() => setIsUserForgotPassword(false)}
        >
          <Icon as={FontAwesomeIcon} icon={faArrowLeftLong} />
        </Button>
      </div>
    );
  };

  const renderSignInForm = () => {
    return (
      <motion.div
        className="sign-in-form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Heading as="h2">Sign in to Gotapes</Heading>
        {step === 1 && (
          <>
            <Button>
              <GoogleOAuthProvider clientId="1060640613666-8iuuruthub48ehgu3ljtuqa2t7tol77v.apps.googleusercontent.com">
                <GoogleLogin
                  theme="filled_blue"
                  shape="pill"
                  text="signin_with"
                  onSuccess={handleGoogleLoginSuccess}
                  onFailure={handleGoogleLoginFailure}
                />
              </GoogleOAuthProvider>
            </Button>

            <div className="sign-in-form__lineGroup">
              <div className="sign-in-form__lineGroup__line_left"></div>
              <div className="sign-in-form__lineGroup__line_text">Or</div>
              <div className="sign-in-form__lineGroup__line_right"></div>
            </div>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={formData.email}
                onChange={handleGoogleEmailChange}
                isInvalid={!!errors.email}
              />
              {errors.email && (
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              )}
            </FormControl>
            <Button
              className="btn btn-primary"
              onClick={goToNextStep}
              isDisabled={isEmailEmpty}
            >
              Next
            </Button>
            <Button onClick={handleRouteUserToForgotPassword}>
              ¿Forgot password?
            </Button>
            <Text mt={4} fontSize="sm">
              Don&apos;t have an account?{" "}
              <Link color="blue.500" onClick={handleRouteUserToSignUp}>
                Register
              </Link>
            </Text>
          </>
        )}

        {step === 2 && (
          <>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={formData.email}
                isReadOnly={true}
                onChange={handleEmailChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={formData.password}
                onChange={handlePasswordChange}
                isInvalid={!!errors.password}
              />
              {errors.password && (
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              )}
            </FormControl>
            <Button colorScheme="blue" type="submit" onClick={onSubmit}>
              {!isLoading ? "Sign In" : <Spinner />}
            </Button>
            <Box mt={4} fontSize="sm">
              <Flex justify="space-between">
                <Link
                  color="blue.500"
                  onClick={handleRouteUserToForgotPassword}
                >
                  Forgot password?
                </Link>{" "}
                <Link color="blue.500" onClick={handleRouteUserToSignUp}>
                  Don&apos;t have an account? Register
                </Link>
              </Flex>
            </Box>
          </>
        )}
      </motion.div>
    );
  };

  function renderContent() {
    if (isUserForgotPassword) {
      return renderForgotPasswordForm();
    } else if (isSigningUp) {
      return renderSignUpForm();
    } else {
      return renderSignInForm();
    }
  }
  return (
    <div className="sign-in-form">
      <Helmet>
        <title>Gotapes - Sign In</title>
        <meta
          name="description"
          content="Sign in to Gotapes and connect with your friends"
        />
      </Helmet>
      {renderContent()}
    </div>
  );
}
