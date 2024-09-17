import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
}

type DataState = {
  users: Array<User>;
  events: { [key: string]: Array<{ type: string; content: string }> };
};

const initialState: DataState = {
  users: [],
  events: {},
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any[]>) => {
      state.users = action.payload;
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
