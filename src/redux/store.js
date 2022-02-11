import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slices/movieSlice";
import movieDetailReducer from "./slices/movieDetailSlice";

export default configureStore({
  reducer: {
    movies: movieReducer,
    details: movieDetailReducer,
  },
});
