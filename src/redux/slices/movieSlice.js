import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    upcomingMovies: [],
    searchedMovies: [],
    cPage: 2,
    totalMovies: 0,
    pending: false,
    isError: false,
    isSearch: false,
    error: "",
  },
  reducers: {
    getMoviesStart: (state) => {
      state.pending = true;
    },
    getMoviesSuccess: (state, action) => {
      state.pending = false;
      state.upcomingMovies = [...action.payload.results];
      state.totalMovies = action.payload.total_results;
    },

    getMoviesSuccessPush: (state, action) => {
      state.pending = false;
      state.upcomingMovies.push(...action.payload.results);
      state.cPage = state.cPage + 1;
      state.totalMovies = action.payload.total_results;
    },

    getSearchedSuccess: (state, action) => {
      state.pending = false;
      state.searchedMovies = action.payload;
    },

    getMoviesError: (state, action) => {
      state.isError = true;
      state.pending = false;
    },

    setIsSearch: (state, action) => {
      state.isSearch = action.payload;
    },
  },
});

export const {
  getMoviesStart,
  getMoviesSuccess,
  getMoviesSuccessPush,
  getSearchedSuccess,
  getMoviesError,
  setIsSearch,
} = movieSlice.actions;
export default movieSlice.reducer;
