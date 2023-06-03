import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../features/calendar/calendarSlice";

export type TypeStore = {
  calendar: {
    calendarState: { date: string; ref: any };
  };
};

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(),
});

export default store;
