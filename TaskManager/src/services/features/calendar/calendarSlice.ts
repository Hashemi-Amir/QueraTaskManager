import { createSlice } from "@reduxjs/toolkit";
import { TypeStore } from "../../app/store";

interface CalendarState {
  calendarState: { date: string; ref: any };
}

const initialState: CalendarState = {
  calendarState: { date: "", ref: {} },
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.calendarState.date = action.payload;
    },
    setRef: (state, action) => {
      state.calendarState.ref = action.payload;
    },
  },
});
export const { setDate,setRef } = calendarSlice.actions;
export default calendarSlice.reducer;
export const selectCalendar = (store: TypeStore) =>
  store.calendar.calendarState;