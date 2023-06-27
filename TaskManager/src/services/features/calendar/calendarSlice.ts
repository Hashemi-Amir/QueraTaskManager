import { createSlice } from "@reduxjs/toolkit";

type CalendarProps = {
  date: string;
  ref: object;
};

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
    resetCalendar: () => {
      return initialState;
    },
  },
});
export const { setDate, setRef } = calendarSlice.actions;
export default calendarSlice.reducer;
