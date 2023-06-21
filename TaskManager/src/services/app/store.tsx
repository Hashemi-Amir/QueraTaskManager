import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../features/calendar/calendarSlice";
import workSpacesReducer from "../features/workSpaceList/workSpacesSlice";
import authReducer from "../features/auth/authSlice";
import projectReducer from "../features/projects/projectSlice";
import boardReducer from "../features/boards/boardSlice";
import userReducer from "../features/user/userSlice";
import taskReducer from "../features/tasks/taskSlice";

//! We should first import our actions from our slices here, then export them at the bottom
import {
  resetTask,
  fetchCreateTask,
  fetchDeleteTask,
} from "../features/tasks/taskSlice";
import {
  fetchBoards,
  createBoard,
  deleteBoard,
  editBoardName,
  resetPostBoard,
  setSelectedProjectId,
  changeTaskPosition,
  setSelectedBoardId,
  setSelectedTaskdId,
  addComment,
  deleteComment,
  updateComment,
} from "../features/boards/boardSlice";
import {
  fetchProjects,
  setSelectedProject,
  resetProject,
  resetPostProject,
  createProject,
  deleteProject,
  editProjectName,
  addMemberToProject,
  removeMemberThanProject,
} from "../features/projects/projectSlice";
import { setDate, setRef } from "../features/calendar/calendarSlice";
import {
  setSelectedWorkSpaceHeader,
  setSelectedWorkSpaceId,
  setSelectedSpace,
  resetWorkspaces,
  resetPostWorkspace,
  fetchAllWorkSpaces,
  createWorkSpace,
  deleteWorkSpace,
  updateWorkSpace,
  addWorkSpaceMember,
  removeWorkSpaceMember,
} from "../features/workSpaceList/workSpacesSlice";
import { updateUserById, resetUser } from "../features/user/userSlice";

import { fetchUpdateTask } from "../features/tasks/taskSlice";

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    workSpaces: workSpacesReducer,
    auth: authReducer,
    projects: projectReducer,
    boards: boardReducer,
    tasks: taskReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

//! Export those imported actions here one by one
export { resetTask, fetchCreateTask, fetchDeleteTask };

export {
  fetchProjects,
  resetProject,
  resetPostProject,
  setSelectedProject,
  createProject,
  deleteProject,
  editProjectName,
  addMemberToProject,
  removeMemberThanProject,
};
export {
  fetchBoards,
  createBoard,
  deleteBoard,
  editBoardName,
  resetPostBoard,
  setSelectedProjectId,
  changeTaskPosition,
  setSelectedBoardId,
  setSelectedTaskdId,
  addComment,
  deleteComment,
  updateComment,
};
export { setDate, setRef };
export {
  setSelectedWorkSpaceHeader,
  setSelectedWorkSpaceId,
  setSelectedSpace,
  resetWorkspaces,
  resetPostWorkspace,
  fetchAllWorkSpaces,
  createWorkSpace,
  deleteWorkSpace,
  updateWorkSpace,
  addWorkSpaceMember,
  removeWorkSpaceMember,
};
export { updateUserById, resetUser };
export { fetchUpdateTask };
