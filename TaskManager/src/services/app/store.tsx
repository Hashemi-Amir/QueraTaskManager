import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../features/calendar/calendarSlice";
import workSpacesReducer from "../features/workSpaceList/workSpacesSlice";
import authReducer from "../features/auth/authSlice";
import projectReducer from "../features/projects/projectSlice";

export type TypeStore = {
  calendar: {
    calendarState: { date: string; ref: any };
  };
  workSpaces: {
    isLoading: boolean;
    isSuccess: boolean;
    workSpaces: {
      _id: string;
      name: string;
      user: string;
      members: [];
      projects: [];
    }[];
    isError: string | undefined;
  };
  projects: {
    isLoading: boolean;
    isSuccess: boolean;
    projects: {
      _id: string;
      name: string;
      workspace: string;
      members: [];
      boards: [];
    }[];
    isError: string | undefined;
    id: string
  };
};

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    workSpaces: workSpacesReducer,
    auth: authReducer,
    projects: projectReducer
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
