import * as yup from "yup";
export type FieldValues = Record<string, any>;

const errorMessage = {
  required: "این بخش  الزامیست",
  minPass: "رمز عبور باید حداقل 8 کاراکتر باشد",
  maxPass: "رمز عبور حداکثر میتواند 20 کاراکتر باشد",
  match: "کلمه عبورها مطابقت ندارند",
};

const schema = yup.object().shape({
  fullName: yup.string().required(errorMessage.required),
  email: yup.string().email("ایمیل نامعتبر").required(errorMessage.required),
  password: yup
    .string()
    .min(8, errorMessage.minPass)
    .max(20, errorMessage.maxPass)
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], errorMessage.match)
    .required(errorMessage.required),
  checkbox: yup.bool().oneOf([true]),
});

export { schema };
