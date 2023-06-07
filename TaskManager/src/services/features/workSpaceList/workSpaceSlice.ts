import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TypeStore } from "../../app/store";
import axios from "axios";
import WorkspaceService from "./workSpaceService";
// type WorkSpace = {

// };
const auth = {
  headers: {
    "x-auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA1NzljYTczZmUzMmVjYWQxNjExNSIsInVzZXJuYW1lIjoic2luYTMiLCJlbWFpbCI6InNpbmFhLm5pbGkwOTcyQGdtYWlsLmNvbSIsImlhdCI6MTY4NjEzNTM3MywiZXhwIjoxNjg2MjIxNzczfQ.DX-dqah_2WyQCqu-O48QCWpy_b6wz03SrHkf6yiMf_s",
  },
};
type initialStateType = {
  isLoading: boolean;
  workSpaces: {
    _id: string;
    name: string;
    user: string;
    members: [];
    projects: [];
  }[];
  isError: string | undefined;
};

const initialState: initialStateType = {
  isLoading: false,
  workSpaces: [],
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
      return await WorkspaceService.createWorkSpace(nameWorkspace,auth);
    }catch (error){
      return error
    }
  }
)


const deleteWorkSpace = createAsyncThunk(
  "workspace/deleteWorkSpace" ,
  async () => {
    try{
      return await WorkspaceService.deleteWorkSpace(auth)
    }catch (error){
      return error
    }
  }
)

const updateWorkSpace = createAsyncThunk(
  "workspace/updateWorkSpace" ,
  async (formData:any) => {
    try{
      return await WorkspaceService.updateWorkSpace(formData,auth)
    }catch (error){
      return error
    }
  }
)


const addWorkSpaceMember = createAsyncThunk(
  "workspace/addWorkSpaceMember" ,
  async (workID:any) => {
    try{
      return await WorkspaceService.addWorkSpaceMember(workID,auth)
    }catch (error){
      return error
    }
  }
)



const removeWorkSpaceMember = createAsyncThunk(
  "workspace/removeWorkSpaceMember" ,
  async (workID:any) => {
    try{
      return await WorkspaceService.removeWorkSpaceMember(workID,auth)
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
        state.workSpaces = action.payload;
        state.isError = "";
      })
      .addCase(fetchWorkSpace.rejected, (state, action) => {
        state.isLoading = false;
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

export default workSpaceSlice.reducer;
export { fetchWorkSpace , createWorkSpace , deleteWorkSpace ,updateWorkSpace,addWorkSpaceMember , removeWorkSpaceMember};
export const selectWorkSpace = (state: TypeStore) => state.workSpace;
