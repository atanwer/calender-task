import { DataState, Event, User } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: DataState = {
  users: [],
  events: {},
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<Number>) => {
      state.users = state.users.filter((item) => item.id !== action.payload);
    },
    editUser: (
      state,
      action: PayloadAction<{ userId: number | null; userData: User }>
    ) => {
      state.users = state.users.map((item) =>
        item.id === action.payload.userId ? action.payload.userData : item
      );
    },
    addEvent: (
      state,
      action: PayloadAction<{ date: string; event: Event }>
    ) => {
      const { date, event } = action.payload;
      if (!state.events[date]) {
        state.events[date] = [];
      }
      state.events[date].push(event);
    },
  },
});

export const { addUser, editUser, deleteUser, addEvent } = dataSlice.actions;

export default dataSlice.reducer;
