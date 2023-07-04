import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AXIOS from "../utils/AXIOS";
import ProjectsService from "./projectService";
import { AxiosError } from "axios";
// import { fetchAddedMember } from "../user/userSlice";

export type ProjectsProps = {
  _id: string;
  name: string;
  workspace: string;
  members: { user: { username: string } }[];
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
  addedMemberUserName: string | undefined;
  selectedProjectSidebar: string;
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
  selectedProjectSidebar: "",
  selectedProject: "",
  addedMemberUserName: "",
  workSpaces: [],
};

const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (id: string, thunkAPI) => {
    try {
      const response = await AXIOS.get(`/api/projects/workspaces/${id}`);
      return await response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// create project by workSpace id and name
const createProject = createAsyncThunk(
  "projects/createProject",
  async (data: (string | undefined)[], thunkAPI) => {
    try {
      return await ProjectsService.createProject(data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// delete project by project id
const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id: string, thunkAPI) => {
    try {
      return await ProjectsService.deleteProject(id);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// edit project name by id and new Name
const editProjectName = createAsyncThunk(
  "projects/editProjectName",
  async (data: (string | undefined)[], thunkAPI) => {
    try {
      return await ProjectsService.editProjectName(data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// add member to project by id and member username
const addMemberToProject = createAsyncThunk(
  "projects/addMemberToProject",
  async (data: (string | undefined)[], thunkAPI) => {
    try {
      return await ProjectsService.addMemberToProject(data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// remove Member Than Project by id and member username
const removeMemberThanProject = createAsyncThunk(
  "projects/removeMemberThanProject ",
  async (data: (string | undefined)[], thunkAPI) => {
    try {
      return await ProjectsService.removeMemberThanProject(data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
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
    setSelectedProjectSidebar: (state, action) => {
      state.selectedProjectSidebar = action.payload;
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
        state.messagePost = action.payload;
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
        state.messagePost = action.payload;
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
        state.messagePost = action.payload;
      })

      // add member to project
      .addCase(addMemberToProject.pending, (state) => {
        state.isLoadingPost = true;
        state.isSuccessPost = false;
      })
      .addCase(addMemberToProject.fulfilled, (state, action) => {
        const memberName = action.meta.arg[1];
        state.isLoadingPost = false;
        state.isSuccessPost = true;
        state.addedMemberUserName = memberName;
      state.messagePost = `کاربر ${memberName} به پروژه اضافه شد`;
      })
      .addCase(addMemberToProject.rejected, (state, action) => {
        state.isSuccessPost = false;
        state.isLoadingPost = false;
        state.isErrorPost = true;
        state.messagePost = action.payload;
      })

      // remove member than project
      .addCase(removeMemberThanProject.pending, (state) => {
        state.isLoadingPost = true;
        state.isSuccessPost = false;
      })
      .addCase(removeMemberThanProject.fulfilled, (state, action) => {
        const memberName = action.payload.username;
        const data = action.payload;
        const test: any[] = [];
        state.workSpaces.forEach((workspace) =>
          workspace.projects.forEach((project) => {
            if (project.name === state.selectedProject) {
              test.push(project);
            }
          })
        );

        const workspaceId = test[0].workspace;
        const projectId = test[0]._id;
        const workspaceIndex = state.workSpaces.findIndex(
          (workspace) => workspace.workSpaceId === workspaceId
        );

        const projectIndex = state.workSpaces[
          workspaceIndex
        ].projects.findIndex((project) => project._id === projectId);

        state.workSpaces[workspaceIndex].projects[projectIndex].members =
          state.workSpaces[workspaceIndex].projects[
            projectIndex
          ].members.filter((member) => member.user.username != data.username);
        state.isLoadingPost = false;
        state.isSuccessPost = true;
        state.messagePost = `کاربر ${memberName} حذف شد`;
      })
      .addCase(removeMemberThanProject.rejected, (state, action) => {
        state.isLoadingPost = false;
        state.isErrorPost = true;
        state.messagePost = action.error;
      })


  },
});

export default projectSlice.reducer;
export const {
  setId,
  resetProject,
  resetPostProject,
  setSelectedProject,
  setSelectedProjectSidebar,
} = projectSlice.actions;
export {
  fetchProjects,
  createProject,
  deleteProject,
  editProjectName,
  addMemberToProject,
  removeMemberThanProject,
};
