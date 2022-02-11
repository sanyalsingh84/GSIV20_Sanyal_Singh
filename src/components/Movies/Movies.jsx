import MovieCard from "./../MovieCard/MovieCard";
import "./movies.css";
import { useSelector, useDispatch } from "react-redux";
import { getMovies, getMoviesAndPush } from "../../redux/apicalls/apicalls";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Movies = () => {
  // const [fMovies, setFMovies] = useState([]);
  // const [getMore, setGetMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  // const prevCountPageN = useRef();
  const dispatch = useDispatch();
  const {
    upcomingMovies: movies,
    totalMovies,
    cPage,
    isSearch,
    searchedMovies,
    pending,
  } = useSelector((state) => state.movies);

  useEffect(() => {
    if (movies.length === 0) {
      getMovies(dispatch);
    }
  }, [dispatch, movies.length]);

  const getMoreMovies = () => {
    getMoviesAndPush(dispatch, cPage);
  };

  useEffect(() => {
    setHasMore(totalMovies > movies.length ? true : false);
  }, [movies, totalMovies]);

  // let ListTemplate;
  // if (isSearch) {
  //   ListTemplate = searchedMovies.map((item) => (
  //     <MovieCard item={item} key={item.id} />
  //   ));
  // } else {
  //   ListTemplate = movies.map((item) => (
  //     <MovieCard item={item} key={item.id} />
  //   ));
  // }

  if (!isSearch) {
    return (
      <InfiniteScroll
        dataLength={movies.length}
        next={getMoreMovies}
        hasMore={hasMore}
        loader={<h4>Loading.....</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You hane seen it all</b>
          </p>
        }>
        <main>
          {movies.map((item) => (
            <MovieCard item={item} key={item.id} />
          ))}
        </main>
      </InfiniteScroll>
    );
  } else {
    if (pending) {
      return <h4>Loading....</h4>;
    } else if (!pending && searchedMovies.length === 0) {
      return <h4>not found</h4>;
    } else {
      return (
        <main>
          {searchedMovies.map((item) => (
            <MovieCard item={item} key={item.id} />
          ))}
        </main>
      );
    }
  }
};

export default Movies;
