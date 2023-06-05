import axios from "axios";
const API_URL = "/api/auth/";
import { FieldValues } from "../../../pages/auth/Register";

// Regiter user
const register = async (userData: FieldValues) => {
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
