import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";
import { FieldValues } from "../../../pages/profile/PersonalInfo";
import { logOut } from "../auth/authSlice";

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
};

const initialState: initialStateType = {
  user: JSON.parse(localStorage.getItem("user") as string) || null,
  // user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// updateUserById
export const updateUserById = createAsyncThunk(
  "user/updateUserById",
  async (userData: FieldValues, thunkAPI) => {
    try {
      return await userService.updateUserById(userData);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// getUserByUserNameOrId
// export const getUserByUserNameOrId = createAsyncThunk(
//   "user/getUserByUserNameOrId",
//   async (userData: FieldValues, thunkAPI) => {
//     try {
//       return await userService.getUserByUserNameOrId(userData);
//     } catch (error: any) {
//       const message =
//         error?.response?.data?.message || error.message || error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );


export const fetchAddedMember = createAsyncThunk(
  "user/fetchAddedMember",
  async (memberId:string | undefined, thunkAPI) => {
    try {
      return await userService.fetchAddedMember(memberId);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
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
    // getUserByUserNameOrId
    // .addCase(getUserByUserNameOrId.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(getUserByUserNameOrId.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.user = action.payload;
    //   state.message = action.payload.message;
    // })
    // .addCase(getUserByUserNameOrId.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload;
    // });
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
