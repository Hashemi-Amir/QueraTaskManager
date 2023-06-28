import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskService from "./taskService";
import { AxiosError } from "axios";

export type createTask = {
  name: string | undefined;
  description: string | undefined;
  boardId: string | undefined;
  deadline: string | undefined;
};

type initialStateType = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: unknown;
  
  taskAssignisLoading: boolean;
  taskAssignisSuccess: boolean;
  taskAssignisError: boolean;
  taskAssignmessage: string;
};

const initialState: initialStateType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  taskAssignisLoading: false,
  taskAssignisSuccess: false,
  taskAssignisError: false,
  taskAssignmessage: "",
};

// create task
const fetchCreateTask = createAsyncThunk(
  "Tasks/fetchCreateTask",
  async (data: createTask, thunkAPI) => {
    try {
      return await taskService.fetchCreateTask(data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// delete task
const fetchDeleteTask = createAsyncThunk(
  "Tasks/fetchDeleteTask",
  async (id: string, thunkAPI) => {
    try {
      return await taskService.fetchDeleteTask(id);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// update task
export type taskinfoType = {
  name: string;
  description: string;
  deadline: string;
  taskId: string;
};
const fetchUpdateTask = createAsyncThunk(
  "Tasks/fetchUpdateTask",
  async (taskinfo: taskinfoType, thunkAPI) => {
    try {
      return await taskService.fetchUpdateTask(taskinfo);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// assign task
export type assignInfoType = {
  usernameOrId: string;
  taskId: string;
};
const fetchAssignTask = createAsyncThunk(
  "Tasks/fetchAssignTask",
  async (assignInfo: assignInfoType, thunkAPI) => {
    try {
      return await taskService.fetchAssignTask(assignInfo);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);
// unAssign task
export type unAssignInfoType = {
  usernameOrId: string;
  taskId: string;
};
const fetchUnAssignTask = createAsyncThunk(
  "Tasks/fetchUnAssignTask",
  async (unAssignInfo: unAssignInfoType, thunkAPI) => {
    try {
      return await taskService.fetchUnAssignTask(unAssignInfo);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
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
      state.taskAssignisLoading = false;
      state.taskAssignisSuccess = false;
      state.taskAssignisError = false;
      state.taskAssignmessage = "";
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
      })
      // update task
      .addCase(fetchUpdateTask.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchUpdateTask.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "تسک با موفقیت آپدیت شد";
      })

      .addCase(fetchUpdateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // assign task
      .addCase(fetchAssignTask.pending, (state) => {
        state.taskAssignisLoading = true;
      })

      .addCase(fetchAssignTask.fulfilled, (state) => {
        state.taskAssignisLoading = false;
        state.taskAssignisSuccess = true;
        state.taskAssignmessage = "تسک به کاربر اختصاص داده شد";
      })

      .addCase(fetchAssignTask.rejected, (state, action) => {
        state.taskAssignisLoading = false;
        state.taskAssignisError = true;
        state.taskAssignmessage = action.payload as string;
      })
      // unAssign task
      .addCase(fetchUnAssignTask.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchUnAssignTask.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "کاربر از تسک مورد نظر حذف شد";
      })

      .addCase(fetchUnAssignTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default tasksSlice.reducer;
export const { resetTask } = tasksSlice.actions;
export {
  fetchCreateTask,
  fetchDeleteTask,
  fetchUpdateTask,
  fetchAssignTask,
  fetchUnAssignTask,
};
