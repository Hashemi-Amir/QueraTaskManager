import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../features/calendar/calendarSlice";
import workSpacesReducer from "../features/workSpaceList/workSpacesSlice";
import authReducer from "../features/auth/authSlice";
import projectReducer from "../features/projects/projectSlice";
import boardReducer from "../features/boards/boardSlice";

//! We should first import our actions from our slices here, then export them at the bottom
import { fetchBoards, setSelectedId,changeTaskPosition } from "../features/boards/boardSlice";
import {
  fetchProjects,
  setSelectedProject,
  resetProject,
} from "../features/projects/projectSlice";
import { setDate, setRef } from "../features/calendar/calendarSlice";
import {
  setSelectedWorkSpaceHeader,
  setSelectedWorkSpaceId,
  setSelectedSpace,
  resetWorkspaces,
  fetchAllWorkSpaces,
  createWorkSpace,
  deleteWorkSpace,
  updateWorkSpace,
  addWorkSpaceMember,
  removeWorkSpaceMember,
} from "../features/workSpaceList/workSpacesSlice";

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    workSpaces: workSpacesReducer,
    auth: authReducer,
    projects: projectReducer,
    boards: boardReducer,
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
export { fetchBoards, setSelectedId,changeTaskPosition };
export { fetchProjects, setSelectedProject, resetProject };
export { setDate, setRef };
export {
  setSelectedWorkSpaceHeader,
  setSelectedWorkSpaceId,
  setSelectedSpace,
  resetWorkspaces,
  fetchAllWorkSpaces,
  createWorkSpace,
  deleteWorkSpace,
  updateWorkSpace,
  addWorkSpaceMember,
  removeWorkSpaceMember,
};
