import AXIOS from "../utils/AXIOS";
import { assignInfoType, taskinfoType, unAssignInfoType } from "./taskSlice";
import { createTask } from "./taskSlice";
const API_URL = "/api/task/";

// update task
const fetchUpdateTask = async (taskinfo: taskinfoType) => {
  const response = await AXIOS.put(API_URL + taskinfo.taskId, {
    name: taskinfo.name,
    description: taskinfo.description,
    deadline: taskinfo.deadline,
  });
  return response.data;
};

// assign task
const fetchAssignTask = async (assignInfo: assignInfoType) => {
  const response = await AXIOS.put(
    API_URL + assignInfo.taskId + "/assign/" + assignInfo.usernameOrId
  );
  if (response.data) return response.data;
};
// unAassign task
const fetchUnAssignTask = async (unAssignInfo: unAssignInfoType) => {
  const response = await AXIOS.delete(
    API_URL + unAssignInfo.taskId + "/assign/" + unAssignInfo.usernameOrId
  );
  if (response) return unAssignInfo.usernameOrId;
};

const fetchCreateTask = async (data: createTask) => {
  const response = await AXIOS.post(API_URL, data);
  return response.data;
};

const fetchDeleteTask = async (id: string) => {
  const response = await AXIOS.delete(API_URL + id);
  return response.data;
};
const taskService = {
  fetchCreateTask,
  fetchDeleteTask,
  fetchUpdateTask,
  fetchAssignTask,
  fetchUnAssignTask,
};

export default taskService;
