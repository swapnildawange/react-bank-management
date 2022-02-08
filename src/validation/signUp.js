import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  firstName: yup.string().required(),
  middleName: yup.string().required(),
  lastName: yup.string().required(),
  gender: yup.string().required(),
  day: yup.number().min(1).max(31).required(),
  month: yup.number().min(1).max(12).required(),
  year: yup.number().min(1996).required(),
  email: yup.string().email(),
  password: yup.string().required(),
});
