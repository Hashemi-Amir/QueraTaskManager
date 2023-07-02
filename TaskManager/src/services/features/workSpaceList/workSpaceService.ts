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
  return response.data;
};

const deleteWorkSpace = async (id: string) => {
  const response = await AXIOS.delete(API_URL + id);
  return response.data;
};

const updateWorkSpace = async (data: (string | undefined)[]) => {
  const [value, id, username] = [...data];
  const formData = {
    name: value,
    usernameOrId: username,
    image: "image url",
  };
  const response = await AXIOS.patch(API_URL + id, formData);
  return response.data;
};

const addWorkSpaceMember = async (workID: (string | undefined)[]) => {
  const [workSpaceId, userNameOrId] = [...workID];
  const url = `${workSpaceId}/members/${userNameOrId}`;
  const response = await AXIOS.put(API_URL + url, "_");
  return response.data;
};

const removeWorkSpaceMember = async (workID: (string | undefined)[]) => {
  const [workSpaceId, userNameOrId] = [...workID];
  const url = `${workSpaceId}/members/${userNameOrId}`;
  const response = await AXIOS.delete(API_URL + url);
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
