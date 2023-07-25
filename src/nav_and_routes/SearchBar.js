import React, { useState } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { getRecipesByQuery } from "../features/recipesSlice";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  /** SearchForm component
   * - filters based off of an input
   *
   * Rendered in navbar
   *
   */

  const INITIAL_STATE = { search: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /** Send {USERNAME, PASSWORD} to API to check if logged in and provide feedback
   *    & clear form. */

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(getRecipesByQuery(formData));

    navigate("/");
    setFormData(INITIAL_STATE);
  };

  /** Update local state w/curr state of input elem */

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  return (
    <div className="SearchBar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="search"
          name="search"
          id="search"
          onChange={handleChange}
          value={formData.search}
          className="SearchBar-input"
        />
        <button className="SearchBar-icon">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
