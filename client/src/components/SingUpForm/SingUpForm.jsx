import React, { useState } from "react";
import "./SingUpForm.scss";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  HStack,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { values, size } from "lodash";
import toast from "react-hot-toast";
import { validationSchema } from "../../utils/validation";
import { signUpApi } from "../../api/auth";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

export default function SingUpForm(props) {
  const { setShowModal } = props;
  const [formData, setFormData] = useState(initialFormValue());
  const [errors, setErrors] = useState({});
  const [singUpLoading, SetsingUpLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      SetsingUpLoading(true);
      signUpApi(formData)
        .then((response) => {
          if (response.code) {
            toast.error(response.message, {
              className: "toast__container",
            });
          } else {
            toast.success("Registration successful", {
              className: "toast__container",
            });
            setFormData(initialFormValue());
            setShowModal(false);
          }
        })
        .catch(() => {
          toast.error("Error when registering the user", {
            className: "toast__container",
          });
        })
        .finally(() => {
          SetsingUpLoading(false);
        });
    } catch (error) {
      const validationErrors = (error.inner || []).reduce((errors, err) => {
        errors[err.path] = err.message;
        return errors;
      }, {});
      setErrors(validationErrors);
      if (validCount !== size(formData)) {
        toast.error("you must fill in all the fields in the form", {
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
  return (
    <div className="sing-up-form">
      <motion.div
        className="sing-up-form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Heading as="h2">Join Gotapes today</Heading>
        <FormControl id="name">
          <HStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                isInvalid={!!errors.name}
              />
              {errors.name && (
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                isInvalid={!!errors.lastName}
              />
              {errors.lastName && (
                <FormErrorMessage>{errors.lastName}</FormErrorMessage>
              )}
            </FormControl>
          </HStack>
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            isInvalid={!!errors.email}
          />
          {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
        </FormControl>
        <FormControl id="password">
          <HStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                isInvalid={!!errors.password}
              />
              {errors.password && (
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Repeat Password</FormLabel>
              <Input
                type="password"
                value={formData.repeatPassword}
                onChange={(e) =>
                  setFormData({ ...formData, repeatPassword: e.target.value })
                }
                isInvalid={!!errors.repeatPassword}
              />
              {errors.repeatPassword && (
                <FormErrorMessage>{errors.repeatPassword}</FormErrorMessage>
              )}
            </FormControl>
          </HStack>
        </FormControl>
        <Button type="submit" onClick={onSubmit} isDisabled={singUpLoading}>
          {!singUpLoading ? "Sign Up" : <Spinner />}
        </Button>
        <div className="sing-up-form__lineGroup">
          <div className="sing-up-form__lineGroup__line_left"></div>
          <div className="sing-up-form__lineGroup__line_text">Or</div>
          <div className="sing-up-form__lineGroup__line_right"></div>
        </div>
        <Button>
          <GoogleOAuthProvider clientId="1060640613666-8iuuruthub48ehgu3ljtuqa2t7tol77v.apps.googleusercontent.com">
            <GoogleLogin
              theme="filled_blue"
              shape="pill"
              text="signup_with"
              onSuccess={(credentialResponse) => {
                const { credential } = credentialResponse;
                const decoded = jwtDecode(credential);
                const { given_name, family_name, email, picture } = decoded;

                const data = {
                  name: given_name,
                  lastName: family_name,
                  email: email,
                  avatar: picture,
                  GoogleSignUp: true,
                };

                SetsingUpLoading(true);
                signUpApi(data)
                  .then((response) => {
                    if (response.code) {
                      toast.error(response.message, {
                        className: "toast__container",
                      });
                    } else {
                      toast.success("Registration successful", {
                        className: "toast__container",
                      });
                      setShowModal(false);
                    }
                  })
                  .catch(() => {
                    toast.error("Error when registering the user", {
                      className: "toast__container",
                    });
                  })
                  .finally(() => {
                    SetsingUpLoading(false);
                  });
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
        </Button>
      </motion.div>
    </div>
  );
}

function initialFormValue() {
  return {
    name: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
}
