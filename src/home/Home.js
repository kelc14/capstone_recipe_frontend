import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getMoreRecipes } from "../features/recipesSlice";
import "./Home.css";

import AnonHome from "./AnonHome";
import RecipeCard from "../recipe_cards/RecipeCard";
import SomethingWentWrong from "../errors/SomethingWentWrong";
import WhiskApi from "../api/api";
import jwt_decode from "jwt-decode";
import { updateUserInfo } from "../features/authSlice";

/** Home component
 * - first component to display to user (home page)
 *
 *  if anon (no userToken OR userInfo):
 *      displays welcome screen with login and signup button (<AnonHome>)
 *
 *  if logged in user (userToken or userInfo)
 *      displays 20 random recipes
 *      if recipes do not fetch, display SomethingWentWrong
 *
 */

const Home = () => {
  const dispatch = useDispatch();

  const { recipes, loading } = useSelector((store) => store.recipes);
  const { userInfo, userToken } = useSelector((store) => store.auth);

  // fetch recipes when site loads
  useEffect(() => {
    dispatch(getRecipes());
  }, [userToken]);

  if (userInfo || userToken) {
    if (loading) return <p>Loading...</p>;

    if (!loading && recipes.length === 0) {
      return <SomethingWentWrong />;
    }

    // const addMore = () => {
    //   dispatch(getMoreRecipes());
    // };

    return (
      <div className="Home-recipe-container">
        {recipes.map((obj) => (
          <RecipeCard recipe={obj.recipe} key={obj.recipe.uri} />
        ))}

        {/* <button onClick={addMore}>Add more recipes</button> */}
      </div>
    );
  } else {
    return <AnonHome />;
  }
};

export default Home;
