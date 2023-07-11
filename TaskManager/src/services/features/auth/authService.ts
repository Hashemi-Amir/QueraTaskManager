import axios from "axios";
import { FieldValues } from "../../../pages/auth/Register";

const API_URL = "https://quera-task-server.vercel.app/api/auth/";

// Regiter user
const register = async (userData: FieldValues) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};

// Login user
const login = async (userData: FieldValues) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem(
      "authToken",
      JSON.stringify({
        accessToken: response.data.data.accessToken,
        refreshToken: response.data.data.refreshToken,
      })
    );
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.data.toBeSendUserData)
    );
  }
  return response.data;
};

// Forgot password
const forgot = async (userEmail: FieldValues) => {
  const response = await axios.post(API_URL + "forget-password", userEmail);

  return response.data;
};

const authService = {
  register,
  login,
  forgot,
};

export default authService;
