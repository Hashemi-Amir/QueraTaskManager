import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeStore } from "../../app/store";
import axios, { AxiosResponse } from "axios";

const auth = {
  headers: {
    "x-auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA3ZjlkNjM3M2NlZmM0Mjg2YTE1MiIsInVzZXJuYW1lIjoic2FlZWRhYmVkaW5pIiwiZW1haWwiOiJzYWVlZGFiZWRpbmlAZ21haWwuY29tIiwiaWF0IjoxNjg2MTQyODg5LCJleHAiOjE2ODYyMjkyODl9._TobVQGMBy5BrXxUyClcbKkR34LUBBt9sq715Q0yMic",
  },
};
type Projects = {
  _id: string;
  name: string;
  workspace: string;
  members: [];
  boards: [];
};

type initialStateType = {
  isLoading: boolean;
  isSuccess: boolean;
  projects: Projects[];
  isError: string | undefined;
  id: string;
};

const initialState: initialStateType = {
  isLoading: false,
  isSuccess: false,
  isError: "",
  projects: [],
  id: "",
};

const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/projects/workspaces/${id}`,
        auth
      );
      return await response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
      // return error;
    }
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(
        fetchProjects.fulfilled,
        (state, action: PayloadAction<AxiosResponse<any, any>>) => {
          state.isLoading = false;
          state.isSuccess = true;
          const fetchedProjects = action.payload.data; // extract projects from AxiosResponse object
          if (fetchedProjects && Array.isArray(fetchedProjects)) {
            state.projects = [...state.projects, ...fetchedProjects];
          }
          state.isError = "";
        }
      )
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.projects = [];
        state.isError = action.error.message;
      });
  },
});

export default projectSlice.reducer;
export const { setId } = projectSlice.actions;
export { fetchProjects };
export const selectProjects = (state: TypeStore) => state.projects;
