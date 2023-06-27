import AXIOS from "../utils/AXIOS";

const API_URL = "/api/projects";

const createProject = async (data: (string | undefined)[]) => {
  const [name, workspaceId] = [...data];
  const formData = { name, workspaceId };
  const response = await AXIOS.post(API_URL, formData);  
  return response.data;
};

const deleteProject = async (id: string) => {
  const response = await AXIOS.delete(API_URL + "/" + id);
  return response.data;
};

const editProjectName = async (data: (string | undefined)[]) => {
  const [id, newName] = [...data];
  const formData = { name: newName };
  const response = await AXIOS.put(API_URL + "/" + id, formData);
  return response.data;
};

const addMemberToProject = async (data: (string | undefined)[]) => {  
  const [id, user] = [...data];
  const response = await AXIOS.put(`${API_URL}/${id}/members/${user}`);
  return response.data;
};

const removeMemberThanProject = async (data: (string | undefined)[]) => {
  const [id, user] = [...data];
  const response = await AXIOS.delete(`${API_URL}/${id}/members/${user}`);
  return response.data;
};

const ProjectsService = {
  createProject,
  deleteProject,
  editProjectName,
  addMemberToProject,
  removeMemberThanProject,
};

export default ProjectsService;
