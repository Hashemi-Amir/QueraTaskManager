import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../features/calendar/calendarSlice";
import workSpaceReducer from "../features/workSpaceList/workSpaceSlice";

export type TypeStore = {
  calendar: {
    calendarState: { date: string; ref: any };
  };
  workSpace: {
    isLoading: boolean;
    workSpace: object;
    isError: string | undefined;
  };
};

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    workSpace: workSpaceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
});

export default store;
