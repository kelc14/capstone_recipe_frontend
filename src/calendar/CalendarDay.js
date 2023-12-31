import React, { useState, useEffect } from "react";
import WhiskApi from "../api/api";
import "./CalendarDay.css";

/** CalendarDay Component
 *
 * -> Renders individual day details on the calendar
 *
 *
 */

const CalendarDay = ({ day, uri, handleClear }) => {
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    if (uri) {
      const getRecipe = async () => {
        try {
          let shortenedUri = uri.slice(44);

          let res = await WhiskApi.getSingleRecipe(shortenedUri);
          setRecipe(() => ({ ...res }));
        } catch (e) {}
      };
      getRecipe();
    }
  }, [uri]);

  const clearDay = () => {
    uri = null;
    setRecipe(() => ({}));
    handleClear(day);
  };

  //   if (loading) return <p>loading...</p>;

  return (
    <div className="CalendarDay">
      <div className="CalendarDay-header">
        <p className="CalendarDay-day">{day.toUpperCase()}</p>
        {uri !== null && (
          <div className="CalendarDay-button-container">
            <button className="CalendarDay-clear" onClick={clearDay}>
              Clear
            </button>
          </div>
        )}
      </div>

      <div className="CalendarDay-body">
        {!uri && (
          <p className="CalendarDay-norecipe">
            You haven't added a recipe for this day yet. Explore your books or
            search recipes to find the perfect meal.
          </p>
        )}
        {Object.keys(recipe).length > 0 && (
          <div className="CalendarDay-recipe">
            <div className="CalendarDay-about">
              <img src={recipe.image} alt="food" className="CalendarDay-img" />
              <p className="CalendarDay-label">{recipe.label}</p>
            </div>
            <div className="CalendarDay-ingredients">
              <span>Ingredients:</span>
              <ul>
                {recipe.ingredientLines.map((ingr, idx) => (
                  <li key={idx}>{ingr}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarDay;
