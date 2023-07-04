import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";
import { FieldValues } from "../../../pages/profile/PersonalInfo";
import { logOut } from "../auth/authSlice";
import { AxiosError } from "axios";

type User = {
  _id: string;
  username: string;
  email: string;
  workspaces: [];
  workspaceMember: [];
  taskAssignees: [];
  comments: [];
  settings: [];
  projectMember: [];
  firstname: string;
  lastname: string;
};

type initialStateType = {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: unknown;
  theme: string;
};

const initialState: initialStateType = {
  user: JSON.parse(localStorage.getItem("user") as string) || null,
  // user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  theme: localStorage.getItem("theme") as string,
  message: "",
};

// updateUserById
export const updateUserById = createAsyncThunk(
  "user/updateUserById",
  async (userData: FieldValues, thunkAPI) => {
    try {
      return await userService.updateUserById(userData);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);



export const fetchAddedMemberWorkspace = createAsyncThunk(
  "user/fetchAddedMemberWorkspace",
  async (memberId: string | undefined, thunkAPI) => {
    try {
      return await userService.fetchAddedMemberWorkspace(memberId);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Reset helper flags
    resetUser: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // updateUserById
      .addCase(updateUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = action.payload.message;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logOut, (state) => {
        state.user = null;
      });
  },
});

export const { resetUser, setTheme } = userSlice.actions;
export default userSlice.reducer;
