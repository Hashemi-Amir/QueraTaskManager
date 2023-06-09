// !!!!! this slice is for experiment, I will remove it myself

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import getUserService from "./getUserService";

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  try {
    return await getUserService.getUser();
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

type initialStateType = {
  user: null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: unknown;
};

const initialState: initialStateType = {
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const getUserSlice = createSlice({
  name: "user",
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

      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default getUserSlice.reducer;
export const { reset } = getUserSlice.actions;
