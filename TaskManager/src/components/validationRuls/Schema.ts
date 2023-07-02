import * as yup from "yup";
export type FieldValues = Record<string, unknown>;

const errorMessage = {
  invalidEmail: "ایمیل نامعتبر",
  required: "این بخش  الزامیست",
  minPass: "رمز عبور باید حداقل 8 کاراکتر باشد",
  maxPass: "رمز عبور حداکثر میتواند 20 کاراکتر باشد",
  complexPass:
    "رمز عبور باید حداقل دارای یک حرف بزرگ، یک عدد و یک کاراکتر خاص باشد",
  match: "کلمه عبورها مطابقت ندارند",
  invalidPhoneNum: "شماره تلفن معتبر نیست",
  minUsername: "نام کاربری باید حداقل 3 کاراکتر باشد",
  maxUsername: "نام کاربری نمی تواند بیشتر از 20 کاراکتر باشد",
  usernameLimitations:
    "نام کاربری فقط می تواند شامل حروف، اعداد، نقطه و زیرخط باشد",
};

const register = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3, errorMessage.minUsername)
    .max(20, errorMessage.maxUsername)
    .required("Username is required")
    .matches(/^[a-zA-Z0-9._]+$/, errorMessage.usernameLimitations),
  email: yup
    .string()
    .email(errorMessage.invalidEmail)
    .required(errorMessage.required),
  password: yup
    .string()
    .min(8, errorMessage.minPass)
    .max(20, errorMessage.maxPass)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      errorMessage.complexPass
    )
    .required(errorMessage.required),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], errorMessage.match)
    .required(errorMessage.required),
  checkbox: yup.bool().oneOf([true]),
});

const login = yup.object().shape({
  email: yup
    .string()
    .email(errorMessage.invalidEmail)
    .required(errorMessage.required),
  password: yup
    .string()
    .min(8, errorMessage.minPass)
    .max(20, errorMessage.maxPass)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      errorMessage.complexPass
    )
    .required(errorMessage.required),
});
const forgot = yup.object().shape({
  email: yup
    .string()
    .email(errorMessage.invalidEmail)
    .required(errorMessage.required),
});
const accountInfo = yup.object().shape({
  email: yup
    .string()
    .email(errorMessage.invalidEmail)
    .required(errorMessage.required),
  password: yup
    .string()
    .min(8, errorMessage.minPass)
    .max(20, errorMessage.maxPass)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      errorMessage.complexPass
    )
    .required(errorMessage.required),
  username: yup
    .string()
    .trim()
    .min(3, errorMessage.minUsername)
    .max(20, errorMessage.maxUsername)
    .required("Username is required")
    .matches(/^[a-zA-Z0-9._]+$/, errorMessage.usernameLimitations),
});
const personalInfo = yup.object().shape({
  firstName: yup.string().required(errorMessage.required),
  lastName: yup.string().required(errorMessage.required),
  email: yup
    .string()
    .email(errorMessage.invalidEmail)
    .required(errorMessage.required),
  // phoneNumber: yup
  //   .string()
  //   .required(errorMessage.required)
  //   .matches(/^[0-9]{11}$/, errorMessage.invalidPhoneNum),
});
const newTask = yup.object().shape({
  taskTitle: yup.string().required(errorMessage.required),
  descTask: yup.string().required(errorMessage.required),
});

const Schema = {
  register,
  accountInfo,
  forgot,
  login,
  personalInfo,
  newTask
};

export default Schema;
