import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { deleteBook } from "../features/authSlice";
import WhiskApi from "../api/api";

import "./Books.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

//components:
import Book from "./Book";
import NoBooks from "./NoBooks";
import AddBook from "./AddBook";

/** Books Component:
 *
 * Using userInfo -> displays user's collection of books (if they have any)
 *
 * If the user does not have any books, renders NoBooks
 *
 * Also renders
 * - AddBook (form to add new books) and controls handleDelete to delete books.
 * - Book (icon with book title, edit and delete buttons)
 *
 */
const Books = () => {
  const { userInfo } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  let books = userInfo ? userInfo.books : null;

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  // toggle showing modal (add book form)
  const showModal = () => {
    setShowAddForm(() => !showAddForm);
  };
  // toggle showing modal (edit book form)
  const showEditModal = () => {
    setShowEditForm(() => !showEditForm);
  };

  const handleEdit = (id) => {
    showEditModal();
  };

  // delete book
  const handleDelete = (id) => {
    WhiskApi.deleteBook(id);
    dispatch(deleteBook(id));
    // setBooks(() => books.filter((book) => book.id !== id));
  };

  // RETURNING =>

  if (!books) return <p>Loading...</p>;

  if (books.length === 0) {
    return (
      <div>
        <NoBooks showModal={showModal} />
        <AddBook showModal={showModal} show={showAddForm} />
      </div>
    );
  }

  return (
    <div>
      <div className="Books-header">
        <p className="Books-header-username">
          {" "}
          {userInfo.firstName}'s Recipe Books
        </p>

        <div>
          {" "}
          <button className="Books-add-new" onClick={showModal}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <AddBook showModal={showModal} show={showAddForm} />
        </div>
      </div>
      <div className="Books">
        {books.map((book) => (
          <Book
            book={book}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            showEditModal={showEditModal}
            showEditForm={showEditForm}
            key={book.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Books;
