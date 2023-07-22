import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./AddBook.css";
import WhiskApi from "../api/api";

const AddBook = ({ show, showModal, addBook }) => {
  const INITIAL_STATE = { title: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);
  let navigate = useNavigate();

  const { userInfo, userToken } = useSelector((store) => store.auth);

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

      //toggle off modal:
      showModal();
      // add book to local state
      addBook(newBook);
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
