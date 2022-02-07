import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import "./header.css";

const Header = () => {
  return (
    <header>
      <div className="search_wrapper">
        <label htmlFor="search">
          {<IoSearchSharp className="icon icon-search" />}
        </label>
        <input type="search" name="search" id="search" placeholder="Search" />
      </div>
      <MdHome className="icon icon-home" />
    </header>
  );
};

export default Header;
