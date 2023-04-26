import { createSlice } from '@reduxjs/toolkit';

const issueSlice = createSlice({
  name: "user",
  initialState: {
    issues: [],
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
      state.issues = action.payload;
      state.error = false;
    },
    getIssuesFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  }
});

export const {
  startProcess,
  getIssuesSuccess,
  getIssuesFailure,
} = issueSlice.actions;
export default issueSlice.reducer;