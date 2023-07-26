import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getBookDetails } from "../features/bookActions";

// components
import RecipeCard from "../recipe_cards/RecipeCard";

import "./BookDetails.css";

/** BookDetails Component:
 *  -> displays webpage with icons for each of the users recipes in the book
 *
 *  -> if the user has no recipes, displays link for user to browse recipes on the homepage
 *
 *  > Renders: RecipeCard for each recipe within the books table for the user
 *
 */

const BookDetails = () => {
  let { id } = useParams();

  const dispatch = useDispatch();
  const { book } = useSelector((store) => store.book);

  useEffect(() => {
    dispatch(getBookDetails({ id }));
  }, [dispatch, id]);

  if (!book) return <p>Loading...</p>;

  if (book) {
    return (
      <div className="BookDetails">
        <div className="BookDetails-header">
          <span className="BookDetails-title">{book.title}</span>
        </div>
        <div className="BookDetails-body">
          {"recipes" in book && book.recipes.length === 0 && (
            <p>
              You have no recipes in this book yet. <br />
              <NavLink to="/" className="BookDetails-browse-btn">
                {" "}
                Browse Recipes?{" "}
              </NavLink>
            </p>
          )}
          <div className="BookDetails-card-container">
            {book.recipes &&
              book.recipes.map((obj) => (
                <RecipeCard recipe={obj} key={obj.uri} added="true" />
              ))}
          </div>
        </div>
      </div>
    );
  }
};

export default BookDetails;
