import React from "react";
import "./home.css";
import Header from "../Header/Header";
import Movies from "../Movies/Movies";

const Home = () => {
  return (
    <div className="container">
      <Header />
      <Movies />
    </div>
  );
};

export default Home;
