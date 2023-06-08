import { createSlice } from "@reduxjs/toolkit";
import { TypeStore } from "../../app/store";

 type CalendarProps = {
  date: string;
  ref: any;
}

const initialState: CalendarProps = {
  date: "",
  ref: {},
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setRef: (state, action) => {
      state.ref = action.payload;
    },
  },
});
export const { setDate, setRef } = calendarSlice.actions;
export default calendarSlice.reducer;
export const selectCalendar = (store: TypeStore) => store.calendar;
