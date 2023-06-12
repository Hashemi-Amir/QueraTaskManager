import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AXIOS from "../utils/AXIOS";
import ProjectsService from "./projectService";

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
  isLoadingPost: boolean;
  isSuccessPost: boolean;
  isErrorPost: boolean;
  messagePost: unknown;

};

const initialState: initialStateType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  projects: [],
  id: "",
  isLoadingPost: false,
  isSuccessPost: false,
  isErrorPost: false,
  messagePost : ''
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

// create project by workSpace id and name
const createProject = createAsyncThunk(
  "projects/createProject",
  async (data: (string | undefined)[], thunkAPI) => {
    try {
      return await ProjectsService.createProject(data);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete project by project id
const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id: string, thunkAPI) => {
    try {
      return await ProjectsService.deleteProject(id);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// edit project name by id and new Name
const editProjectName = createAsyncThunk(
  "projects/editProjectName",
  async (data: (string | undefined)[], thunkAPI) => {
    try {
      return await ProjectsService.editProjectName(data);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// add member to project by id and member username
const addMemberToProject = createAsyncThunk(
  "projects/addMemberToProject",
  async (data: (string | undefined)[], thunkAPI) => {
    try {
      return await ProjectsService.addMemberToProject(data);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// remove Member Than Project by id and member username
const removeMemberThanProject = createAsyncThunk(
  "projects/removeMemberThanProject ",
  async (data: (string | undefined)[], thunkAPI) => {
    try {
      return await ProjectsService.removeMemberThanProject(data);
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
    resetPostProject: (state) => {
      state.isLoadingPost = false;
      state.isSuccessPost = false;
      state.isErrorPost = false;
      state.messagePost = ''
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
      })

      // create project
      .addCase(createProject.pending, (state) => {
        state.isLoadingPost = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoadingPost = false;
        state.isSuccessPost = true;
        state.projects = [...state.projects, action.payload];
        state.messagePost = "پروژه ساخته شد !";
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoadingPost = false;
        state.isErrorPost = true;
        state.messagePost = action.error;
        state.projects = [];
      })

      // Delete Project
      .addCase(deleteProject.pending, (state) => {
        state.isLoadingPost = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoadingPost = false;
        state.isSuccessPost = true;
        state.projects = state.projects.filter(
          (item) => item._id != action.payload._id
        );
        state.messagePost = "پروژه حذف شد ";
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoadingPost = false;
        state.isErrorPost = true;
        state.messagePost = action.error;
        state.projects = [];
      })

      // edit project name
      .addCase(editProjectName.pending, (state) => {
        state.isLoadingPost = true;
      })
      .addCase(editProjectName.fulfilled, (state) => {
        state.isLoadingPost = false;
        state.isSuccessPost = true;
      })
      .addCase(editProjectName.rejected, (state, action) => {
        state.isLoadingPost = false;
        state.isErrorPost = true;
        state.messagePost = action.error;
        state.projects = [];
      });
  },
});

export default projectSlice.reducer;
export const { setId, resetProject, resetPostProject } = projectSlice.actions;
export {
  fetchProjects,
  createProject,
  deleteProject,
  editProjectName,
  addMemberToProject,
  removeMemberThanProject,
};
