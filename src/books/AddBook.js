import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { addBook } from "../features/authSlice";
import WhiskApi from "../api/api";

import "./AddBook.css";

/**
 *  AddBook Component: 
 * 
 *    - displays the form to add a new book for the user
 *    -this displays as a modal - props passed to control this
 
 *        State: useForm
 *
 */
const AddBook = ({ show, showModal, addBookLocal }) => {
  const INITIAL_STATE = { title: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const { userInfo } = useSelector((store) => store.auth);

  // toggle modal off
  const onClose = () => {
    showModal();
  };

  /** Send {title} to API to add new book
   *    & clear form. */
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      formData.username = userInfo.username;
      const newBook = await WhiskApi.addNewBook(formData);
      dispatch(addBook(formData));

      //toggle off modal:
      showModal();
      // add book to local state
      addBookLocal(newBook);
      navigate("/books");
      setFormData(INITIAL_STATE);
    } catch (err) {
      //   documentErrors(err);
    }
  };
  /** Update local state w/curr state of input elem */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  // if displaying, render component:
  if (show) {
    return (
      <div className="AddBook" onSubmit={handleSubmit}>
        <div className="AddBook-content">
          <h1 className="AddBook-header">ADD A NEW BOOK</h1>
          <form className="AddBook-form">
            <label htmlFor="title" className="AddBook-label">
              Choose a title for your new book{" "}
            </label>
            <input
              id="title"
              type="text"
              name="title"
              onChange={handleChange}
              value={formData.title}
              placeholder="enter book title"
              className="AddBook-input"
              required
            />
            <p className="AddBook-label">and get ready to start cooking!</p>
            <div>
              <button className="AddBook-add" type="submit">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>{" "}
            </div>
          </form>
          <button onClick={onClose} className="AddBook-cancel AddBook-btn">
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
      </div>
    );
  }
};

export default AddBook;
