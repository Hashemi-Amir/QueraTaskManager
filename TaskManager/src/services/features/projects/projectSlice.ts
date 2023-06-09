import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

const auth = {
  headers: {
    "x-auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODA3ZjlkNjM3M2NlZmM0Mjg2YTE1MiIsInVzZXJuYW1lIjoic2FlZWRhYmVkaW5pIiwiZW1haWwiOiJzYWVlZGFiZWRpbmlAZ21haWwuY29tIiwiaWF0IjoxNjg2MjY4MjEyLCJleHAiOjE2ODYzNTQ2MTJ9.dzApLHZahLQ_1croR29qZ58xXuykyBJUEVZOU7SBFLg",
  },
};
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
  errorMessage: unknown ;
  id: string;
  projects: ProjectsProps[];
};

const initialState: initialStateType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  projects: [],
  id: "",
};

const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/projects/workspaces/${id}`,
        auth
      );
      return await response.data;
    } catch (error: any) {
      const errorMessage =
      error?.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(errorMessage);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(
        fetchProjects.fulfilled,
        (state, action: PayloadAction<AxiosResponse<any, any>>) => {
          state.isLoading = false;
          state.isSuccess = true;
          const fetchedProjects = action.payload.data; // extract projects from AxiosResponse object
          if (fetchedProjects && Array.isArray(fetchedProjects)) {
            state.projects = fetchedProjects;
          }
        }
      )
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.projects = [];
        state.isError = true;
        state.errorMessage = action.error
      });
  },
});

export default projectSlice.reducer;
export const { setId } = projectSlice.actions;
export { fetchProjects };
