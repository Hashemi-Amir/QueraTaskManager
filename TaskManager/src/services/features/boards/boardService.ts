import AXIOS from "../utils/AXIOS";
import { createCommentDataType, updateCommentDataType } from "./boardSlice";

const API_URL = { comment: "/api/comments/", board: "/api/board/" };

// َAdd a comment and get it from Api
const addComment = async (commentData: createCommentDataType) => {
  const response = await AXIOS.post(API_URL.comment, commentData);
  if (response.data) {
    const commentId = response.data._id;
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const getComment = await AXIOS.get(API_URL.comment + commentId);
    return getComment.data;
  }
};

// َDelete a comment by it's id
const deleteComment = async (commentId: string) => {
  const response = await AXIOS.delete(API_URL.comment + commentId);

  if (response) return commentId;
};

// Update a comment
const updateComment = async (commentData: updateCommentDataType) => {
  const response = await AXIOS.patch(API_URL.comment + commentData.id, {
    text: commentData.text,
  });

  if (response.data) return response.data;
};

const createBoard = async (data: (string | undefined)[]) => {
  const [name, projectId] = [...data];
  const formData = { name, projectId };
  const response = await AXIOS.post(API_URL.board, formData);
  console.log(response.data);
  return response.data;
};

const deleteBoard = async (id: string) => {
  const response = await AXIOS.delete(API_URL.board + id);
  console.log(response.data);
  return response.data;
};

const editBoardName = async (data: (string | undefined)[]) => {
  const [id, newName] = [...data];
  const formData = { name: newName };
  const response = await AXIOS.put(API_URL.board + id, formData);
  console.log(response);
  return response.data;
};

const boardService = {
  createBoard,
  deleteBoard,
  editBoardName,
  addComment,
  deleteComment,
  updateComment,
};

export default boardService;
