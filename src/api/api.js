import axios from "axios";
const BASE_URL = "https://whisk-backend-kelc14.onrender.com";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.

 *
 */

class WhiskApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    // console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${WhiskApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      // console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  //   // USER ROUTES ********************************************************************************

  //   /** Login
  //    * data: { username, password}
  //    *  => {token}
  //    *      **
  //    */

  static async userLogin({ username, password }) {
    let res = await this.request("auth/login", { username, password }, "post");
    this.token = res.token;
    return res.token;
  }

  //   /** Sign up
  //    * data: { username, password, firstName, lastName, email}
  //    *  => {token}
  //    *      **
  //    */

  static async userSignup({ username, password, firstName, lastName, email }) {
    let res = await this.request(
      "auth/register",
      { username, password, firstName, lastName, email },
      "post"
    );
    this.token = res.token;
    return res.token;
  }

  //   /** Get user
  //    *  { username }
  //    *  => {user details}
  //    *      **
  //    */

  static async getUserDetails(username) {
    let res = await this.request(`user/${username}`);
    return res.user;
  }

  //   RECIPE ROUTES ********************************************************************************

  //   /** Get random recipes
  //    *  {  }
  //    *  => {recipes: [....]}
  //    *      **
  //    */

  static async getRandomRecipes() {
    let res = await this.request(`api/recipe`);
    return res.recipes;
  }
  //   /** Get random recipes
  //    *  {  }
  //    *  => {recipes: [....]}
  //    *      **
  //    */

  static async getRecipesByQuery({ search }) {
    let res = await this.request(`api/recipe?search=${search}`);
    return res.recipes;
  }

  //   /** Get single recipe by id
  //    *  {  }
  //    *  => {recipe: [....]}
  //    *      **
  //    */

  static async getSingleRecipe(shortenedUri) {
    let res = await this.request(`api/recipe/${shortenedUri}`);
    return res.recipe;
  }

  //   /** Add Recipe to DB if it is not already ->
  //    *  {  }
  //    *  => {recipe: [....]}
  //    *      **
  //    */

  static async addRecipeToDB(data) {
    let res = await this.request(`recipe/`, data, "post");
    return res.recipe;
  }

  //   BOOK ROUTES ********************************************************************************

  //   /** For book id => get first 6 recipe thumbnails
  //    *  {  }
  //    *  => [src....,src....]
  //    *      **
  //    */

  static async getBookDetails(id) {
    let res = await this.request(`book/${id}`);
    return res;
  }

  //   /** Add NEW Book for user => book details in response
  //    *  { title, username }
  //    *  => {id, title, username}
  //    *
  //    */

  static async addNewBook(data) {
    let res = await this.request(`book/`, data, "post");
    return res.book;
  }

  //   /** Update Book for user => book details in response
  //    *  { title, id }
  //    *  => {id, title, username}
  //    *
  //    */
  static async updateBook(id, data) {
    let res = await this.request(`book/${id}`, data, "patch");
    return res.book;
  }

  //   /** Delete Book for user => deleted
  //    *  { title, username }
  //    *  => {id, title, username}
  //    *
  //    */

  static async deleteBook(id) {
    let res = await this.request(`book/${id}`, {}, "delete");
    return res;
  }

  //   /** Add recipe to book
  //    *  { bookId, recipeURI }
  //    *  => {added: [....]}
  //    *      **
  //    */

  static async addRecipeToBook(data) {
    let res = await this.request(`book/recipe/add`, data, "post");
    return res;
  }

  //   CALENDAR ROUTES ********************************************************************************

  /** get user calendar
  //    * calendar: { username, monday, tuesday, wednesday, thursday, friday, saturday, sunday }
  //    *  => { calendar }
  //    *      **
  //    */

  static async getCalendar(username) {
    let res = await this.request(`calendar/${username}`);
    return res;
  }

  //   /** PATCH calendar
  //    * data: { username, day, uri}
  //    *  => { calendar }
  //    *      **
  //    */

  static async updateCalendar(data) {
    let res = await this.request(`calendar/${data.username}`, data, "patch");
    return res;
  }
}

export default WhiskApi;
