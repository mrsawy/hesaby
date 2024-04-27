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
// ____________ account schema
export const accountSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  price: yup.number().positive("Price must be a positive number").required("Price is required"),
  game_id: yup.string().required("Game ID is required"),
  platform_id: yup.string().required("Platform ID is required"),
  mainImage: yup
    .mixed()
    .test(
      "fileSize",
      "Main image is too large",
      (value: any) => (value && value[0] ? value[0].size <= 1024 * 1024 * 6 : true) // 6MB limit
    )
    .test("isImage", "main image must be an image", function (value: any) {
      if (value == "undefined" || value)
        return (
          value &&
          (value.type === "image/jpg" ||
            value.type === "image/jpeg" ||
            value.type === "image/png" ||
            value.type === "image/webp")
        );
      else {
        return true;
      }
    })
    .required("Main image is required"),
  gallery: yup
    .array()
    .min(1, `Please add at least one image into gallery`)
    .of(
      yup.mixed().test("fileSize", "Gallery images is not valid", function (value: any) {
        if (value == "undefined" || value)
        return (
          value &&
          (value.type === "image/jpg" ||
            value.type === "image/jpeg" ||
            value.type === "image/png" ||
            value.type === "image/webp")
        );
        else {
          return true;
        }
      })
    ),
});
