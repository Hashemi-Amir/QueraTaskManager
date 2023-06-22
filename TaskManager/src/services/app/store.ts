import {
  AnyAction,
  combineReducers,
  configureStore,
  createAction,
} from "@reduxjs/toolkit";
import calendarReducer from "../features/calendar/calendarSlice";
import authReducer from "../features/auth/authSlice";
import projectReducer, {
  fetchProjects,
  resetProject,
  resetPostProject,
  createProject,
  deleteProject,
  editProjectName,
  addMemberToProject,
  removeMemberThanProject,
} from "../features/projects/projectSlice";
import taskReducer,{
  resetTask,
  fetchCreateTask,
  fetchDeleteTask,
  fetchUpdateTask
} from "../features/tasks/taskSlice";

import boardReducer, {
  fetchBoards,
  fetchChangeBoardPosition,
  fetchChangeTaskPosition,
  fetchChangeTaskBoard,
  addComment,
  deleteComment,
  updateComment,
  setSelectedBoardId,
  setSelectedTaskId,
  createBoard,
  deleteBoard,
  editBoardName,
  resetPostBoard,
} from "../features/boards/boardSlice";
import userReducer, {
  updateUserById,
  resetUser,
} from "../features/user/userSlice";
import workSpacesReducer, {
  fetchAllWorkSpaces,
  createWorkSpace,
  deleteWorkSpace,
  updateWorkSpace,
  addWorkSpaceMember,
  removeWorkSpaceMember,
  resetPostWorkspace,
} from "../features/workSpaceList/workSpacesSlice";

// Define the appReducer to combine all the reducers used in the application
const appReducer = combineReducers({
  calendar: calendarReducer,
  workSpaces: workSpacesReducer,
  auth: authReducer,
  projects: projectReducer,
  boards: boardReducer,
  user: userReducer,
  tasks: taskReducer,
});

// Define the rootReducer, which is responsible for handling resetting the state of the entire application
const rootReducer = (state: any, action: AnyAction) => {
  // If the dispatched action type is 'resetAllState'
  if (action.type === "resetAllState") {
    // Reset the state of the application to undefined
    state = undefined;
  }
  // Pass the updated state and the action to the appReducer
  return appReducer(state, action);
};

// Create an action creator for resetting the state of the entire application
const resetAllState = createAction("resetAllState");

// Configure the store using the rootReducer and the getDefaultMiddleware function
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
  fetchProjects,
  resetProject,
  resetPostProject,
  createProject,
  deleteProject,
  editProjectName,
  addMemberToProject,
  removeMemberThanProject,
  resetTask,
  fetchUpdateTask,
  fetchCreateTask,
  fetchDeleteTask,
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
  resetPostBoard,
  setSelectedBoardId,
  setSelectedTaskId,
  fetchAllWorkSpaces,
  createWorkSpace,
  deleteWorkSpace,
  updateWorkSpace,
  addWorkSpaceMember,
  removeWorkSpaceMember,
  resetPostWorkspace,
  updateUserById,
  resetUser,
  resetAllState,
};
