import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import{ AxiosResponse } from "axios";
import WorkspaceService from "./workSpaceService";
import AXIOS from "../utils/AXIOS";

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
  workSpaces: WorkSpacesProps[];
};

const initialState: initialStateType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  workSpaces: [],
};



const fetchAllWorkSpaces = createAsyncThunk(
  "workspaces/fetchAllWorkSpaces",
  async (_, thunkAPI) => {
    try {
      const response = await AXIOS.get("/api/workspace/get-all");
      return await response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const fetchWorkSpaceById = createAsyncThunk(
  "workspaces/fetchWorkSpaceById",
  async (id: string, thunkAPI) => {
    try {
      const response = await AXIOS.get(`/api/workspace/${id}`);
      return await response.data.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const createWorkSpace = createAsyncThunk(
  "workspace/createWorkSpace",
  async (nameWorkspace: string) => {
    try {
      return await WorkspaceService.createWorkSpace(nameWorkspace);
    } catch (error) {
      return error;
    }
  }
);

const deleteWorkSpace = createAsyncThunk(
  "workspace/deleteWorkSpace",
  async (id: string) => {
    try {
      return await WorkspaceService.deleteWorkSpace(id);
    } catch (error) {
      return error;
    }
  }
);

const updateWorkSpace = createAsyncThunk(
  "workspace/updateWorkSpace",
  async (data: (string | undefined)[]) => {
    try {
      return await WorkspaceService.updateWorkSpace(data);
    } catch (error) {
      return error;
    }
  }
);

const addWorkSpaceMember = createAsyncThunk(
  "workspace/addWorkSpaceMember",
  async (workID: any) => {
    try {
      return await WorkspaceService.addWorkSpaceMember(workID);
    } catch (error) {
      return error;
    }
  }
);

const removeWorkSpaceMember = createAsyncThunk(
  "workspace/removeWorkSpaceMember",
  async (workID: any) => {
    try {
      return await WorkspaceService.removeWorkSpaceMember(workID);
    } catch (error) {
      return error;
    }
  }
);


const workSpacesSlice = createSlice({
  name: "workSpaces",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
      .addCase(fetchWorkSpaceById.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(
        fetchWorkSpaceById.fulfilled,
        (state, action: PayloadAction<AxiosResponse<any, any>>) => {
          state.isLoading = false;
          state.isSuccess = true;
          const fetchWorkSpaceById = action.payload.data; // extract projects from AxiosResponse object
          if (fetchWorkSpaceById && Array.isArray(fetchWorkSpaceById)) {
            state.workSpaces = fetchWorkSpaceById;
          }
        }
      )
      .addCase(fetchWorkSpaceById.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.workSpaces = [];
      })

      // create workSpace
      .addCase(createWorkSpace.pending, (state) => {
        state.isLoading = true;
      })
      
      .addCase(createWorkSpace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workSpaces = [...state.workSpaces, action.payload];
      })
      .addCase(createWorkSpace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.workSpaces = [];
      })

      // delete workSpace
      .addCase(deleteWorkSpace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWorkSpace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workSpaces = state.workSpaces.filter(
          (item) => item._id != action.payload._id
        );
        state.isError = false;
      })
      .addCase(deleteWorkSpace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.workSpaces = [];
      })

      // update workSpace

      .addCase(updateWorkSpace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWorkSpace.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.workSpaces = state.workSpaces[action.payload.data._id].name = action.payload.data.name
        state.isError = false;
      })
      .addCase(updateWorkSpace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.workSpaces = [];
      });
  },
});

export default workSpacesSlice.reducer;
export {
  fetchAllWorkSpaces,
  fetchWorkSpaceById,
  createWorkSpace,
  deleteWorkSpace,
  updateWorkSpace,
  addWorkSpaceMember,
  removeWorkSpaceMember,
};
