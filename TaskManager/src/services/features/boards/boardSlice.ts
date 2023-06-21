import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AXIOS from "../utils/AXIOS";
import boardService from "./boardService";
import { commentType } from "../../../components/dashboard/dashboardColumnView/TaskCard";
import { fetchUpdateTask } from "../tasks/taskSlice";
import { fetchCreateTask, fetchDeleteTask } from "../tasks/taskSlice";

export type Task = {
  _id: string;
  name: string;
  description: string;
  label: [];
  board: string;
  taskAssigns: [];
  comments: commentType[];
  position: number;
  deadline: string;
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

  addCommentIsLoading: boolean;
  addCommentIsSuccess: boolean;
  addCommentIsError: boolean;
  addCommentMessage: unknown;

  editingCommentIsLoading: boolean;
  editingCommentIsSuccess: boolean;
  editingCommentIsError: boolean;
  editingCommentMessage: unknown;

  deleteCommentIsLoading: boolean;
  deleteCommentIsSuccess: boolean;
  deleteCommentIsError: boolean;
  deleteCommentMessage: unknown;

  selectedBoardId: string;
  selectedTaskdId: string;
  selectedProjectId: string;
  projects: ProjectType[];
  test: any;
  isLoadingPost: boolean;
  isSuccessPost: boolean;
  isErrorPost: boolean;
  messagePost: unknown;
};

// boards (boardsState) => projects => projectBoards => boards => board => tasks

const initialState: initialStateType = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",

  // Adding Comment Flags
  addCommentIsLoading: false,
  addCommentIsSuccess: false,
  addCommentIsError: false,
  addCommentMessage: "",

  // Editing Comment Flags
  editingCommentIsLoading: false,
  editingCommentIsSuccess: false,
  editingCommentIsError: false,
  editingCommentMessage: "",

  // Deleting Comment Flags
  deleteCommentIsLoading: false,
  deleteCommentIsSuccess: false,
  deleteCommentIsError: false,
  deleteCommentMessage: "",

  selectedBoardId: "",
  selectedTaskdId: "",
  selectedProjectId: "",
  projects: [],
  test: [],
  isLoadingPost: false,
  isSuccessPost: false,
  isErrorPost: false,
  messagePost: "",
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

