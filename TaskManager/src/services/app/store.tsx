import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../features/calendar/calendarSlice";
import workSpacesReducer, {
  WorkSpacesProps,
} from "../features/workSpaceList/workSpacesSlice";
import authReducer from "../features/auth/authSlice";
import projectReducer, {
  ProjectsProps,
} from "../features/projects/projectSlice";
import boardReducer, { BoardsProps } from "../features/boards/boardSlice";

export type TypeStore = {
  calendar: {
    date: string;
    ref: any;
  };
  workSpaces: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: string | undefined;
    workSpaces: WorkSpacesProps[];
  };
  projects: {
    isLoading: boolean;
    isSuccess: boolean;
    projects: ProjectsProps[];
    isError: string | undefined;
    id: string;
  };
  boards: {
    isLoading: false;
    isSuccess: false;
    isError: "";
    boards: BoardsProps[];
  };
};

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
