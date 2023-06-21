import AXIOS from "../utils/AXIOS";
import { createCommentDataType, updateCommentDataType } from "./boardSlice";

const API_URL = "/api/comments/";

// َAdd a comment and get it from Api
const addComment = async (commentData: createCommentDataType) => {
  const response = await AXIOS.post(API_URL, commentData);
  if (response.data) {
    const commentId = response.data._id;
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const getComment = await AXIOS.get(API_URL + commentId);
    return getComment.data;
  }
};

// َDelete a comment by it's id
const deleteComment = async (commentId: string) => {
  const response = await AXIOS.delete(API_URL + commentId);

  if (response) return commentId;
};

// Update a comment
const updateComment = async (commentData: updateCommentDataType) => {
  const response = await AXIOS.patch(API_URL + commentData.id, {
    text: commentData.text,
  });

  if (response.data) return response.data;
};

const boardService = {
  addComment,
  deleteComment,
  updateComment,
};

export default boardService;
