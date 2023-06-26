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
type Projects = {
  workSpaceId: string;
  projects: ProjectsProps[];
};

export type initialStateType = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: unknown;
  id: string;
  isLoadingPost: boolean;
  isSuccessPost: boolean;
  isErrorPost: boolean;
  messagePost: unknown;

  selectedProject: string;
  workSpaces: Projects[];
};

const initialState: initialStateType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  id: "",
  isLoadingPost: false,
  isSuccessPost: false,
  isErrorPost: false,
  messagePost: "",
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
    },
    resetPostProject: (state) => {
      state.isLoadingPost = false;
      state.isSuccessPost = false;
      state.isErrorPost = false;
      state.messagePost = "";
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

        const workSpaceId = action.meta.arg;
        const workSpaceIndex = state.workSpaces.findIndex((workSpace) => {
          return workSpace.workSpaceId === workSpaceId;
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
        state.message = action.payload;
        state.message = action.error;
        state.workSpaces = [];
      })

      // create project
      .addCase(createProject.pending, (state) => {
        state.isLoadingPost = true;
        state.isSuccessPost = false;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoadingPost = false;
        // find index workSpace
        const workSpaceId = action.meta.arg[1];
        const workSpaceIndex = state.workSpaces.findIndex((workSpace) => {
          return workSpace.workSpaceId === workSpaceId;
        });

        // push project in workSpace
        workSpaceIndex !== -1 &&
          state.workSpaces[workSpaceIndex].projects.push(action.payload);

        state.isSuccessPost = true;
        state.messagePost = "پروژه ساخته شد !";
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoadingPost = false;
        state.isSuccessPost = false;
        state.isErrorPost = true;
        state.messagePost = action.error;
        state.workSpaces = [];
      })

      // Delete Project
      .addCase(deleteProject.pending, (state) => {
        state.isLoadingPost = true;
        state.isSuccessPost = false;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoadingPost = false;
        const selectedWorkSpace = action.payload.workspace;
        // find workSpaceIndex
        const workSpaceIndex = state.workSpaces.findIndex((item) => {
          return item.workSpaceId === selectedWorkSpace;
        });

        // remove project
        state.workSpaces[workSpaceIndex].projects = state.workSpaces[
          workSpaceIndex
        ].projects.filter((project) => {
          return project._id != action.payload._id;
        });
        state.isSuccessPost = true;
        state.messagePost = "پروژه حذف شد ";
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoadingPost = false;
        state.isErrorPost = true;
        state.messagePost = action.error;
        state.workSpaces = [];
      })

      // edit project name
      .addCase(editProjectName.pending, (state) => {
        state.isLoadingPost = true;
        state.isSuccessPost = false;
      })
      .addCase(editProjectName.fulfilled, (state, action) => {
        state.isLoadingPost = false;

        // find workSpaceIndex
        const selectedWorkSpace = action.payload.workspace;
        const workSpaceIndex = state.workSpaces.findIndex((item) => {
          return item.workSpaceId === selectedWorkSpace;
        });

        // rename project
        state.workSpaces[workSpaceIndex].projects = state.workSpaces[
          workSpaceIndex
        ].projects.map((project) => {
          return project._id === action.payload._id
            ? { ...project, name: action.payload.name }
            : project;
        });
        state.isSuccessPost = true;
      })
      .addCase(editProjectName.rejected, (state, action) => {
        state.isLoadingPost = false;
        state.isErrorPost = true;
        state.messagePost = action.error;
        state.workSpaces = [];
      })



      // add member to project
      .addCase(addMemberToProject.pending, (state) => {
        state.isLoadingPost = true;
        state.isSuccessPost = false;
      })
      .addCase(addMemberToProject.fulfilled, (state) => {
        state.isLoadingPost = false;
        state.isSuccessPost = true;

        state.messagePost = 'کاربر به پروژه اضافه شد'
        
      })
      .addCase(addMemberToProject.rejected, (state, action) => {
        state.isLoadingPost = false;
        state.isErrorPost = true;
        state.messagePost = action.error;
        state.workSpaces = [];
      })


      
  },
});

export default projectSlice.reducer;
export const { setId, resetProject, resetPostProject, setSelectedProject } =
  projectSlice.actions;
export {
  fetchProjects,
  createProject,
  deleteProject,
  editProjectName,
  addMemberToProject,
  removeMemberThanProject,
};
