import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import WorkspaceService from "./workSpaceService";

export type WorkSpacesProps = {
  _id: string;
  name: string;
  user: string;
  members: [];
  projects: [];
};

type initialStateType = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: unknown;
  selectedSpace: string;
  selectedWorkSpaceId: string;
  selectedWorkSpaceHeader: string;
  searchedWorkSpace: WorkSpacesProps[];
  workSpaces: WorkSpacesProps[];
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
  selectedSpace: "",
  selectedWorkSpaceId: "",
  selectedWorkSpaceHeader: "",
  searchedWorkSpace: [],
  workSpaces: [],
  isLoadingPost: false,
  isSuccessPost: false,
  isErrorPost: false,
  messagePost : '',
};

// Get all workspaces from api
const fetchAllWorkSpaces = createAsyncThunk(
  "workspaces/fetchAllWorkSpaces",
  async (_, thunkAPI) => {
    try {
      return await WorkspaceService.fetchAllWorkSpaces();
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const createWorkSpace = createAsyncThunk(
  "workspace/createWorkSpace",
  async (nameWorkspace: string, thunkAPI) => {
    try {
      return await WorkspaceService.createWorkSpace(nameWorkspace);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete WorkSpace by id
const deleteWorkSpace = createAsyncThunk(
  "workspace/deleteWorkSpace",
  async (id: string, thunkAPI) => {
    try {
      return await WorkspaceService.deleteWorkSpace(id);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Rename WorkSpace
const updateWorkSpace = createAsyncThunk(
  "workspace/updateWorkSpace",
  async (data: (string | undefined)[], thunkAPI) => {
    try {
      return await WorkspaceService.updateWorkSpace(data);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add member to workSpace by id
const addWorkSpaceMember = createAsyncThunk(
  "workspace/addWorkSpaceMember",
  async (workID: (string | undefined)[], thunkAPI) => {
    try {
      return await WorkspaceService.addWorkSpaceMember(workID);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Remove member than workSpace by id
const removeWorkSpaceMember = createAsyncThunk(
  "workspace/removeWorkSpaceMember",
  async (workID: (string | undefined)[], thunkAPI) => {
    try {
      return await WorkspaceService.removeWorkSpaceMember(workID);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
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
      state.isLoadingPost = false,
      state.isSuccessPost = false,
      state.isErrorPost = false;
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
    searchedWorkSpace: (state, action) => {
      state.searchedWorkSpace = action.payload;
    },

  },
  extraReducers: (builder) => {
    // All WorkSpaces
    builder
      .addCase(fetchAllWorkSpaces.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(fetchAllWorkSpaces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workSpaces = action.payload;
      })
      .addCase(fetchAllWorkSpaces.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
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
        state.workSpaces = [];
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
        state.workSpaces = [];
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
        state.workSpaces = [];
      })

      // add member to workSpace
      .addCase(addWorkSpaceMember.pending, (state) => {
        state.isLoadingPost = true;
      })

      .addCase(addWorkSpaceMember.fulfilled, (state ) => {
        state.isLoadingPost = false;
        state.isSuccessPost = true;
        state.messagePost = "کاربر با موفقیت اضافه شد";
      })
      .addCase(addWorkSpaceMember.rejected, (state, action) => {
        state.isLoadingPost = false;
        state.isErrorPost = true;
        state.messagePost = action.payload;
        state.workSpaces = [];
      })

      // remove member than workSpace
      .addCase(removeWorkSpaceMember.pending, (state) => {
        state.isLoadingPost = true;
      })

      .addCase(removeWorkSpaceMember.fulfilled, (state) => {
        state.isErrorPost = false;
        state.isSuccessPost = true;
        state.messagePost = 'کاربر حذف شد'
      })
      .addCase(removeWorkSpaceMember.rejected, (state, action) => {
        state.isLoadingPost = false;
        state.isErrorPost = true;
        state.messagePost = action.payload;
        state.workSpaces = [];
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
  searchedWorkSpace,
} = workSpacesSlice.actions;
export {
  fetchAllWorkSpaces,
  createWorkSpace,
  deleteWorkSpace,
  updateWorkSpace,
  addWorkSpaceMember,
  removeWorkSpaceMember,
};
