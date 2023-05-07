import * as yup from "yup";
export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name is too short")
    .max(20, "Name is too long"),
  lastname: yup
    .string()
    .required("Last Name is required")
    .min(3, "Last Name is too short")
    .max(20, "Last Name is too long"),
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Email is not valid"
    )
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])([^\s]){5,}$/,
      "Password must contain at least 5 characters, ⚡ one letter ⚡ one number"
    )
    .required("Password is required"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Repeat Password is required"),
});
