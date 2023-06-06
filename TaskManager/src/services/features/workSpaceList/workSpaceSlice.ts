import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TypeStore } from "../../app/store";
import axios from "axios";
import WorkspaceService from "./workSpaceService";
// type WorkSpace = {

// };
const auth = {
  headers: {
    "x-auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzhkNzgwOWM4ZDk4NGUxNWNjN2U3NiIsInVzZXJuYW1lIjoic2luYTIiLCJlbWFpbCI6InNpbmEubmlsaTA5NzJAZ21haWwuY29tIiwiaWF0IjoxNjg1OTcwNTU3LCJleHAiOjE2ODYwNTY5NTd9.nxS85uBtKIBh0zjiGFt9XcQQP8OuGo9s0TbPKbs1bD4",
  },
};
type initialStateType = {
  isLoading: boolean;
  workSpace: object;
  isError: string | undefined;
};

const initialState: initialStateType = {
  isLoading: false,
  workSpace: {},
  isError: "",
};

const fetchWorkSpace = createAsyncThunk(
  "workspace/fetchWorkSpace",
  async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/workspace/get-all",auth);
      const data = await response.data;
      return data;
    } catch (error) {
      return error;
    }
  }
);


const createWorkSpace = createAsyncThunk(
  "workspace/createWorkSpace",
  async (nameWorkspace:string) => {
    try{
      return await WorkspaceService.createWorkSpace(nameWorkspace);
    }catch (error){
      return error
    }
  }
)



const workSpaceSlice = createSlice({
  name: "workSpace",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkSpace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWorkSpace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workSpace = action.payload;
        state.isError = "";
      })
      .addCase(fetchWorkSpace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.workSpace = [];
      })
      .addCase(createWorkSpace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createWorkSpace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.workSpace = action.payload
        state.isError = "";
      })
      .addCase(createWorkSpace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message;
        state.workSpace = [];
      });
  },
});

export default workSpaceSlice.reducer;
export { fetchWorkSpace , createWorkSpace};
export const selectWorkSpace = (state: TypeStore) => state.workSpace;
