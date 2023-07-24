import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import FullRecipeCard from "./FullRecipeCard";
import "./RecipeCard.css";
import AddToBook from "../books/AddToBook";
import { useNavigate } from "react-router-dom";

/** RecipeCard Component
 * => Displays small card with recipe information (title, image, add button)
 *
 * => Acts as a link- when clicked renders FullRecipeCard
 */

const RecipeCard = ({ recipe }) => {
  const [showRecipe, setShowRecipe] = useState(false);
  const navigate = useNavigate();

  // toggle showing modal (add book form)
  const showModal = (uri) => {
    setShowRecipe(() => !showRecipe);
  };

  const handleAddToBook = (uri) => {
    let shortenedUri = uri.slice(44);
    console.log(shortenedUri);
    navigate(`/add/${shortenedUri}`);
  };

  return (
    <>
      <div className="Recipe-card" id={recipe.uri}>
        <img
          src={recipe.image}
          className="Recipe-img"
          onClick={() => showModal(recipe.uri)}
        />
        <div className="Recipe-about">
          <div
            className="Recipe-name-text"
            onClick={() => showModal(recipe.uri)}
          >
            <b>{recipe.label}</b>
          </div>
          <div
            className="Recipe-plus-btn-container"
            onClick={() => handleAddToBook(recipe.uri)}
          >
            <FontAwesomeIcon icon={faPlusCircle} className="Recipe-plus-btn" />
          </div>
        </div>
      </div>
      {showRecipe && (
        <div>
          <FullRecipeCard
            showModal={showModal}
            show={showRecipe}
            uri={recipe.uri}
          />
        </div>
      )}
    </>
  );
};

export default RecipeCard;
