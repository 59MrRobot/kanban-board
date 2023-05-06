import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: "history",
  initialState: {
    history: {},
    currentIssue: null,
  },
  reducers: {
    updateHistory: (state, action) => {
      state.history = action.payload;
    },
    updateCurrentIssue: (state, action) => {
      state.currentIssue = action.payload;
    },
    resetHistory: (state) => {
      state.history = {};
      state.currentIssue = null;
    }
  }
});

export const {
  updateHistory,
  updateCurrentIssue,
  resetHistory,
} = historySlice.actions;
export default historySlice.reducer;