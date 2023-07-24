import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./BookDetails.css";
import RecipeCard from "../recipe_cards/RecipeCard";
import { getBookDetails } from "../features/bookActions";
import { useDispatch, useSelector } from "react-redux";

const BookDetails = () => {
  let { id } = useParams();
  //   const [book, setBook] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookDetails({ id }));
  }, [dispatch, id]);

  const { book, bookLoading, bookError } = useSelector((store) => store.book);

  if (bookLoading) return <p>loading...</p>;
  if (bookError) return bookError;

  // let recipes = book.recipes;

  return (
    <div className="BookDetails">
      <div className="BookDetails-header">
        <span className="BookDetails-title">title</span>
      </div>
      <div className="BookDetails-body">
        {/* {!recipes.length && (
          <p>
            You have no recipes in this book yet. <br />
            <NavLink to="/" className="BookDetails-browse-btn">
              {" "}
              Browse Recipes?{" "}
            </NavLink>
          </p>
        )}
        <div className="BookDetails-card-container">
          {recipes.length > 0 &&
            recipes.map((obj) => (
              <RecipeCard recipe={obj} key={obj.uri} added="true" />
            ))}
        </div> */}
      </div>
    </div>
  );
};

export default BookDetails;
