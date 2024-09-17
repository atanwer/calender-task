import { CalendarEvent, Event } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CalendarEvent = {};

const dataSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent: (
      state,
      action: PayloadAction<{ date: string; event: Event }>
    ) => {
      const { date, event } = action.payload;
      if (!state[date]) {
        state[date] = [];
      }
      state[date].push(event);
    },
  },
});

export const { addEvent } = dataSlice.actions;

export default dataSlice.reducer;
