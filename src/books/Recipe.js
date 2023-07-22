import React from "react";
import "./Recipe.css";

const Recipe = ({ recipe }) => {
  return (
    <div className="Recipe-card" id={recipe.uri}>
      <img src={recipe.image} className="Recipe-img" />
      <div className="Recipe-about">
        <div className="Recipe-name-text">
          <b>{recipe.label}</b>
        </div>
        <div className="Recipe-plus-btn">+</div>
      </div>
    </div>
  );
};

export default Recipe;
