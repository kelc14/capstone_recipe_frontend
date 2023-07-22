import React, { useState } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  /** SearchForm component
   * - filters based off of an input
   *
   * Rendered in Jobs component & Companies component
   *
   */

  const INITIAL_STATE = { search: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);

  /** Send {USERNAME, PASSWORD} to API to check if logged in and provide feedback
   *    & clear form. */

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(formData);

    //   if (formData.search !== "") {
    //     search(formData);
    //   }
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
