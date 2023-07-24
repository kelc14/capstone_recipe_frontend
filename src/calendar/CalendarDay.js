import React, { useState, useEffect } from "react";
import WhiskApi from "../api/api";
import "./CalendarDay.css";

const CalendarDay = ({ day, uri, handleClear }) => {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (uri !== null) {
      const getRecipe = async () => {
        // http://www.edamam.com/ontologies/edamam.owl#recipe_62197682cae0754d80f21333364b3f9c
        let shortenedUri = uri.slice(44);
        try {
          let recipe = await WhiskApi.getSingleRecipe(shortenedUri);
          setRecipe(() => ({ ...recipe }));

          console.log(recipe);
        } catch (e) {}
      };
      getRecipe();
    }
    setLoading(() => false);
  }, [uri]);

  if (loading) return <p>loading...</p>;

  return (
    <div className="CalendarDay">
      <div className="CalendarDay-header">
        <p className="CalendarDay-day">{day.toUpperCase()}</p>
        {uri !== null && (
          <div className="CalendarDay-button-container">
            <button
              className="CalendarDay-clear"
              onClick={() => handleClear(day)}
            >
              Clear
            </button>
          </div>
        )}
      </div>

      <div className="CalendarDay-body">
        {uri && (
          <div className="CalendarDay-recipe">
            <div className="CalendarDay-about">
              <img
                src={recipe.image}
                alt="recipe image"
                className="CalendarDay-img"
              />
              <p className="CalendarDay-label">{recipe.label}</p>
            </div>
            <div className="CalendarDay-ingredients">
              Ingredients:
              <ul role="list">
                {recipe.ingredientLines.map((ingr) => (
                  <li>{ingr}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {!uri && (
          <p className="CalendarDay-norecipe">
            You haven't added a recipe for this day yet. Explore your books or
            search recipes to find the perfect meal.
          </p>
        )}
      </div>
    </div>
  );
};

export default CalendarDay;
