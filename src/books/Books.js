import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook } from "../features/authSlice";

import "./Books.css";

import NoBooks from "./NoBooks";
import AddBook from "./AddBook";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import WhiskApi from "../api/api";
import Book from "./Book";

/** Books Component:
 *
 * Using userInfo -> displays user's collection of books (if they have any)
 *
 * If the user does not have any books, renders NoBooks
 *
 * Also renders AddBook (form to add new books) and controls handleDelete to delete books.
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
    console.log(id);
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
          //   <div className="Books-book" key={book.id}>
          //     <div className="Books-book-header">
          //       <div>
          //         <h1 className="Books-book-title">{book.title.toUpperCase()}</h1>
          //       </div>
          //       <div onClick={() => handleEdit(book.id)}>
          //         <div className="Books-book-icon-container">
          //           <FontAwesomeIcon icon={faEdit} className="Books-book-icon" />{" "}
          //         </div>
          //         <div
          //           className="Books-book-icon-container"
          //           onClick={() => handleDelete(book.id)}
          //         >
          //           <FontAwesomeIcon className="Books-book-icon" icon={faX} />
          //         </div>
          //       </div>
          //       <EditBook
          //         showModal={showEditModal}
          //         show={showEditForm}
          //         updateBook={updateBook}
          //         id={book.id}
          //       />
          //     </div>
          //     <img
          //       src={IMAGES[Math.floor(Math.random() * 4)]}
          //       className="Books-book-logo"
          //     />
          //     <div>
          //       <button className="Books-view-recipes-btn">View Recipes</button>
          //     </div>
          //   </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
