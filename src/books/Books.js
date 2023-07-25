import React, { useEffect, useState } from "react";

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

  const [books, setBooks] = useState([]);
  useEffect(() => {
    if (userInfo && userInfo.username) {
      setBooks(() => [...userInfo.books]);
    }
  }, [userInfo]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  // toggle showing modal (add book form)
  const showModal = () => {
    setShowAddForm(() => !showAddForm);
  };
  // toggle showing modal (add book form)
  const showEditModal = () => {
    setShowEditForm(() => !showEditForm);
  };

  // add new book after filling out form:
  const addBookLocal = (newBook) => {
    setBooks(() => [...books, newBook]);
  };

  //update book after editing form:
  const updateBook = (newBook) => {
    let oldbooks = books.filter((book) => book.id !== newBook.id);
    setBooks(() => [...oldbooks, newBook]);
  };

  const handleEdit = (id) => {
    showEditModal();
  };
  // delete book
  const handleDelete = (id) => {
    WhiskApi.deleteBook(id);
    dispatch(deleteBook(id));
    setBooks(() => books.filter((book) => book.id !== id));
  };

  // RETURNING =>

  if (!books) return <p>Loading...</p>;

  if (books.length === 0) {
    return (
      <div>
        <NoBooks showModal={showModal} />
        <AddBook
          showModal={showModal}
          show={showAddForm}
          addBookLocal={addBookLocal}
        />
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
          <AddBook
            showModal={showModal}
            show={showAddForm}
            addBookLocal={addBookLocal}
          />
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
            updateBook={updateBook}
            key={book.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Books;
