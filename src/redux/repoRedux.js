import { createSlice } from '@reduxjs/toolkit';

const repoSlice = createSlice({
  name: "repo",
  initialState: {
    repo: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    startRepoProcess: (state) => {
      state.isFetching = true;
    },
    //GET ALL
    getRepoSuccess: (state, action) => {
      state.isFetching = false;
      state.repo = action.payload;
      state.error = false;
    },
    getRepoFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  }
});

export const {
  startRepoProcess,
  getRepoSuccess,
  getRepoFailure,
} = repoSlice.actions;
export default repoSlice.reducer;