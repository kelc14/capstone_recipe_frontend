import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./AddToCalendar.css";
import WhiskApi from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddToCalendar = ({ uri }) => {
  const INITIAL_STATE = { day: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);
  let navigate = useNavigate();

  const { userInfo } = useSelector((store) => store.auth);

  /** Send {username, day, uri } to API to add recipe to calendar
   *    & clear form / navigate to calendar. */
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // add day, username, uri to Calendar DB
      formData.username = userInfo.username;
      formData.uri = uri;

      WhiskApi.updateCalendar(formData);

      navigate("/calendar");

      setFormData(INITIAL_STATE);
    } catch (err) {
      //   documentErrors(err);
    }
  };
  /** Update local state w/curr state of input elem */
  const handleChange = (e) => {
    setFormData(() => ({ day: e.target.value }));
  };

  return (
    <div className="AddToCalendar" onSubmit={handleSubmit}>
      <form className="AddToCalendar-form">
        Add to Calendar <br />
        <select name="day" id="day" onChange={handleChange} defaultValue={""}>
          <option value="" disabled hidden>
            Choose a Day:
          </option>
          <option value="sunday" id="sunday" className="AddBook-input">
            Sunday
          </option>
          <option value="monday" id="monday" className="AddBook-input">
            Monday
          </option>
          <option value="tuesday" id="tuesday" className="AddBook-input">
            Tuesday
          </option>
          <option value="wednesday" id="wednesday" className="AddBook-input">
            Wednesday
          </option>
          <option value="thursday" id="thursday" className="AddBook-input">
            Thursday
          </option>
          <option value="friday" id="friday" className="AddBook-input">
            Friday
          </option>
          <option value="saturday" id="saturday" className="AddBook-input">
            Saturday
          </option>
        </select>
        <button>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </form>
    </div>
  );
};

export default AddToCalendar;
