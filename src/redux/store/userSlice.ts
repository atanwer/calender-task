import { User } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: User[] = [];

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<Number>) => {
      console.log("state", state);
      return state.filter((item) => item.id !== action.payload);
    },
    editUser: (
      state,
      action: PayloadAction<{ userId: number | null; userData: User }>
    ) => {
      return state.map((item) =>
        item.id === action.payload.userId ? action.payload.userData : item
      );
    },
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
