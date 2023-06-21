import AXIOS from "../utils/AXIOS";
const API_BOARD_URL = "/api/board/";
const API_TASK_URL = "/api/task/";

type PositionProps = {
  id: string;
  index: number;
};

// fetch Boards
const fetchBoards = async (id: string) => {
  const response = await AXIOS.get(API_BOARD_URL + id);
  return await response.data;
};

// Change Board Position
const fetchChangeBoardPosition = async ({ id, index }: PositionProps) => {
  const response = await AXIOS.put(API_BOARD_URL + id + "/position/" + index);
  return await response.data;
};

//  Change Task Position
const fetchChangeTaskPosition = async ({ id, index }: PositionProps) => {
  const response = await AXIOS.put(API_TASK_URL + id + "/position/" + index);
  return await response.data;
};

//  Change Task Board
const fetchChangeTaskBoard = async ({
  id,
  boardId,
}: {
  id: string;
  boardId: string;
}) => {
  const response = await AXIOS.put(API_TASK_URL + id + "/board/" + boardId);
  return await response.data;
};

const boardService = {
  fetchBoards,
  fetchChangeBoardPosition,
  fetchChangeTaskBoard,
  fetchChangeTaskPosition,
};
export default boardService;
