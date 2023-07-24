import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.

 *
 */

class WhiskApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${WhiskApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on all companies
   *    * params only include name**
   */

  //   static async getAllCompanies(params = {}) {
  //     let res = await this.request("companies", params);
  //     return res.companies;
  //   }

  //   /** Get details on a company by handle. */

  //   static async getCompany(handle) {
  //     let res = await this.request(`companies/${handle}`);
  //     return res.company;
  //   }

  //   /** Get details on all jobs
  //    * params only include title**
  //    */

  //   static async getAllJobs(params = {}) {
  //     let res = await this.request("jobs", params);
  //     return res.jobs;
  //   }

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
