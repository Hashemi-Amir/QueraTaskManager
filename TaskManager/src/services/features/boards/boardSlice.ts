import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AXIOS from "../utils/AXIOS";

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
  position: "";
  project: "";
  tasks: Task[];
};
type ProjectType = {
  projectId: string;
  projectBoards: BoardType[];
};
type initialStateType = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: unknown;
  selectedId: string;
  projects: ProjectType[];
  test: any;
};

// boards (boardsState) => projects => projectBoards => boards => board => tasks

const initialState: initialStateType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  selectedId: "",
  projects: [],
  test: [],
};

// fetchBoards
const fetchBoards = createAsyncThunk(
  "Boards/fetchBoards",
  async (id: string, thunkAPI) => {
    try {
      const response = await AXIOS.get(`/api/board/${id}`);
      const data = await response.data;
      return data;
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
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },

    changeTaskPosition: (state, action) => {
      // Find the project that is currently active
      const activeProject = state.projects.find((project) => {
        return project.projectId == state.selectedId;
      });

      // Find the index of the active project in the list of projects
      const activeProjectIndex = state.projects.findIndex((project) => {
        return project.projectId == state.selectedId;
      });

      // Find the board where the task has been dropped
      const droppableBoard = activeProject?.projectBoards.find((board) => {
        return board._id == action.payload.source.droppableId;
      });

      // Find the index of the droppable board
      const droppableBoardIndex = state.projects[
        activeProjectIndex
      ].projectBoards.findIndex((board) => {
        return board._id == action.payload.source.droppableId;
      });

      // Create a copy of the tasks array for the current board
      const items = Array.from(
        state.projects[activeProjectIndex].projectBoards[droppableBoardIndex]
          .tasks
      );

      // Find the task that was dragged and dropped
      const reorderedTask = droppableBoard?.tasks.find((task) => {
        return task._id == action.payload.draggableId;
      });

      // Get the destination and source index of the dragged task
      const destinationPos = action.payload.destination.index;
      const sourcePos = action.payload.source.index;

      // Remove the dragged item from its original position in the array
      const [reorderedItem] = items.splice(sourcePos, 1);

      // Insert the dragged item at its new position in the array
      items.splice(destinationPos, 0, reorderedItem);

      // Update the tasks array for the board
      state.projects[activeProjectIndex].projectBoards[
        droppableBoardIndex
      ].tasks = items;
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
        const projectIndex = state.projects.findIndex((item) => {
          return item.projectId === projectId;
        });
        if (projectIndex >= 0) {
          // Project exists, add the new board to its list of boards
          state.projects[projectIndex].projectBoards = action.payload;
        } else {
          // Project doesn't exist, create a new index and add the new board with its own list of boards
          state.projects.push({
            projectId: projectId,
            projectBoards: action.payload,
          });
        }
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.projects = [];
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default boardsSlice.reducer;
export const { setSelectedId, changeTaskPosition } = boardsSlice.actions;
export { fetchBoards };
