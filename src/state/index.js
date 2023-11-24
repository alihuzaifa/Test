import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: [],
};
export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    filterUser: (state, { payload }) => {
      state.user = state.user.filter((item) => {
        return item.id !== payload;
      });
    },
    addUser: (state, { payload }) => {
      state.user.push(payload);
    },
    replaceUserAtIndex: (state, action) => {
      const { index, obj } = action.payload;
      state.user[index] = obj;
    },
  },
});
export const { filterUser, addUser, replaceUserAtIndex } = authSlice.actions;
export default authSlice.reducer;
