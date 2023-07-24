import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import FullRecipeCard from "./FullRecipeCard";
import "./RecipeCard.css";

/** RecipeCard Component
 * => Displays small card with recipe information (title, image, add button)
 *
 * => Acts as a link- when clicked renders FullRecipeCard
 */

const RecipeCard = ({ recipe }) => {
  const [showRecipe, setShowRecipe] = useState(false);

  // toggle showing modal (add book form)
  const showModal = (uri) => {
    setShowRecipe(() => !showRecipe);
    console.log(uri);
  };

  return (
    <>
      <div
        className="Recipe-card"
        id={recipe.uri}
        onClick={() => showModal(recipe.uri)}
      >
        <img src={recipe.image} className="Recipe-img" />
        <div className="Recipe-about">
          <div className="Recipe-name-text">
            <b>{recipe.label}</b>
          </div>
          <div className="Recipe-plus-btn-container">
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
