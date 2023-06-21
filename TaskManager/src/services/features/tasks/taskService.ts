import AXIOS from "../utils/AXIOS";
import { taskinfoType } from "./taskSlice";
const API_URL = "/api/task/";

type createTast = {
  name: string | undefined;
  description: string | undefined;
  boardId: string;
};

const fetchCreateTask = async (data: createTast) => {
  const response = await AXIOS.post(API_URL, data);
  console.log(response.data);
  return response.data;
};

const fetchDeleteTask = async (id: string) => {
  const response = await AXIOS.delete(API_URL + id);
  console.log(response.data);
  return response.data;
};

// update task
const fetchUpdateTask = async (taskinfo: taskinfoType) => {
  const response = await AXIOS.put(API_URL + taskinfo.taskId, {
    name: taskinfo.name,
    description: taskinfo.description,
    deadline: taskinfo.deadline,
  });
  // console.log(response.data);
  return response.data;
};
const taskService = {
  fetchCreateTask,
  fetchDeleteTask,
  fetchUpdateTask,
};

export default taskService;
