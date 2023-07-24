import React from "react";
import "./NoBooks.css";

/** NoBooks Component:
 *
 *      displayed if a user has no books - just an "about" page about what books are
 *
 *      displays a button to add a new book
 *
 */

const NoBooks = ({ showModal }) => {
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
    </div>
  );
};

export default NoBooks;
