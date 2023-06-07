import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../features/calendar/calendarSlice";
import workSpaceReducer from "../features/workSpaceList/workSpaceSlice";
import authReducer from "../features/auth/authSlice";

export type TypeStore = {
  calendar: {
    calendarState: { date: string; ref: any };
  };
  workSpace: {
    isLoading: boolean;
    workSpaces: {
      _id: string;
      name: string;
      user: string;
      members: [];
      projects: [];
    }[];
    isError: string | undefined;
  };
};

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    workSpace: workSpaceReducer,
    auth: authReducer,
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
