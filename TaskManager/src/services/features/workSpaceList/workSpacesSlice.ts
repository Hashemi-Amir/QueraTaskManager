import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TypeStore } from "../../app/store";
import axios from "axios";


const auth = {
  headers: {
    "x-auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA3ZjlkNjM3M2NlZmM0Mjg2YTE1MiIsInVzZXJuYW1lIjoic2FlZWRhYmVkaW5pIiwiZW1haWwiOiJzYWVlZGFiZWRpbmlAZ21haWwuY29tIiwiaWF0IjoxNjg2MTQyODg5LCJleHAiOjE2ODYyMjkyODl9._TobVQGMBy5BrXxUyClcbKkR34LUBBt9sq715Q0yMic",
  },
};
type initialStateType = {
  isLoading: boolean;
  isSuccess: boolean;
  workSpaces: {
    _id: string;
    name: string;
    user: string;
    members: [];
    projects: [];
  }[];
  isError: string | undefined;
};

const initialState: initialStateType = {
  isLoading: false,
  isSuccess: false,
  isError: "",
  workSpaces: [],
};

const fetchWorkSpaces = createAsyncThunk(
  "workspaces/fetchWorkSpaces",
  async (arg, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/workspace/get-all",
        auth
      );
      return await response.data.data;
    } catch (error: any) {
      error?.response?.data?.message || error.message || error.toString();

      return thunkAPI.rejectWithValue(onmessage);
    }
  }
);

const workSpacesSlice = createSlice({
  name: "workSpaces",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkSpaces.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(fetchWorkSpaces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workSpaces = action.payload;
        state.isError = "";
      })
      .addCase(fetchWorkSpaces.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = action.error.message;
        state.workSpaces = [];
      });
  },
});

export default workSpacesSlice.reducer;
export { fetchWorkSpaces };
export const selectWorkSpaces = (state: TypeStore) => state.workSpaces;
