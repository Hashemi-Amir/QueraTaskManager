import AXIOS from "../utils/AXIOS";
import { FieldValues } from "../../../pages/profile/PersonalInfo";
import store from "../../app/store";
import { updateUser } from "../auth/authSlice";

const API_URL = "/api/users/";

// updateUserById
const updateUserById = async (userData: FieldValues) => {
  const id = JSON.parse(localStorage.getItem("user") as string)?._id;
  const response = await AXIOS.put(API_URL + id, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    store.dispatch(updateUser(response.data));
  }
  return response.data;
};


const fetchAddedMemberWorkspace = async (memberId: string | undefined) => {
  const response = await AXIOS.get(API_URL + memberId);
  return response.data;
};

const authServie = {
  updateUserById,
  fetchAddedMemberWorkspace,
};

export default authServie;
