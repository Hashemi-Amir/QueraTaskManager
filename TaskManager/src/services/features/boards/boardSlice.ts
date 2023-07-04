import changePositionReducer from "./reducers/changePositionReducer";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import boardService from "./boardService";
import { commentType } from "../../../components/dashboard/dashboardColumnView/TaskCard";
import {
  fetchAssignTask,
  fetchUnAssignTask,
  fetchUpdateTask,
} from "../tasks/taskSlice";
import { fetchCreateTask, fetchDeleteTask } from "../tasks/taskSlice";
import { AxiosError } from "axios";

type PositionProps = {
  id: string;
  index: number;
};
type taskAssignsType = {
  _id: string;
  username: string;
  email: string;
};
export type Task = {
  _id: string;
  name: string;
  description: string;
  label: [];
  board: string;
  taskAssigns: taskAssignsType[];
  comments: commentType[];
  position: number;
  deadline: string;
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
  selectedTaskId: string;
  selectedProjectId: string;
  searchedTaskValue: string;
  searchedTask: [];
  projects: ProjectType[];
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
  selectedTaskId: "",
  selectedProjectId: "",
  searchedTaskValue: "",
  searchedTask: [],
  projects: [],
  isLoadingPost: false,
  isSuccessPost: false,
  isErrorPost: false,
  messagePost: "",
};

// fetch Boards
const fetchBoards = createAsyncThunk(
  "Boards/fetchBoards",
  async (id: string, thunkAPI) => {
    try {
      return await boardService.fetchBoards(id);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);
// Change Board Position
const fetchChangeBoardPosition = createAsyncThunk(
  "Boards/fetchChangeBoardPosition",
  async ({ id, index }: PositionProps, thunkAPI) => {
    try {
      return await boardService.fetchChangeBoardPosition({ id, index });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);
//  Change Task Position
const fetchChangeTaskPosition = createAsyncThunk(
  "Boards/ChangeTaskPosition",
  async ({ id, index }: PositionProps, thunkAPI) => {
    try {
      return await boardService.fetchChangeTaskPosition({ id, index });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
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
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// create Board
const createBoard = createAsyncThunk(
  "Boards/createBoard",
  async (data: (string | undefined)[], thunkAPI) => {
    try {
      return await boardService.createBoard(data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
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
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// Delete comment
const deleteComment = createAsyncThunk(
  "Boards/deleteComment",
  async (commentId: string, thunkAPI) => {
    try {
      return await boardService.deleteComment(commentId);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
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
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);


// fetch select Board
export const fetchSelectBoard = createAsyncThunk(
  "Boards/fetchSelectBoard",
  async (id: string, thunkAPI) => {
    try {
      return await boardService.fetchSelectBoard(id);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
)

// delete Board
const deleteBoard = createAsyncThunk(
  "Boards/deleteBoard",
  async (id: string, thunkAPI) => {
    try {
      return await boardService.deleteBoard(id);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// rename board
const editBoardName = createAsyncThunk(
  "Boards/editBoardName",
  async (data: (string | undefined)[], thunkAPI) => {
    try {
      return await boardService.editBoardName(data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message =
          error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
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
    setSelectedBoardId: (state, action) => {
      state.selectedBoardId = action.payload;
    },
    setSelectedTaskId: (state, action) => {
      state.selectedTaskId = action.payload;
    },
    setSearchedTask: (state, action) => {
      state.searchedTask = action.payload;
    },
    setSearchedTaskValue: (state, action) => {
      state.searchedTaskValue = action.payload;
    },
    resetBoards: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.projects = [];
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
    resetBoard: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
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
        const projectIndex = state.projects.findIndex((project) => {
          return project.projectId == projectId;
        });
        if (projectIndex >= 0) {
          state.projects[projectIndex].projectBoards = action.payload.sort(
            (b: Task, a: Task) => a.position - b.position
          );
        } else {
          state.projects.push({
            projectId,
            projectBoards: action.payload.sort(
              (b: Task, a: Task) => a.position - b.position
            ),
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
            ?.tasks.find((task) => task._id === state.selectedTaskId)
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

        const curCommentArr = state.projects
          .find((project) => project.projectId === state.selectedProjectId)
          ?.projectBoards.find((board) => board._id === state.selectedBoardId)
          ?.tasks.find((task) => task._id === state.selectedTaskId)?.comments;

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
            ?.tasks.find((task) => task._id === state.selectedTaskId)
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
        state.projects
          .find((project) => project.projectId === state.selectedProjectId)
          ?.projectBoards.find((board) => board._id === state.selectedBoardId)
          ?.tasks.map((task) => {
            if (task._id === state.selectedTaskId) {
              task.name = action.payload.name;
              task.deadline = action.payload.deadline;
              task.description = action.payload.description;
            }
          });
      })
      .addCase(fetchAssignTask.fulfilled, (state, action) => {
        state.projects
          .find((project) => project.projectId === state.selectedProjectId)
          ?.projectBoards.find((board) => board._id === state.selectedBoardId)
          ?.tasks.map((task) => {
            if (task._id === state.selectedTaskId) {
              task.taskAssigns.push(action.payload.user);
            }
          });
      })
      .addCase(fetchUnAssignTask.fulfilled, (state, action) => {
        state.projects
          .find((project) => project.projectId === state.selectedProjectId)
          ?.projectBoards.find((board) => board._id === state.selectedBoardId)
          ?.tasks.map((task) => {
            if (task._id === state.selectedTaskId) {
              task.taskAssigns = task.taskAssigns.filter(
                (user) => user._id !== action.payload
              );
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
        state.messagePost = "ستون ساخته شد :)";
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
        state.messagePost = "ستون حذف شد";
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
//TODO Clean Store
export default boardsSlice.reducer;

export {
  fetchBoards,
  fetchChangeBoardPosition,
  fetchChangeTaskPosition,
  fetchChangeTaskBoard,
  addComment,
  deleteComment,
  updateComment,
  createBoard,
  deleteBoard,
  editBoardName,
};
export const {
  setSearchedTaskValue,
  setSearchedTask,
  changePosition,
  setSelectedProjectId,
  resetBoard,
  setSelectedBoardId,
  setSelectedTaskId,
  resetBoards,
  resetPostBoard,
  resetComment,
} = boardsSlice.actions;
