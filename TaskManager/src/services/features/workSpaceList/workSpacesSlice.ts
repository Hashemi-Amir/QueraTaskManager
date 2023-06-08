import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TypeStore } from "../../app/store";
import axios from "axios";
import WorkspaceService from "./workSpaceService";

const auth = {
  headers: {
    "x-auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA3ZjlkNjM3M2NlZmM0Mjg2YTE1MiIsInVzZXJuYW1lIjoic2FlZWRhYmVkaW5pIiwiZW1haWwiOiJzYWVlZGFiZWRpbmlAZ21haWwuY29tIiwiaWF0IjoxNjg2MTgwODY3LCJleHAiOjE2ODYyNjcyNjd9.hEm4QwXM8XclYxL8LCl0KqDOAn7nLWLhpCNz1hCe1_w",
  },
};
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
  isError: string | undefined;
  workSpaces: WorkSpacesProps[];
};

const initialState: initialStateType = {
  isLoading: false,
  isSuccess: false,
  isError: "",
  workSpaces: [],
};

const fetchWorkSpaces = createAsyncThunk(
  "workspaces/fetchWorkSpaces",
  async (arg, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/workspace/get-all",
        auth
      );
      return await response.data.data;
    } catch (error: any) {
      error?.response?.data?.message || error.message || error.toString();

      return thunkAPI.rejectWithValue(onmessage);
    }
  }
);

const createWorkSpace = createAsyncThunk(
  "workspace/createWorkSpace",
  async (nameWorkspace: string) => {
    try {
      return await WorkspaceService.createWorkSpace(nameWorkspace, auth);
    } catch (error) {
      return error;
    }
  }
);

const deleteWorkSpace = createAsyncThunk(
  "workspace/deleteWorkSpace",
  async () => {
    try {
      return await WorkspaceService.deleteWorkSpace(auth);
    } catch (error) {
      return error;
    }
  }
);

const updateWorkSpace = createAsyncThunk(
  "workspace/updateWorkSpace",
  async (formData: any) => {
    try {
      return await WorkspaceService.updateWorkSpace(formData, auth);
    } catch (error) {
      return error;
    }
  }
);

const addWorkSpaceMember = createAsyncThunk(
  "workspace/addWorkSpaceMember",
  async (workID: any) => {
    try {
      return await WorkspaceService.addWorkSpaceMember(workID, auth);
    } catch (error) {
      return error;
    }
  }
);

const removeWorkSpaceMember = createAsyncThunk(
  "workspace/removeWorkSpaceMember",
  async (workID: any) => {
    try {
      return await WorkspaceService.removeWorkSpaceMember(workID, auth);
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
      .addCase(fetchWorkSpaces.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(fetchWorkSpaces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.workSpaces = action.payload;
        state.isError = "";
      })
      .addCase(fetchWorkSpaces.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = action.error.message;
        state.workSpaces = [];
      })

      // create workSpace
      .addCase(createWorkSpace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWorkSpace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workSpaces = [...state.workSpaces, action.payload];
        state.isError = "";
      })
      .addCase(createWorkSpace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.workSpaces = [];
      });
  },
});

export default workSpacesSlice.reducer;
export { fetchWorkSpaces ,createWorkSpace , deleteWorkSpace ,updateWorkSpace,addWorkSpaceMember , removeWorkSpaceMember};
export const selectWorkSpaces = (state: TypeStore) => state.workSpaces;
