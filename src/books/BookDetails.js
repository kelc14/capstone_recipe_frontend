import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./BookDetails.css";
import RecipeCard from "../recipe_cards/RecipeCard";
import { getBookDetails } from "../features/bookActions";
import { useDispatch, useSelector } from "react-redux";

const BookDetails = () => {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(() => true);
  // const { userInfo } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookDetails({ id }));
    if (book) {
      setIsLoading(() => false);
    }
  }, [dispatch, id]);

  const { book } = useSelector((store) => store.book);

  console.log(isLoading);
  if (isLoading) return <p>Loading...</p>;

  if (!isLoading) {
    return (
      <div className="BookDetails">
        <div className="BookDetails-header">
          <span className="BookDetails-title">{book.title}</span>
        </div>
        <div className="BookDetails-body">
          {!book.recipes.length && (
            <p>
              You have no recipes in this book yet. <br />
              <NavLink to="/" className="BookDetails-browse-btn">
                {" "}
                Browse Recipes?{" "}
              </NavLink>
            </p>
          )}
          <div className="BookDetails-card-container">
            {book.recipes.length > 0 &&
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
