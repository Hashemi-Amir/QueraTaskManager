import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../features/calendar/calendarSlice";
import authReducer from "../features/auth/authSlice";
import getUserSlice from "../features/getUser/getUserSlice";

//! We should first import our actions from our slices here, then export them at the bottom
import { getUser, reset } from "../features/getUser/getUserSlice";

export type TypeStore = {
  calendar: {
    calendarState: { date: string; ref: any };
  };
};

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    auth: authReducer,
    // !! this redcuder is for experiment I will remove it myslef
    user: getUserSlice,
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
export { getUser, reset };
