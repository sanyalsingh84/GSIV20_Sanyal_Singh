import { createSlice } from "@reduxjs/toolkit";

const movieDetailsSlice = createSlice({
  name: "details",
  initialState: {
    runtime: "",
    casts: "",
    director: "",
    year: "",
    pending: false,
    isError: false,
    error: "",
    movieById: {},
  },
  reducers: {
    getDetailsStart: (state) => {
      state.pending = true;
      state.isError = false;
    },
    getDetailsSuccess: (state, action) => {
      state.pending = false;
      state.runtime = action.payload.runtime;
      state.casts = action.payload.cast;
      state.director = action.payload.director;
      state.year = action.payload.year;
      state.movieById = action.payload.movieD;
    },

    getDetailsError: (state, action) => {
      state.isError = true;
      state.pending = false;
    },
  },
});

export const {
  getDetailsStart,
  getDetailsSuccess,
  getDetailsError,
  // getByIdSuccess,
} = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;
