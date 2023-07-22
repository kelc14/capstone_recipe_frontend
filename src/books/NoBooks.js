import React from "react";
import AddBook from "./AddBook";
import "./NoBooks.css";

const NoBooks = ({ showModal, showAddForm }) => {
  //   const [showAddForm, setShowAddForm] = useState(false);
  //   const showBook = () => {
  //     setShowAddForm(() => !showAddForm);
  //   };
  return (
    <div className="NoBooks">
      <h3 className="NoBooks-header">Hmm... you don't have any books yet!</h3>
      <img
        src="/images/empty_book.png"
        alt="empty book"
        className="NoBooks-img"
      />
      <p className="NoBooks-about">
        Create your own collection of recipes saved in a simple recipe book on
        your dashboard. Create books for all types of occasions or themes - for
        wherever your cooking takes you!{" "}
      </p>
      <button className="NoBooks-add-btn" onClick={showModal}>
        Add One Now!
      </button>
      <AddBook showModal={showModal} show={showAddForm} />
    </div>
  );
};

export default NoBooks;