import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import AXIOS from "../utils/AXIOS";

export type BoardsProps = {
  _id: "";
  name: "";
  position: "";
  project: "";
  tasks: [];
};

type initialStateType = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: unknown;
  boards: BoardsProps[];
};

const initialState: initialStateType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  boards: [],
};
//TODO FIX BUG WHEN URL NOT TRUE ANS SWITCH CULOMNVIEW AND LOSTVIEW
const fetchBoards = createAsyncThunk(
  "Boards/fetchBoards",
  async (id: string, thunkAPI) => {
    try {
      const response = await AXIOS.get(`/api/board/${id}`);
      const data = await response.data;
      return data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const boardsSlice = createSlice({
  name: "Boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.boards = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.boards = [];
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default boardsSlice.reducer;
// export const { setId } = boardsSlice.actions;
export { fetchBoards };
