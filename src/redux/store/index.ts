import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import eventSlice from "./eventSlice";
export const store = configureStore({
  reducer: {
    users: userReducer,
    events: eventSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
