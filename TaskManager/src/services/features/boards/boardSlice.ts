import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

const auth = {
  headers: {
    "x-auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA3ZjlkNjM3M2NlZmM0Mjg2YTE1MiIsInVzZXJuYW1lIjoic2FlZWRhYmVkaW5pIiwiZW1haWwiOiJzYWVlZGFiZWRpbmlAZ21haWwuY29tIiwiaWF0IjoxNjg2MjY4MjEyLCJleHAiOjE2ODYzNTQ2MTJ9.dzApLHZahLQ_1croR29qZ58xXuykyBJUEVZOU7SBFLg",
  },
};
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
  errorMessage: unknown ;
  boards: BoardsProps[];
};

const initialState: initialStateType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  boards: [],
};

const fetchBoards = createAsyncThunk(
  "Boards/fetchBoards",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/boards/${id}`,
        auth
      );
      return await response.data;
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
      .addCase(
        fetchBoards.fulfilled,
        (state, action: PayloadAction<AxiosResponse<any, any>>) => {
          state.isLoading = false;
          state.isSuccess = true;
          const fetchedBoards = action.payload.data; // extract Boards from AxiosResponse object
          if (fetchedBoards && Array.isArray(fetchedBoards)) {
            state.boards = fetchedBoards;
          }
        }
      )
      .addCase(fetchBoards.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.boards = [];
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default boardsSlice.reducer;
// export const { setId } = boardsSlice.actions;
export { fetchBoards };