// create Board
const createBoard = createAsyncThunk(
  "Boards/createBoard",
  async (data: (string | undefined)[], thunkAPI) => {
    try {
      return await boardService.createBoard(data);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add comment
export type createCommentDataType = {
  text: string;
  taskId: string;
};

const addComment = createAsyncThunk(
  "Boards/addComment",
  async (commentData: createCommentDataType, thunkAPI) => {
    try {
      return await boardService.addComment(commentData);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete comment
const deleteComment = createAsyncThunk(
  "Boards/deleteComment",
  async (commentId: string, thunkAPI) => {
    try {
      return await boardService.deleteComment(commentId);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update comment
export type updateCommentDataType = {
  text: string;
  id: string;
};

const updateComment = createAsyncThunk(
  "Boards/updateComment",
  async (commentData: updateCommentDataType, thunkAPI) => {
    try {
      return await boardService.updateComment(commentData);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete Board
const deleteBoard = createAsyncThunk(
  "Boards/deleteBoard",
  async (id: string, thunkAPI) => {
    try {
      return await boardService.deleteBoard(id);
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// rename board
const editBoardName = createAsyncThunk(
  "Boards/editBoardName",
  async (data: (string | undefined)[], thunkAPI) => {
    try {
      return await boardService.editBoardName(data);
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
    setSelectedBoardId: (state, action) => {
      state.selectedBoardId = action.payload;
    },
    setSelectedTaskdId: (state, action) => {
      state.selectedTaskdId = action.payload;
    },

    changeTaskPosition: (state, action) => {
      // Find the project that is currently active
      const activeProject = state.projects.find((project) => {
        return project.projectId == state.selectedProjectId;
      });

      // Find the index of the active project in the list of projects
      const activeProjectIndex = state.projects.findIndex((project) => {
        return project.projectId == state.selectedProjectId;
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

    // Reset comment helper flags
    resetComment: (state) => {
      state.addCommentIsLoading = false;
      state.addCommentIsSuccess = false;
      state.addCommentIsError = false;
      state.addCommentMessage = "";

      state.editingCommentIsLoading = false;
      state.editingCommentIsSuccess = false;
      state.editingCommentIsError = false;
      state.editingCommentMessage = "";

      state.deleteCommentIsLoading = false;
      state.deleteCommentIsSuccess = false;
      state.deleteCommentIsError = false;
      state.deleteCommentMessage = "";
    },

    resetPostBoard: (state) => {
      state.isLoadingPost = false;
      state.isSuccessPost = false;
      state.isErrorPost = false;
      state.messagePost = "";
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
      })
      // Add comment
      .addCase(addComment.pending, (state) => {
        state.addCommentIsLoading = true;
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<commentType>) => {
          state.addCommentIsLoading = false;
          state.addCommentIsSuccess = true;

          state.projects
            .find((project) => project.projectId === state.selectedProjectId)
            ?.projectBoards.find((board) => board._id === state.selectedBoardId)
            ?.tasks.find((task) => task._id === state.selectedTaskdId)
            ?.comments.push(action.payload);
        }
      )
      .addCase(addComment.rejected, (state, action) => {
        state.addCommentIsLoading = false;
        state.addCommentIsError = true;
        state.addCommentMessage = action.payload;
      })
      // Delete comment
      .addCase(deleteComment.pending, (state) => {
        state.deleteCommentIsLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.deleteCommentIsLoading = false;
        state.deleteCommentIsSuccess = true;
        console.log(action);

        const curCommentArr = state.projects
          .find((project) => project.projectId === state.selectedProjectId)
          ?.projectBoards.find((board) => board._id === state.selectedBoardId)
          ?.tasks.find((task) => task._id === state.selectedTaskdId)?.comments;

        const commentIndex = curCommentArr?.findIndex(
          (comment) => comment._id === action.payload
        );

        if (commentIndex || commentIndex === 0)
          curCommentArr?.splice(commentIndex, 1);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.deleteCommentIsLoading = false;
        state.deleteCommentIsError = true;
        state.deleteCommentMessage = action.payload;
      })
      // Editing comment
      .addCase(updateComment.pending, (state) => {
        state.editingCommentIsLoading = true;
      })
      .addCase(
        updateComment.fulfilled,
        (state, action: PayloadAction<commentType>) => {
          state.editingCommentIsLoading = false;
          state.editingCommentIsSuccess = true;

          state.projects
            .find((project) => project.projectId === state.selectedProjectId)
            ?.projectBoards.find((board) => board._id === state.selectedBoardId)
            ?.tasks.find((task) => task._id === state.selectedTaskdId)
            ?.comments.map((comment) => {
              if (comment._id === action.payload._id)
                comment.text = action.payload.text;
            });
        }
      )
      .addCase(updateComment.rejected, (state, action) => {
        state.editingCommentIsLoading = false;
        state.editingCommentIsError = true;
        state.editingCommentMessage = action.payload;
      })
      .addCase(fetchUpdateTask.fulfilled, (state, action) => {
        console.log(action.payload);
        state.projects
          .find((project) => project.projectId === state.selectedProjectId)
          ?.projectBoards.find((board) => board._id === state.selectedBoardId)
          ?.tasks.map((task) => {
            if (task._id === state.selectedTaskdId) {
              task.name = action.payload.name;
              task.deadline = action.payload.deadline;
              task.description = action.payload.description;
            }
          });
      })
      // create board
      .addCase(createBoard.pending, (state) => {
        state.isLoadingPost = true;
        state.isSuccessPost = false;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.isLoadingPost = false;
        // find project
        const selectedProject = action.payload.project;
        const index = state.projects.findIndex((project) => {
          return project.projectId === selectedProject;
        });

        state.projects[index].projectBoards.push(action.payload);
        state.isSuccessPost = true;
        state.messagePost = "برد ساخته شد :)";
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.isLoadingPost = false;
        state.isSuccessPost = false;
        state.isErrorPost = true;
        state.messagePost = action.payload;
      })

      // delete board
      .addCase(deleteBoard.pending, (state) => {
        state.isLoadingPost = true;
        state.isSuccessPost = false;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.isLoadingPost = false;
        // find project
        const selectedProject = action.payload.project;
        const index = state.projects.findIndex((project) => {
          return project.projectId === selectedProject;
        });
        state.projects[index].projectBoards = state.projects[
          index
        ].projectBoards.filter((board) => board._id != action.payload._id);
        state.isSuccessPost = true;
        state.messagePost = "برد حذف شد";
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.isLoadingPost = false;
        state.isSuccessPost = false;
        state.isErrorPost = true;
        state.messagePost = action.payload;
      })

      // rename board
      .addCase(editBoardName.pending, (state) => {
        state.isLoadingPost = true;
        state.isSuccessPost = false;
      })
      .addCase(editBoardName.fulfilled, (state, action) => {
        state.isLoadingPost = false;
        // find project
        const selectedProject = action.payload.project;
        const index = state.projects.findIndex((project) => {
          return project.projectId === selectedProject;
        });

        state.projects[index].projectBoards = state.projects[
          index
        ].projectBoards.map((board) => {
          return board._id === action.payload._id
            ? { ...board, name: action.payload.name }
            : board;
        });
        state.isSuccessPost = true;
      })
      .addCase(editBoardName.rejected, (state, action) => {
        state.isLoadingPost = false;
        state.isSuccessPost = false;
        state.isErrorPost = true;
        state.messagePost = action.payload;
      })

      // update board by create task
      .addCase(fetchCreateTask.fulfilled, (state, action) => {
        let selectedProject = "";
        const boardId = action.payload.board;

        // find project id
        state.projects.forEach((project) => {
          project.projectBoards.forEach((board) => {
            board._id === boardId ? (selectedProject = project.projectId) : "";
          });
        });

        // find project and board index
        const projectIndx = state.projects.findIndex(
          (project) => project.projectId === selectedProject
        );

        const boardIndx = state.projects[projectIndx].projectBoards.findIndex(
          (board) => board._id === boardId
        );

        // dispatch task to board
        state.projects[projectIndx].projectBoards[boardIndx].tasks.push(
          action.payload
        );
      })

      // update board by delete task
      .addCase(fetchDeleteTask.fulfilled, (state, action) => {
        let selectedProject = "";
        const boardId = action.payload.board;

        // find project id
        state.projects.forEach((project) => {
          project.projectBoards.forEach((board) => {
            board._id === boardId ? (selectedProject = project.projectId) : "";
          });
        });

        // find project and board index
        const projectIndx = state.projects.findIndex(
          (project) => project.projectId === selectedProject
        );
        const boardIndx = state.projects[projectIndx].projectBoards.findIndex(
          (board) => board._id === boardId
        );

        state.projects[projectIndx].projectBoards[boardIndx].tasks =
          state.projects[projectIndx].projectBoards[boardIndx].tasks.filter(
            (task) => task._id != action.payload._id
          );
      });
  },
});

export default boardsSlice.reducer;

export {
  fetchBoards,
  addComment,
  deleteComment,
  updateComment,
  createBoard,
  deleteBoard,
  editBoardName,
};
export const {
  setSelectedProjectId,
  changeTaskPosition,
  resetPostBoard,
  setSelectedBoardId,
  setSelectedTaskdId,
  resetComment,
} = boardsSlice.actions;
