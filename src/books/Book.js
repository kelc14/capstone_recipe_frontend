import React from "react";
import "./Book.css";

import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faX } from "@fortawesome/free-solid-svg-icons";

// components:
import EditBook from "./EditBook";

// images to rotate for the book covers
const IMAGES = [
  "/images/book_icons/cook1.png",
  "/images/book_icons/cook2.png",
  "/images/book_icons/cook3.png",
  "/images/book_icons/cook4.png",
];

/** Book Component =>
 *
 *        Renders orange book icon on Books page.
 *
 *        Accepts prop: {book}  => includes title and id for the book
 *        Accepts props for EditBook => {handleEdit, handleDelete, showEditModal, showEditForm, updateBook}
 *
 *        Renders EditBook
 *
 */

const Book = ({
  book,
  handleEdit,
  handleDelete,
  showEditModal,
  showEditForm,
}) => {
  return (
    <div className="Books-book" key={book.id}>
      <div className="Books-book-header">
        <div>
          <h1 className="Books-book-title">{book.title.toUpperCase()}</h1>
        </div>
        <div>
          <div className="Books-book-icon-container">
            <FontAwesomeIcon
              icon={faEdit}
              className="Books-book-icon"
              onClick={() => handleEdit(book.id)}
            />{" "}
          </div>
          <div className="Books-book-icon-container">
            <FontAwesomeIcon
              className="Books-book-icon"
              icon={faX}
              onClick={() => handleDelete(book.id)}
            />
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
      <EditBook showModal={showEditModal} show={showEditForm} id={book.id} />
    </div>
  );
};

export default Book;
