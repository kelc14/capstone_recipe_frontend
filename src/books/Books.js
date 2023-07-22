import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Books.css";
import NoBooks from "./NoBooks";
import AddBook from "./AddBook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Books = () => {
  const { userInfo, userToken } = useSelector((store) => store.auth);
  const [books, setBooks] = useState(!userInfo ? [] : userInfo.books);

  const [showAddForm, setShowAddForm] = useState(false);
  // toggle showing modal (add book form)
  const showModal = () => {
    setShowAddForm(() => !showAddForm);
  };

  // add new book after filling out form:
  const addBook = (newBook) => {
    // delete newBook.username;
    setBooks(() => [...books, newBook]);
  };

  // RETURNING =>

  if (!books) return <p>Loading...</p>;

  if (books.length === 0) {
    return (
      <NoBooks showModal={showModal} show={showAddForm} addBook={addBook} />
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
          </div>
        ))}
      </div>{" "}
    </div>
  );
};

export default Books;
