import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AXIOS from "../utils/AXIOS";

type BoardsProps = {
  _id: "";
  name: "";
  position: "";
  project: "";
  tasks: [];
};
type ListBoards = {
  projectId: string;
  boards: BoardsProps[];
};

type initialStateType = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: unknown;
  boards: BoardsProps[];
  listBoards: ListBoards[];
};

const initialState: initialStateType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  boards: [],
  listBoards: [],
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
// fetchListBoards for test
const fetchListBoards = createAsyncThunk(
  "Boards/fetchListBoards",
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
      })
      // ListBoards for test
      .addCase(fetchListBoards.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(fetchListBoards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        
        const  project  = action.payload[0].project;
        console.log(action.payload[0].project);

        const projectIndex = state.listBoards.findIndex((item) => {
          console.log(item.projectId);
          return item.projectId === project;
        });
        if (projectIndex >= 0) {
          // Project exists, add the new board to its list of boards
          state.listBoards[projectIndex].boards = action.payload;
        } else {
          // Project doesn't exist, create a new index and add the new board with its own list of boards
          state.listBoards.push({
            projectId: project,
            boards: action.payload,
          });
        }
        // state.listBoards = [...state.listBoards, action.payload];
      })
      .addCase(fetchListBoards.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.listBoards = [];
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default boardsSlice.reducer;
// export const { setId } = boardsSlice.actions;
export { fetchBoards, fetchListBoards };
