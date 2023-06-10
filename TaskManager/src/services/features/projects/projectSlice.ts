import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AXIOS from "../utils/AXIOS";

export type ProjectsProps = {
  _id: string;
  name: string;
  workspace: string;
  members: [];
  boards: [];
};

type initialStateType = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: unknown;
  id: string;
  projects: ProjectsProps[];
};

const initialState: initialStateType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  projects: [],
  id: "",
};

const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (id: string, thunkAPI) => {
    try {
      const response = await AXIOS.get(`/api/projects/workspaces/${id}`);
      return await response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
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
    resetProject: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.projects = [];
      state.id = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        state.projects = [];
      });
  },
});

export default projectSlice.reducer;
export const { setId,resetProject } = projectSlice.actions;
export { fetchProjects };
