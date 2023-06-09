import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import WorkspaceService from "./workSpaceService";

const auth = {
  headers: {
    "x-auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA3ZjlkNjM3M2NlZmM0Mjg2YTE1MiIsInVzZXJuYW1lIjoic2FlZWRhYmVkaW5pIiwiZW1haWwiOiJzYWVlZGFiZWRpbmlAZ21haWwuY29tIiwiaWF0IjoxNjg2MjY4MjEyLCJleHAiOjE2ODYzNTQ2MTJ9.dzApLHZahLQ_1croR29qZ58xXuykyBJUEVZOU7SBFLg",
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
  isError: boolean;
  errorMessage: unknown;
  workSpaces: WorkSpacesProps[];
};

const initialState: initialStateType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  workSpaces: [],
};

const fetchAllWorkSpaces = createAsyncThunk(
  "workspaces/fetchAllWorkSpaces",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/workspace/get-all",
        auth
      );
      return await response.data.data;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
const fetchWorkSpaceById = createAsyncThunk(
  "workspaces/fetchWorkSpaceById",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/workspace/${id}`,
        auth
      );
      return await response.data.data;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(errorMessage);
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
  async (id:string) => {
    try {
      const data = await WorkspaceService.deleteWorkSpace(id,auth);      
      return data.data
    } catch (error) {
      return error;
    }
  }
);

const updateWorkSpace = createAsyncThunk(
  "workspace/updateWorkSpace",
  async (data:object[]) => {
    try {
      return await WorkspaceService.updateWorkSpace(data, auth);
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
        state.errorMessage = action.error;
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
        state.errorMessage = action.error;
        state.workSpaces = [];
      })

      // create workSpace
      .addCase(createWorkSpace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWorkSpace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workSpaces = [...state.workSpaces, action.payload.data];
        state.isError = "";
      })
      .addCase(createWorkSpace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.workSpaces = [];
      })

      // delete workSpace
      .addCase(deleteWorkSpace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteWorkSpace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workSpaces = state.workSpaces.filter(item => item._id != action.payload._id );
        state.isError = "";
      })
      .addCase(deleteWorkSpace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.workSpaces = [];
      })


      // update workSpace

      .addCase(updateWorkSpace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWorkSpace.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.workSpaces = state.workSpaces[action.payload.data._id].name = action.payload.data.name 
        state.isError = "";
      })
      .addCase(updateWorkSpace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.workSpaces = [];
      })
  },
});

export default workSpacesSlice.reducer;
export { fetchAllWorkSpaces,fetchWorkSpaceById ,createWorkSpace , deleteWorkSpace ,updateWorkSpace,addWorkSpaceMember , removeWorkSpaceMember};
