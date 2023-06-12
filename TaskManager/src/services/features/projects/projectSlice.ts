import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AXIOS from "../utils/AXIOS";

export type ProjectsProps = {
  _id: string;
  name: string;
  workspace: string;
  members: [];
  boards: [];
};
type Projects = {
  workSpaceId: string;
  projects: ProjectsProps[];
};
type initialStateType = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: unknown;
  id: string;
  selectedProject: string;
  workSpaces: Projects[];
};

const initialState: initialStateType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  id: "",
  selectedProject: "",
  workSpaces: [],
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
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    resetProject: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.workSpaces = [];
      state.id = "";
    }
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

        const workSpaceId = action.meta.arg;
        const workSpaceIndex = state.workSpaces.findIndex((item) => {
          return item.workSpaceId === workSpaceId;
        });
        if (workSpaceIndex >= 0) {
          // workSpace exists, add the new board to its list of boards
          state.workSpaces[workSpaceIndex].projects = action.payload;
        } else {
          // workSpace doesn't exist, create a new index and add the new board with its own list of boards
          state.workSpaces.push({
            workSpaceId: workSpaceId,
            projects: action.payload,
          });
        }
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default projectSlice.reducer;
export const { setId, setSelectedProject, resetProject } = projectSlice.actions;
export { fetchProjects };
