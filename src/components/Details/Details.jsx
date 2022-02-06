import React from "react";
import { useParams, Link } from "react-router-dom";

const Details = () => {
  let { id: movieId } = useParams();

  return (
    <div style={{ backgroundColor: "black", color: "white" }}>
      <Link to="/">Home</Link>
      <div>Details of {movieId}</div>
    </div>
  );
};

export default Details;
