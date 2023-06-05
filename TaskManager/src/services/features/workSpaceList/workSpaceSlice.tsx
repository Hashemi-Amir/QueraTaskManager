import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TypeStore } from "../../app/store";
import axios from 'axios'
// type WorkSpace = {

// };
const API_URL = "http://localhost:3000/api/workspace/get-all/";

type initialStateType = {
  isLoading: boolean;
  workSpace: object;
  isError: string | undefined;
};

const initialState: initialStateType = {
  isLoading: false,
  workSpace: {},
  isError: "",
};

const fetchWorkSpace = createAsyncThunk(
  "workspace/fetchWorkSpace",
  async () => {
    try {
      const response = await axios.get(API_URL,{
        headers: {
          'Authorization': `token ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzhkNzgwOWM4ZDk4NGUxNWNjN2U3NiIsInVzZXJuYW1lIjoic2luYTIiLCJlbWFpbCI6InNpbmEubmlsaTA5NzJAZ21haWwuY29tIiwiaWF0IjoxNjg1OTcwNTU3LCJleHAiOjE2ODYwNTY5NTd9.nxS85uBtKIBh0zjiGFt9XcQQP8OuGo9s0TbPKbs1bD4'}`
        }
      });
      const data = await response.data;
      return data;
    } catch (error) {
      return error;
    }
  }
);

const workSpaceSlice = createSlice({
  name: "workSpace",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkSpace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWorkSpace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workSpace = action.payload;
        state.isError = "";
      })
      .addCase(fetchWorkSpace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.workSpace = [];
      });
  },
});

export default workSpaceSlice.reducer;
export { fetchWorkSpace };
export const selectWorkSpace = (state: TypeStore) => state.workSpace;
