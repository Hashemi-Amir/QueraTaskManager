import AXIOS from "../utils/AXIOS";
const API_URL = "/api/task/";

type createTast = {
  name: string | undefined;
  description: string | undefined;
  boardId: string | undefined;
  deadline : string;
};

const fetchCreateTask = async (data: createTast) => {
  const response = await AXIOS.post(API_URL,data);
  console.log(response.data);
  return response.data
};


const fetchDeleteTask = async (id:string) => {
  const response = await AXIOS.delete(API_URL+id);
  console.log(response.data);
  return response.data
};
const taskService = {
  fetchCreateTask,
  fetchDeleteTask
};

export default taskService;
