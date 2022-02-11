import { useState, useEffect } from "react";
import "../Header/header.css";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import useDebounse from "./../../hooks/useDebounse";
import { getSearhedMovie } from "../../redux/apicalls/apicalls";
import { setIsSearch } from "../../redux/slices/movieSlice";

const SearchBar = () => {
  const [serachInp, setSerachInp] = useState("");

  const dispatch = useDispatch();
  const debouncedSearch = useDebounse(serachInp, 800);

  useEffect(() => {
    if (debouncedSearch !== "") {
      getSearhedMovie(dispatch, debouncedSearch);
    }
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    if (debouncedSearch !== "") {
      dispatch(setIsSearch(true));
    } else {
      dispatch(setIsSearch(false));
    }
  }, [dispatch, debouncedSearch]);

  const handleSearch = (e) => {
    let tempStr = e.target.value.trim();
    setSerachInp(tempStr);
  };

  return (
    <div className="search_wrapper">
      <label htmlFor="search">
        {<IoSearchSharp className="icon icon-search" />}
      </label>
      <input
        onChange={(e) => handleSearch(e)}
        type="search"
        name="search"
        id="search"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchBar;
