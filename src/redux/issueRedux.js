import { createSlice } from '@reduxjs/toolkit';

const issueSlice = createSlice({
  name: "issue",
  initialState: {
    issue: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    startProcess: (state) => {
      state.isFetching = true;
    },
    //GET ALL
    getIssuesSuccess: (state, action) => {
      state.isFetching = false;
      state.issue = action.payload;
      state.error = false;
    },
    getIssuesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    resetIssue: (state) => {
      state.issue = null;
      state.isFetching = false;
      state.error = false;
    },
  }
});

export const {
  startProcess,
  getIssuesSuccess,
  getIssuesFailure,
  resetIssue,
} = issueSlice.actions;
export default issueSlice.reducer;