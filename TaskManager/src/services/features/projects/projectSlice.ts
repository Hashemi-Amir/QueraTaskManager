import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import  { AxiosResponse } from "axios";
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
  message: unknown ;
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
      const response = await AXIOS.get(
        `http://localhost:3000/api/projects/workspaces/${id}`
      );
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
            state.projects = fetchedProjects;
          }
        }
      )
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error
        state.projects = [];
      });
  },
});

export default projectSlice.reducer;
export const { setId } = projectSlice.actions;
export { fetchProjects };
