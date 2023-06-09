// !!!!! this service is for experiment, I will remove it myself

import AXIOS from "../utils/AXIOS";
// import { AXIOS } from "../../app/store";

const getUser = async () => {
  const response = await AXIOS.get("/api/workspace/get-all");
  // if (response.data) {
  //   localStorage.setItem("accessToken", "");
  //   localStorage.setItem("refreshToken", "");
  // }

  if (response.data) {
    // localStorage.setItem("user", JSON.stringify(response.data));
    console.log(response.data);
  }
  return response.data;
};

const getUserService = {
  getUser,
};

export default getUserService;
