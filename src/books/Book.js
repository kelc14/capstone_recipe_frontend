import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faX } from "@fortawesome/free-solid-svg-icons";
import EditBook from "./EditBook";
import "./Book.css";
import { NavLink } from "react-router-dom";

const IMAGES = [
  "/images/book_icons/cook1.png",
  "/images/book_icons/cook2.png",
  "/images/book_icons/cook3.png",
  "/images/book_icons/cook4.png",
];

const Book = ({
  book,
  handleEdit,
  handleDelete,
  showEditModal,
  showEditForm,
  updateBook,
}) => {
  return (
    <div className="Books-book" key={book.id}>
      <div className="Books-book-header">
        <div>
          <h1 className="Books-book-title">{book.title.toUpperCase()}</h1>
        </div>
        <div onClick={() => handleEdit(book.id)}>
          <div className="Books-book-icon-container">
            <FontAwesomeIcon icon={faEdit} className="Books-book-icon" />{" "}
          </div>
          <div
            className="Books-book-icon-container"
            onClick={() => handleDelete(book.id)}
          >
            <FontAwesomeIcon className="Books-book-icon" icon={faX} />
          </div>
        </div>
      </div>
      <img
        src={IMAGES[Math.floor(Math.random() * 4)]}
        className="Books-book-logo"
        alt="cooking logo"
      />
      <div>
        <NavLink to={`/books/${book.id}`} className="Books-view-recipes-btn">
          View Recipes
        </NavLink>
      </div>
      <EditBook
        showModal={showEditModal}
        show={showEditForm}
        updateBook={updateBook}
        id={book.id}
      />
    </div>
  );
};

export default Book;
