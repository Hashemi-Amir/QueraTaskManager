import { toast } from "react-toastify";
import AXIOS from "../utils/AXIOS";
const API_URL = "/api/workspace/";

const fetchAllWorkSpaces = async () => {
  const response = await AXIOS.get(API_URL + "get-all");
  return response.data;
};

const fetchWorkSpaceById = async (id: string) => {
  const response = await AXIOS.get(API_URL + id);  
  return response.data;
};

const createWorkSpace = async (nameWorkspace: string) => {
  const formData = { name: nameWorkspace };
  const response = await AXIOS.post(API_URL + "create", formData);
  if (response.data) {
    toast.success("ورک اسپیس ساخته شد :)");
    console.log(response.data);
    return response.data;
  } else {
    toast.error("مشکلی پیش اومده !");
  }
};

const deleteWorkSpace = async (id: string) => {
  const response = await AXIOS.delete(API_URL + id);
  response.status === 200
    ? toast("ورک اسپیس پاک شد")
    : toast.error("مشکلی پیش اومده !");
  return response.data;
};

const updateWorkSpace = async (data: object[]) => {
  const [value, id] = [...data];
  const formData = {
    name: value,
    usernameOrId: "sina3",
    image: "image url",
  };

  const response = await AXIOS.patch(API_URL + id, formData);
  response.status === 200
    ? toast.success("نام ورک اسپیس تغییر یافت")
    : toast.error("مشکلی پیش اومده !");
  return response.data;
};

const addWorkSpaceMember = async (workID: any) => {
  const [workSpaceId, userNameOrId] = [...workID];
  console.log(workSpaceId, userNameOrId);

  const us = `${workSpaceId}/members/${userNameOrId}`;
  const response = await AXIOS.put(API_URL + us, "_");
  console.log(response);
  return response.data;
};

const removeWorkSpaceMember = async (workID: any) => {
  console.log(workID);
  const [workSpaceId, userNameOrId] = [...workID];

  const us = `${workSpaceId}/members/${userNameOrId}`;
  const response = await AXIOS.delete(API_URL + us);
  console.log(response);
  return response.data;
};

const WorkspaceService = {
  fetchAllWorkSpaces,
  fetchWorkSpaceById,
  createWorkSpace,
  deleteWorkSpace,
  updateWorkSpace,
  addWorkSpaceMember,
  removeWorkSpaceMember,
};

export default WorkspaceService;
