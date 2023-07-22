import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../features/recipesSlice";
import "./Home.css";

import AnonHome from "./AnonHome";
import Recipe from "../books/Recipe";
import SomethingWentWrong from "../errors/SomethingWentWrong";

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
  // fetch posts when site loads
  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  if (userInfo || userToken) {
    if (loading) return <p>Loading...</p>;

    if (!loading && recipes.length === 0) {
      return <SomethingWentWrong />;
    }

    return (
      <div className="Home-recipe-container">
        {recipes.map((obj) => (
          <Recipe recipe={obj.recipe} key={obj.recipe.uri} />
        ))}
      </div>
    );
  } else {
    return <AnonHome />;
  }
};

export default Home;
