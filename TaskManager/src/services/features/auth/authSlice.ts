import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authServie from "./authService";

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user")!);

type User = {
  message: string;
  code: number;
  error: boolean;
  data: {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    profile_url: string;
    phone: string;
    workspaces: [];
    workspaceMember: [];
    taskAssignees: [];
    comments: [];
    settings: [];
    projectMember: [];
    _id: string;
  };
};

type initialStateType = {
  user: null | User[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: unknown;
};

const initialState: initialStateType = {
  user: user ? user : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export interface RegisterData {
  username: string;
  password: string;
  email: string;
}

// Register user

export const register = createAsyncThunk(
  "auth/register",
  async (userData: RegisterData, thunkAPI) => {
    try {
      return await authServie.register(userData);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
