import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faStar, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./FullRecipeCard.css";
import WhiskApi from "../api/api";
import ToggleSwitch from "../common/ToggleSwitch";
import AddToCalendar from "../calendar/AddToCalendar";
import { Link } from "react-router-dom";

const FullRecipeCard = ({ show, showModal, uri }) => {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecipe = async () => {
      // http://www.edamam.com/ontologies/edamam.owl#recipe_62197682cae0754d80f21333364b3f9c
      let shortenedUri = uri.slice(44);
      try {
        let recipe = await WhiskApi.getSingleRecipe(shortenedUri);
        setRecipe(() => ({ ...recipe }));
        setLoading(() => false);
      } catch (e) {}
    };
    getRecipe();
  }, [uri]);

  // toggle modal off
  const onClose = () => {
    showModal();
  };

  // program to convert first letter of a string to uppercase
  function capitalizeFirstLetter(str) {
    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
  }

  if (show) {
    return (
      <div className="FullRecipeCard">
        {loading && (
          <div>
            <p>loading...</p>
          </div>
        )}
        {!loading && (
          <div className="FullRecipeCard-content">
            <div className="FullRecipeCard-header">
              <img src={recipe.image} className="FullRecipeCard-header-image" />
              <div>
                <h1 className="FullRecipeCard-header-label">{recipe.label}</h1>
                <div className="FullRecipeCard-header-about">
                  <div className="FullRecipeCard-header-about-types">
                    <p>
                      <b>Cuisine Type:</b>
                      {capitalizeFirstLetter(`${recipe.cuisineType}`)}
                      <br />
                      <b>Dish Type: </b>
                      {capitalizeFirstLetter(`${recipe.dishType}`)} <br />
                      <b>Meal Type: </b>
                      {capitalizeFirstLetter(`${recipe.mealType}`)}
                    </p>
                    <AddToCalendar uri={recipe.uri} />
                  </div>
                  <div className="FullRecipeCard-header-about-ratings">
                    <table>
                      <tbody>
                        <tr>
                          <td className="FullRecipeCard-table-description">
                            Your Rating:
                          </td>
                          <td className="FullRecipeCard-table-stars">
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                          </td>
                          <td className="FullRecipeCard-table-buttons">
                            <button className="FullRecipeCard-review-btns">
                              Leave a Review
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="FullRecipeCard-table-description">
                            Community Rating:
                          </td>
                          <td className="FullRecipeCard-table-stars">
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                          </td>
                          <td className="FullRecipeCard-table-buttons">
                            <button className="FullRecipeCard-review-btns">
                              View Reviews
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="FullRecipeCard-body">
              <div className="FullRecipeCard-user-info">
                <div className="FullRecipeCard-user-tried">
                  <ToggleSwitch /> <span>Tried It!</span>
                </div>

                <div className="FullRecipeCard-user-notes">
                  Add Your Notes ...
                </div>
              </div>
              <div className="FullRecipeCard-recipe-info">
                <div className="FullRecipe-recipeinfo"></div>

                <button className="FullReicpeCard-recipe-info-buttons">
                  <FontAwesomeIcon icon={faCaretDown} /> Ingredients
                </button>
                <div className="FullRecipe-recipeinfo">
                  <ul className="FullRecipe-ingredients">
                    {recipe.ingredientLines.map((ingr) => (
                      <li>- {ingr}</li>
                    ))}
                  </ul>
                </div>

                <button className="FullReicpeCard-recipe-info-buttons">
                  <FontAwesomeIcon icon={faCaretDown} /> Directions
                </button>
                <div className="FullRecipe-recipeinfo FullRecipe-directions-container">
                  <span>
                    Source: <Link to={`${recipe.source}`}>{recipe.source}</Link>
                  </span>
                  <div className="FullRecipe-ExitWhisk">
                    <Link>Exit Whisk to View Directions</Link>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="FullRecipeCard-cancel">
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>
        )}
      </div>
    );
  }
};

export default FullRecipeCard;
