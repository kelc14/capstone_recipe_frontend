import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import WhiskApi from "../api/api";

import "./AddToBook.css";

/** AddToBook Component:
 *
 *  -> displays form for the user to a recipe to their book
 *  -> rendered from RecipeCard and FullRecipeCard
 *
 *  Accepts props: recipeURI (from FullRecipeCard only)
 *  Otherwise collects uri from params
 *
 */
const AddToBook = ({ recipeURI }) => {
  const INITIAL_STATE = { bookId: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);
  let navigate = useNavigate();

  let { uri } = useParams();

  uri = uri ? uri : recipeURI;
  const { userInfo } = useSelector((store) => store.auth);

  /** Send {username, day, uri } to API to add recipe to calendar
   *    & clear form / navigate to calendar. */
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // add day, username, uri to Calendar DB
      formData.recipeURI = `http://www.edamam.com/ontologies/edamam.owl#${uri}`;
      formData.bookId = +formData.bookId;
      WhiskApi.token = localStorage.userToken;

      WhiskApi.addRecipeToBook(formData);

      navigate("/books");

      setFormData(INITIAL_STATE);
    } catch (err) {}
  };
  /** Update local state w/curr state of input elem */
  const handleChange = (e) => {
    setFormData(() => ({ bookId: e.target.value }));
  };

  if (!userInfo.books) return <p>Loading...</p>;

  if (userInfo.books.length === 0) {
    return <div>You have no books yet.</div>;
  }

  return (
    <div className="AddToBook" onSubmit={handleSubmit}>
      <h1 className="AddToBook-header">Choose Book To Add To:</h1>

      <form className="AddToBook-form">
        <select
          name="bookId"
          id="bookId"
          onChange={handleChange}
          defaultValue={""}
        >
          <option value="" disabled hidden>
            Choose a Book:
          </option>
          {userInfo.books.map((book) => (
            <option value={book.id} key={book.id} id={book.id}>
              {book.title}
            </option>
          ))}
        </select>
        <button>Add</button>
      </form>
    </div>
  );
};

export default AddToBook;
