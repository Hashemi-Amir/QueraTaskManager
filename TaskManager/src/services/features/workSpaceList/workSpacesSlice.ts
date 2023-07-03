import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import WorkspaceService from "./workSpaceService";
import {
  createProject,
  deleteProject,
  editProjectName,
} from "../projects/projectSlice";
import { AxiosError } from "axios";
import { fetchAddedMemberWorkspace } from "../user/userSlice";

export type ProjectProps = {
  _id: string;
  boards: [];
  name: string;
}[];

type MemberProps = {
  user: {
    username: string;
    _id: string;
  };
};

export type WorkSpacesProps = {
  _id: string;
  name: string;
  user: string;
  projects: ProjectProps;
  members: MemberProps[];
}[];

type initialStateType = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: unknown;
  selectedSpace: string;
  selectedWorkSpaceId: string;
  selectedWorkSpaceHeader: string;
  searchedWorkSpace: WorkSpacesProps;
  workSpaces: WorkSpacesProps;
  addedMemberUserName: string | undefined;
  isLoadingPost: boolean;
  isSuccessPost: boolean;
  isErrorPost: boolean;
  messagePost: unknown;
};

export const initialState: initialStateType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  selectedSpace: "",
  selectedWorkSpaceId: "",
  selectedWorkSpaceHeader: "",
  addedMemberUserName: "",
  searchedWorkSpace: [],
  workSpaces: [],
  isLoadingPost: false,
  isSuccessPost: false,
  isErrorPost: false,
  messagePost: "",
};

