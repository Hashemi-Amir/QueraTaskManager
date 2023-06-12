import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../features/calendar/calendarSlice";
import workSpacesReducer from "../features/workSpaceList/workSpacesSlice";
import authReducer from "../features/auth/authSlice";
import projectReducer from "../features/projects/projectSlice";
import boardReducer from "../features/boards/boardSlice";
import userReducer from "../features/user/userSlice";

//! We should first import our actions from our slices here, then export them at the bottom
import { fetchBoards, fetchListBoards } from "../features/boards/boardSlice";
import { fetchProjects, resetProject } from "../features/projects/projectSlice";
import {
  resetWorkspaces,
  resetWorkspace,
  fetchAllWorkSpaces,
  fetchWorkSpaceById,
  createWorkSpace,
  deleteWorkSpace,
  updateWorkSpace,
  addWorkSpaceMember,
  removeWorkSpaceMember,
} from "../features/workSpaceList/workSpacesSlice";
import { updateUserById, resetUser } from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    workSpaces: workSpacesReducer,
    auth: authReducer,
    projects: projectReducer,
    boards: boardReducer,
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
export { fetchBoards, fetchListBoards };
export { fetchProjects, resetProject };
export {
  resetWorkspaces,
  resetWorkspace,
  fetchAllWorkSpaces,
  fetchWorkSpaceById,
  createWorkSpace,
  deleteWorkSpace,
  updateWorkSpace,
  addWorkSpaceMember,
  removeWorkSpaceMember,
};
export { updateUserById, resetUser };
