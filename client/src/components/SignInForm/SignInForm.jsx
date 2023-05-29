import React, { useState } from "react";
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
} from "@chakra-ui/react";
import "./SignInForm.scss";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { values, size } from "lodash";
import { loginFieldSchema } from "../../utils/validation";
import {
  signInApi,
  setTokenApi,
  checkGoogleAccountExists,
} from "../../api/auth";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import SignUpForm from "../SingUpForm/SingUpForm";
import jwtDecode from "jwt-decode";

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
  const [signInLoading, SetsignInLoading] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(true);
  const [isSigningUp, setIsSigningUp] = useState(false);

  let validCount = 0;

  const goToNextStep = () => {
    setStep(step + 1);
  };

  const validateEmail = async () => {
    try {
      await loginFieldSchema.validate(
        { email: formData.email },
        { abortEarly: false }
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

  const validateForm = async () => {
    try {
      await loginFieldSchema.validate(formData, { abortEarly: false });
      SetsignInLoading(true);
      signInApi(formData)
        .then((response) => {
          if (response.message) {
            toast.error(response.message, {
              className: "toast__container",
            });
          } else {
            setTokenApi(response.token);
            setRefreshCheckLogin(true);

            setFormData(initialFormValue());
            setShowModal(false);
          }
        })
        .catch(() => {
          toast.error("Internal server error, try again later", {
            className: "toast__container",
          });
        })
        .finally(() => {
          SetsignInLoading(false);
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
          toast.error("Failed to sign in with Google", {
            className: "toast__container",
          });
        }
      } else {
        toast.error("The account does not exist. Please register first.", {
          className: "toast__container",
        });
      }
    } catch (error) {
      toast.error("Internal server error, try again later", {
        className: "toast__container",
      });
    } finally {
      SetsignInLoading(false);
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

  const handleGoogleLoginSuccess = ({ credential }) => {
    SetsignInLoading(true);
    handleGoogleSignIn(credential);
  };

  const handleGoogleLoginFailure = () => {
    toast.error("Failed to sign in with Google", {
      className: "toast__container",
    });
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

  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  return (
    <div className="sign-in-form">
      {isSigningUp ? (
        <SignUpForm setShowModal={setShowModal} />
      ) : (
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
              <Button>¿Forgot password?</Button>
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
              <FormLabel>Password</FormLabel>
              <FormControl>
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
                {!signInLoading ? "Sign In" : <Spinner />}
              </Button>
              <Text mt={4} fontSize="sm">
                <Flex justify="space-between">
                  <Link color="blue.500">Forgot password?</Link>{" "}
                  <Link color="blue.500" onClick={handleRouteUserToSignUp}>
                    Don&apos;t have an account? Register
                  </Link>
                </Flex>
              </Text>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}