// Get all workspaces from api
const fetchAllWorkSpaces = createAsyncThunk(
  "workspaces/fetchAllWorkSpaces",
  async (_, thunkAPI) => {
    try {
      return await WorkspaceService.fetchAllWorkSpaces();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

const createWorkSpace = createAsyncThunk(
  "workspace/createWorkSpace",
  async (nameWorkspace: string, thunkAPI) => {
    try {
      return await WorkspaceService.createWorkSpace(nameWorkspace);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// Delete WorkSpace by id
const deleteWorkSpace = createAsyncThunk(
  "workspace/deleteWorkSpace",
  async (id: string, thunkAPI) => {
    try {
      return await WorkspaceService.deleteWorkSpace(id);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// Rename WorkSpace
const updateWorkSpace = createAsyncThunk(
  "workspace/updateWorkSpace",
  async (data: (string | undefined)[], thunkAPI) => {
    try {
      return await WorkspaceService.updateWorkSpace(data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// Add member to workSpace by id
const addWorkSpaceMember = createAsyncThunk(
  "workspace/addWorkSpaceMember",
  async (workID: (string | undefined)[], thunkAPI) => {
    try {
      return await WorkspaceService.addWorkSpaceMember(workID);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// Remove member than workSpace by id
const removeWorkSpaceMember = createAsyncThunk(
  "workspace/removeWorkSpaceMember",
  async (workID: (string | undefined)[], thunkAPI) => {
    try {
      return await WorkspaceService.removeWorkSpaceMember(workID);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

const workSpacesSlice = createSlice({
  name: "workSpaces",
  initialState,
  reducers: {
    // Reset helper flags
    resetWorkspaces: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.selectedSpace = "";
    },
    resetPostWorkspace: (state) => {
      (state.isLoadingPost = false),
        (state.isSuccessPost = false),
        (state.isErrorPost = false);
      state.messagePost = "";
    },
    setSelectedSpace: (state, action) => {
      state.selectedSpace = action.payload;
    },
    setSelectedWorkSpaceId: (state, action) => {
      state.selectedWorkSpaceId = action.payload;
    },
    setSelectedWorkSpaceHeader: (state, action) => {
      state.selectedWorkSpaceHeader = action.payload;
    },
    setSearchedWorkSpace: (state, action) => {
      state.searchedWorkSpace = action.payload;
    },
  },
  extraReducers: (builder) => {
    // All WorkSpaces
    builder
      .addCase(fetchAllWorkSpaces.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllWorkSpaces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workSpaces = action.payload;
      })
      .addCase(fetchAllWorkSpaces.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.workSpaces = [];
      })
      // create workSpace
      .addCase(createWorkSpace.pending, (state) => {
        state.isLoadingPost = true;
      })

      .addCase(createWorkSpace.fulfilled, (state, action) => {
        state.isLoadingPost = false;
        state.workSpaces = [...state.workSpaces, action.payload];
        state.isSuccessPost = true;
        state.messagePost = `ورک اسپیس با موفقیت ساخته شد 🎉`;
      })
      .addCase(createWorkSpace.rejected, (state, action) => {
        state.isLoadingPost = false;
        state.isErrorPost = true;
        state.messagePost = action.payload;
      })

      // delete workSpace
      .addCase(deleteWorkSpace.pending, (state) => {
        state.isLoadingPost = true;
      })
      .addCase(deleteWorkSpace.fulfilled, (state, action) => {
        state.isLoadingPost = false;
        state.workSpaces = state.workSpaces.filter(
          (item) => item._id != action.payload._id
        );
        state.isSuccessPost = true;
        state.messagePost = "ورک اسپیس حذف شد";
      })
      .addCase(deleteWorkSpace.rejected, (state, action) => {
        state.isLoadingPost = false;
        state.isErrorPost = true;
        state.messagePost = action.payload;
      })

      // update workSpace

      .addCase(updateWorkSpace.pending, (state) => {
        state.isLoadingPost = true;
      })
      .addCase(updateWorkSpace.fulfilled, (state, action) => {
        state.isLoadingPost = false;
        state.isSuccessPost = true;
        state.workSpaces = state.workSpaces.map((item) => {
          return item._id === action.payload._id
            ? { ...item, name: action.payload.name }
            : item;
        });
      })
      .addCase(updateWorkSpace.rejected, (state, action) => {
        state.isLoadingPost = false;
        state.isErrorPost = true;
        state.messagePost = action.payload;
      })

      // add member to workSpace
      .addCase(addWorkSpaceMember.pending, (state) => {
        state.isLoadingPost = true;
        state.isSuccessPost = false;
      })

      .addCase(addWorkSpaceMember.fulfilled, (state, action) => {
        const memberName = action.meta.arg[1];
        state.isLoadingPost = false;
        state.isSuccessPost = true;
        state.addedMemberUserName = memberName;
        state.messagePost = `کاربر ${memberName} به ورک اسپیس اضافه شد`;
      })
      .addCase(addWorkSpaceMember.rejected, (state, action) => {
        state.isSuccessPost = false;
        state.isLoadingPost = false;
        state.isErrorPost = true;
        state.messagePost = action.payload;
      })

      // remove member than workSpace
      .addCase(removeWorkSpaceMember.pending, (state) => {
        state.isLoadingPost = true;
      })

      .addCase(removeWorkSpaceMember.fulfilled, (state, action) => {
        const memberName = action.payload.username;
        const { workspaceId, userId } = action.payload;
        const workSpaceIndex = state.workSpaces.findIndex(
          (workspace) => workspace._id === workspaceId
        );

        state.isErrorPost = false;
        state.isSuccessPost = true;
        state.workSpaces[workSpaceIndex].members = state.workSpaces[
          workSpaceIndex
        ].members.filter((member) => member.user._id != userId);
        state.messagePost = `کاربر ${memberName} حذف شد`;
      })
      .addCase(removeWorkSpaceMember.rejected, (state, action) => {
        state.isLoadingPost = false;
        state.isErrorPost = true;
        state.messagePost = action.payload;
      })

      // update workspace by create project
      .addCase(createProject.fulfilled, (state, action) => {
        // find index workSpace
        const workSpaceId = action.meta.arg[1];

        const workSpaceIndex = state.workSpaces.findIndex((workSpace) => {
          return workSpace._id === workSpaceId;
        });

        // push project in workSpace
        workSpaceIndex !== -1 &&
          state.workSpaces[workSpaceIndex].projects.push(action.payload);
      })

      // update workspace by delete project

      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoadingPost = false;
        const selectedWorkSpace = action.payload.workspace;
        // find workSpaceIndex
        const workSpaceIndex: number = state.workSpaces.findIndex((item) => {
          return item._id === selectedWorkSpace;
        });

        if (workSpaceIndex !== -1) {
          // remove project
          state.workSpaces[workSpaceIndex].projects = state.workSpaces[
            workSpaceIndex
          ].projects.filter((project) => {
            return project._id != action.payload._id;
          });
        }
      })

      // update workspace by rename project
      .addCase(editProjectName.fulfilled, (state, action) => {
        // find workSpaceIndex
        const selectedWorkSpace = action.payload.workspace;
        const workSpaceIndex = state.workSpaces.findIndex((item) => {
          return item._id === selectedWorkSpace;
        });

        // rename project
        state.workSpaces[workSpaceIndex].projects = state.workSpaces[
          workSpaceIndex
        ].projects.map((project) => {
          return project._id === action.payload._id
            ? { ...project, name: action.payload.name }
            : project;
        });
      })

      // update member workspace
      .addCase(fetchAddedMemberWorkspace.fulfilled, (state, action) => {
        const data = action.payload;
        const memberObject = {
          user: {
            _id: data?._id,
            username: data?.username,
            email: data?.email,
          },
          role: "member",
        };
        const workSpaceIndex = state.workSpaces.findIndex(
          (workspace) => workspace._id === state.selectedWorkSpaceId
        );

        state.workSpaces[workSpaceIndex].members.push(memberObject);
      });
  },
});

export default workSpacesSlice.reducer;
export const {
  resetWorkspaces,
  resetPostWorkspace,
  setSelectedSpace,
  setSelectedWorkSpaceId,
  setSelectedWorkSpaceHeader,
  setSearchedWorkSpace,
} = workSpacesSlice.actions;
export {
  fetchAllWorkSpaces,
  createWorkSpace,
  deleteWorkSpace,
  updateWorkSpace,
  addWorkSpaceMember,
  removeWorkSpaceMember,
};
