import axios from "axios";
const API_URL = "/api/auth/";
import { RegisterData } from "../auth/authSlice";

const register = async (userData: RegisterData) => {
  const response = await axios.post(API_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const authServie = {
  register,
};

export default authServie;

// const response = await axios.post("http://localhost:3000register", userData);
// if (response.status === 201) {
//   return response.data;
// } else {
//   throw new Error(response.data.message);
// }
