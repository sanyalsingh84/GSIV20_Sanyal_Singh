import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetails } from "../../redux/apicalls/apicalls";
import Header from "./../Header/Header";
import "./details.css";

const imgurl = "https://image.tmdb.org/t/p/original";

const Details = () => {
  const dispatch = useDispatch();
  let { id: movieId } = useParams();
  const { runtime, casts, director, movieById, year } = useSelector(
    (state) => state.details
  );

  useEffect(() => {
    getMovieDetails(dispatch, movieId);
    // getMovieById(dispatch, movieId);
  }, [movieId, dispatch]);

  return (
    <>
      <Header isSearch={false} />
      <div className="details-sec">
        <div className="detail-img">
          <img
            src={`${imgurl}${movieById.poster_path}`}
            alt={movieById.title}
          />
        </div>
        <div className="detail-body">
          <div className="title-detail">
            <span>{movieById.title}</span> ({movieById.vote_average})
          </div>
          <div className="detail-meta">
            {`${year} | ${runtime} | ${director}`}
          </div>
          <div className="detail-cast">{`Cast:  ${casts}...`}</div>
          <div className="detail-desc">Description: {movieById.overview}</div>
        </div>
      </div>
    </>
  );
};

export default Details;
