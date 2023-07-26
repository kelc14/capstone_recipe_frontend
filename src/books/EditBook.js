import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../features/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./EditBook.css";
import WhiskApi from "../api/api";

/**
 *  EditBook Component: 
 * 
 *    - displays the form to edit book name
 *    -this displays as a modal - props passed to control this: {show, showModal, updateBook, id}
 
 *        State: useForm
 *
 */
const EditBook = ({ show, showModal, id }) => {
  const INITIAL_STATE = { title: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  // toggle modal off
  const onClose = () => {
    setFormData(INITIAL_STATE);
    showModal();
  };

  /** Send {title} to API to add new book
   *    & clear form. */
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      WhiskApi.token = localStorage.userToken;
      const newBook = await WhiskApi.updateBook(id, formData);

      dispatch(
        authenticateUser({
          username: newBook.username,
          token: localStorage.userToken,
        })
      );

      //toggle off modal:
      setFormData(INITIAL_STATE);
      showModal();

      navigate("/books");
    } catch (err) {
      //   documentErrors(err);
    }
  };
  /** Update local state w/curr state of input elem */
  const handleChange = (evt) => {
    setFormData(() => ({
      title: evt.target.value,
    }));
  };

  if (show) {
    return (
      <div className="EditBook">
        <div className="EditBook-content">
          <h1 className="EditBook-header">UPDATE BOOK</h1>
          <form className="EditBook-form" onSubmit={handleSubmit}>
            <label htmlFor="title" className="EditBook-label">
              Choose a new title for your book
            </label>
            <input
              id="title"
              type="text"
              name="title"
              onChange={handleChange}
              value={formData.title}
              placeholder="enter new title"
              className="EditBook-input"
              required
            />
            <p className="EditBook-label">and get back to cooking!</p>
            <div>
              <button className="EditBook-add" type="submit">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>{" "}
            </div>
          </form>
          <button onClick={onClose} className="EditBook-cancel EditBook-btn">
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
      </div>
    );
  }
};

export default EditBook;
