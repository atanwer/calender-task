import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DataState = {
  data: Array<any>;
  events: { [key: string]: Array<{ type: string; content: string }> };
};

const initialState: DataState = {
  data: [],
  events: {},
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },
    addEvent: (state, action: PayloadAction<{ date: string; event: any }>) => {
      const { date, event } = action.payload;
      if (!state.events[date]) {
        state.events[date] = [];
      }
      state.events[date].push(event);
    },
  },
});

export const { setData, addEvent } = dataSlice.actions;

export default dataSlice.reducer;
