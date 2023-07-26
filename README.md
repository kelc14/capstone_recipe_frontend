
![whisk logo](https://raw.githubusercontent.com/kelc14/capstone_recipe_frontend/master/readme_images/whisk_white_bg.png)

Live Project Link 🔗 [Whisk Recipe App](https://whisk-frontend-kelc14.onrender.com) 🔗 Hosted on Render

This project was built with [Create React App](https://github.com/facebook/create-react-app). This is the front-end of the project, [find the backend here](https://github.com/kelc14/capstone_recipe_app.git).


## About Whisk App 👩‍🍳

Introducing the ultimate recipe app, where storing and finding your favorite recipes has never been easier.  With Whisk, you can keep all of your favorite recipes in one place, making it easier than ever to find that perfect dish for any occasion.

But that's not all! You can also make notes about recipes, leave reviews so that you can remember any changes that you made or share your thoughts with others. Whether you're an experienced chef or just starting out, Whisk It is the perfect tool to help you create amazing meals that you and your loved ones will enjoy.


## Available Scripts ⌨️

First install dependencies:
### `npm install`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


## The Tech Framework 💻
* PostgreSQL - Relational Database Management System
* Node.js and Express - Backend API
* ReactJS - Frontend Framework
* Redux - State Management

## The API 📈
###Edamam API
Recipe data was fetched from Edamam API.  In order to access this information, you will need to [sign up for a free account here](https://www.edamam.com/).  You will need to set a `API_APP_KEY` and `API_APP_ID` both provided to you by Edamam.
### Node.js Backend
The backend of this project was built using Node.js with Express JS framework.  This RESTful API has routes to collect user information, recipe information, book information, calendar information and more. Returns JSON data upon request.  Accepts Authorization via bearer token.

## The Looks 👀
When first visiting Whisk, users see a slideshow of recipe images:

![whisk logo](https://raw.githubusercontent.com/kelc14/capstone_recipe_frontend/master/readme_images/homepage.png)

After logging in, users have access to recipes loaded from the Edamam Api:

![whisk logo](https://raw.githubusercontent.com/kelc14/capstone_recipe_frontend/master/readme_images/userhomepage.png)

Users can store recipes in books, or add them to a weekly calendar to get a list of ingredients for their shopping lists:

![whisk logo](https://raw.githubusercontent.com/kelc14/capstone_recipe_frontend/master/readme_images/books.png)
![whisk logo](https://raw.githubusercontent.com/kelc14/capstone_recipe_frontend/master/readme_images/calendar.png)

## The Approach 🏃‍♀️
For the user experience, I focused on functionality that would allow users to store recipes in an organized and useful way.  See the user flow here: 

![whisk logo](https://raw.githubusercontent.com/kelc14/capstone_recipe_frontend/master/readme_images/userflow.png)

With this in mind, I created an app that allows users to browse recipes and with those recipes there are three main outcomes:
####View Full Recipe Details
Here users can view the meal type and cuisine type.  They can also view the recipe image, ingredients and directions (link to outside site).  From here, users can add recipes to their books, or add recipes to their calendar.
####Add Recipe to Book
Once a user adds a recipe to a specific book, it is stored for the user to find later. Users can view their books, edit them and delete them.
####Add Recipe to Calendar
A user can add one recipe per day to their calendar. They can clear each day individually.  Each day displays a list of ingredients needed to make the meal.
## The Status 💯
This is a capstone project for the Software Engineering Bootcamp that I completed this year.  It is a complete project for this program, but in terms of style and functionality - more work is to be done! 

Styling work left to complete: 
- Responsive Design
- Modernize Theme Colors
- Focus on Mobile View

Functionality work left to complete:
- Users add and view recipe ratings
- Users add and view recipe reviews
- Collect an ingredient list from the weekly schedule


