import * as yup from "yup";

export const RegisterValidationSchema = yup.object({
  username: yup.string().required().min(5),
  email: yup.string().required().email(),
  password: yup.string().required().min(5),
});

export const LoginValidationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(5),
});

export const CreatePostValidationSchema = yup.object({
  text: yup.string().required(),
});
