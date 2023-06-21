import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskService from "./taskService";

type createTast = {
  name: string | undefined;
  description: string | undefined;
  boardId: string | undefined;
  deadline : string;
};

type initialStateType = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: unknown;
};

const initialState: initialStateType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// create task
const fetchCreateTask = createAsyncThunk(
  "Tasks/fetchCreateTask",
  async (data: createTast, thunkAPI) => {
    try {
      return await taskService.fetchCreateTask(data);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete task
const fetchDeleteTask = createAsyncThunk(
  "Tasks/fetchDeleteTask",
  async (id: string, thunkAPI) => {
    try {
      return await taskService.fetchDeleteTask(id);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const tasksSlice = createSlice({
  name: "Tasks",
  initialState,
  reducers: {
    resetTask: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      //create task
      .addCase(fetchCreateTask.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchCreateTask.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "تسک ساخته شد";
      })

      .addCase(fetchCreateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })


      // delete task
      .addCase(fetchDeleteTask.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchDeleteTask.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "تسک حذف شد";
      })

      .addCase(fetchDeleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default tasksSlice.reducer;
export const { resetTask } = tasksSlice.actions;
export { fetchCreateTask, fetchDeleteTask };
