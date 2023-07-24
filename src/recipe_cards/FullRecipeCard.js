import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faStar, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./FullRecipeCard.css";
import WhiskApi from "../api/api";
import ToggleSwitch from "../common/ToggleSwitch";
import AddToCalendar from "../calendar/AddToCalendar";

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

        console.log(recipe);
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
                <button className="FullReicpeCard-recipe-info-buttons">
                  <FontAwesomeIcon icon={faCaretDown} /> Nutritional Information
                </button>
                <button className="FullReicpeCard-recipe-info-buttons">
                  <FontAwesomeIcon icon={faCaretDown} /> Ingredients
                </button>
                <button className="FullReicpeCard-recipe-info-buttons">
                  <FontAwesomeIcon icon={faCaretDown} /> Directions
                </button>
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