import React from "react";
import { tempData } from "./../../utils";
import "./movieCard.css";

let imgurl = "https://image.tmdb.org/t/p/original";

const MovieCard = () => {
  const truncate = (str) => {
    return str.length > 80 ? str.substring(0, 70) + "..." : str;
  };

  return (
    <>
      {tempData.map((item) => (
        <div className="movie-card" key={item.id}>
          <div className="card-head">
            <img src={`${imgurl}${item.poster_path}`} alt={item.title} />
          </div>
          <div className="card-body">
            <div className="card-body-head">
              <div className="card-body-title">{item.title}</div>
              <div className="card-body-rating">{`(${item.vote_average})`}</div>
            </div>
            <div className="card-body-disc">{truncate(item.overview)}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieCard;
