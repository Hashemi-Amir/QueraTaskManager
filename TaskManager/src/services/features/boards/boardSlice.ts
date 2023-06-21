import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import boardService from "./boardService";
import changePositionReducer from "./reducers/changePositionReducer";

type PositionProps = {
  id: string;
  index: number;
};
export type Task = {
  _id: string;
  name: string;
  description: string;
  label: [];
  board: string;
  taskAssigns: [];
  comments: [];
  position: number;
};
type BoardType = {
  _id: "";
  name: "";
  position: number;
  project: "";
  tasks: Task[];
};
type ProjectType = {
  projectId: string;
  projectBoards: BoardType[];
};
export type initialStateType = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: unknown;
  selectedProjectId: string;
  projects: ProjectType[];
  test: any;
};

// boards (boardsState) => projects => projectBoards => boards => board => tasks

const initialState: initialStateType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  selectedProjectId: "",
  projects: [],
  test: [],
};

// fetch Boards
const fetchBoards = createAsyncThunk(
  "Boards/fetchBoards",
  async (id: string, thunkAPI) => {
    try {
      return await boardService.fetchBoards(id);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Change Board Position
const fetchChangeBoardPosition = createAsyncThunk(
  "Boards/fetchChangeBoardPosition",
  async ({ id, index }: PositionProps, thunkAPI) => {
    try {
      return await boardService.fetchChangeBoardPosition({ id, index });
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//  Change Task Position
const fetchChangeTaskPosition = createAsyncThunk(
  "Boards/ChangeTaskPosition",
  async ({ id, index }: PositionProps, thunkAPI) => {
    try {
      return await boardService.fetchChangeTaskPosition({ id, index });
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//  Change Task Board
const fetchChangeTaskBoard = createAsyncThunk(
  "Boards/ChangeTaskBoard",
  async (
    {
      id,
      boardId,
    }: {
      id: string;
      boardId: string;
    },
    thunkAPI
  ) => {
    try {
      return await boardService.fetchChangeTaskBoard({ id, boardId });
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const boardsSlice = createSlice({
  name: "Boards",
  initialState,
  reducers: {
    setSelectedProjectId: (state, action) => {
      state.selectedProjectId = action.payload;
    },
    changePosition: (state, action) => {
      changePositionReducer(state, action);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const projectId = action.meta.arg;
        state.test = action.payload;
        state.projects.push({
          projectId,
          projectBoards: action.payload.sort(
            (b: Task, a: Task) => a.position - b.position
          ),
        });
      })

      .addCase(fetchBoards.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.projects = [];
        state.isError = true;
        state.message = action.payload;
      })

      // Change Board Position
      .addCase(fetchChangeBoardPosition.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })

      // Change Task Position
      .addCase(fetchChangeTaskPosition.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.projects = [];
        state.isError = true;
        state.message = action.payload;
      })

      // Change Task Board
      .addCase(fetchChangeTaskBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.projects = [];
        state.isError = true;
        state.message = action.payload;
      });
  },
});
//TODO Clean Store
export default boardsSlice.reducer;
export const { setSelectedProjectId, changePosition } = boardsSlice.actions;
export {
  fetchBoards,
  fetchChangeBoardPosition,
  fetchChangeTaskPosition,
  fetchChangeTaskBoard,
};
