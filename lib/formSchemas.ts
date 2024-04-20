import * as yup from "yup";

export const userLogin = yup.object().shape({
  password: yup.string().min(6).required(),
  email: yup.string().email().required(),
});

export const userSignup = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().min(6).required(),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Password confirmation is required"),
  email: yup.string().email().required(),
  phoneNumber: yup.string().required(),
});
