import {
  getMoviesStart,
  getMoviesSuccess,
  getMoviesSuccessPush,
  getSearchedSuccess,
  getMoviesError,
} from "../slices/movieSlice";

import {
  getDetailsStart,
  getDetailsSuccess,
  getDetailsError,
} from "../slices/movieDetailSlice";

import axios from "axios";

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart);
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US&page=1`
    );
    if (res.status === 200) {
      let { results, total_results } = res.data;
      sortByClosest(results);
      dispatch(getMoviesSuccess({ results, total_results }));
    }
  } catch (error) {
    if (error) {
      if (error) {
        dispatch(getMoviesError);
      }
    }
  }
};

export const getMoviesAndPush = async (dispatch, page) => {
  dispatch(getMoviesStart);
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US&page=${page}`
    );
    if (res.status === 200) {
      let { results, total_results } = res.data;
      sortByClosest(results);
      dispatch(getMoviesSuccessPush({ results, total_results }));
    }
  } catch (error) {
    if (error) {
      if (error) {
        dispatch(getMoviesError);
      }
    }
  }
};

export const getMovieDetails = async (dispatch, id) => {
  dispatch(getDetailsStart);
  const allPromises = Promise.all([
    axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US`
    ),
    axios.get(
      `https://api.themoviedb.org/3/movie/%20${id}/credits?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US`
    ),
    axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US`
    ),
  ]);

  try {
    const [runtimeArr, ccArr, dArr] = await allPromises;
    if (
      runtimeArr.status === 200 &&
      ccArr.status === 200 &&
      dArr.status === 200
    ) {
      let director = getDirector(ccArr.data.crew);
      let cast = ccArr.data.cast.map((item) => item.name).join(", ");

      let runtime = timeConvert(runtimeArr.data.runtime);
      let { data: movieD } = dArr;
      let year = movieD.release_date.split("-")[0];
      dispatch(getDetailsSuccess({ director, cast, runtime, movieD, year }));
    }
  } catch (error) {
    if (error) dispatch(getDetailsError);
  }
};

export const getSearhedMovie = async (dispatch, input) => {
  dispatch(getMoviesStart);
  try {
    let res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US&query=${input}&page=1&include_adult=false`
    );

    if (res.status === 200) {
      dispatch(getSearchedSuccess(res.data.results));
    }
  } catch (error) {
    if (error) {
      dispatch(getMoviesError);
    }
  }
};

// utitlity functins
function getDirector(crew) {
  let result = crew.filter((item) => item.job === "Director");
  return result[0].name;
}

function timeConvert(n) {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return `${rhours}h ${rminutes}m`;
}

function sortByClosest(arr) {
  let now = new Date();
  now = now.getTime(); // now in ms
  arr.sort(function (a, b) {
    var aToDate = new Date(a.release_date).getTime();
    var bToDate = new Date(b.release_date).getTime();
    return Math.abs(aToDate - now) - Math.abs(bToDate - now);
  });
}
