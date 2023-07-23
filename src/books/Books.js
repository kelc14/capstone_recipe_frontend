import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook } from "../features/authSlice";

import "./Books.css";

import NoBooks from "./NoBooks";
import AddBook from "./AddBook";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import WhiskApi from "../api/api";

const Books = () => {
  const { userInfo } = useSelector((store) => store.auth);
  const [books, setBooks] = useState(!userInfo ? [] : userInfo.books);

  const dispatch = useDispatch();

  const [showAddForm, setShowAddForm] = useState(false);

  // toggle showing modal (add book form)
  const showModal = () => {
    setShowAddForm(() => !showAddForm);
  };

  // add new book after filling out form:
  const addBook = (newBook) => {
    setBooks(() => [...books, newBook]);
  };

  // delete book
  const handleDelete = (id) => {
    WhiskApi.deleteBook(id);
    dispatch(deleteBook(id));
    setBooks(() => userInfo.books);
  };

  // RETURNING =>

  if (!books) return <p>Loading...</p>;

  if (books.length === 0) {
    return (
      <div>
        <NoBooks showModal={showModal} />
        <AddBook showModal={showModal} show={showAddForm} addBook={addBook} />
      </div>
    );
  }

  return (
    <div>
      <div className="Books-header">
        <p className="Books-header-username"> {userInfo.firstName}'s Books</p>

        <div>
          {" "}
          <button className="Books-add-new" onClick={showModal}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <AddBook showModal={showModal} show={showAddForm} addBook={addBook} />
        </div>
      </div>
      <div className="Books">
        {books.map((book) => (
          <div className="Books-book" key={book.id}>
            <div className="Books-book-thumbnail-container">
              {/* {book.thumbnails.map((source) => (
              <img className="Books-book-thumbnail" src={source} />
            ))} */}
            </div>
            <p>{book.title}</p>
            <button onClick={() => handleDelete(book.id)}>DELETE</button>
          </div>
        ))}
      </div>{" "}
    </div>
  );
};

export default Books;
