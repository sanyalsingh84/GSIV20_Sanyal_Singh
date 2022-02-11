import React from "react";
import { MdHome } from "react-icons/md";
import "./header.css";
import SearchBar from "./../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";

const Header = ({ isSearch }) => {
  const navigate = useNavigate();
  return (
    <header className={isSearch ? "head-list" : ""}>
      {isSearch ? (
        <SearchBar />
      ) : (
        <div className="detail-title">Movie Details</div>
      )}

      <MdHome
        onClick={() => {
          navigate(-1);
        }}
        className="icon icon-home"
      />
    </header>
  );
};

Header.defaultProps = {
  isSearch: true,
};

export default Header;
