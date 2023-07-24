import React from "react";
import "./App.css";
import "./variables.css";
import { Routes, Route, Navigate } from "react-router-dom";
import WhiskApi from "./api/api";

import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "./features/authActions";
import { logoutUser } from "./features/authSlice";

import ProtectedRoutes from "./nav_and_routes/ProtectedRoutes";
import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignupForm";
import Home from "./home/Home";
import Books from "./books/Books";
import Calendar from "./calendar/Calendar";
import Profile from "./profile/Profile";
import Nav from "./nav_and_routes/Nav";

/** App component
 * - top level component that renders the header and all routes:
 *
 * anon routes:
 *      LoginForm     /login
 *      SignupForm    /signup
 *      Home         /home
 *
 * authenticated routes:
 *      Books       /books
 *      Calendar    /calendar
 *      Profile     /user/:username
 *
 *
 */
function App() {
  const { userInfo, userToken } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  // check to see if there is a userToken => add to Whisk API and if there is no userInfo -> update state
  if (localStorage.getItem("userToken")) {
    WhiskApi.token = localStorage.getItem("userToken");
    if (userInfo === null) {
      const { username } = jwt_decode(userToken);
      dispatch(authenticateUser({ username, token: WhiskApi.token }));
    }
  }

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logoutUser());
  };

  return (
    <div className="App">
      <Nav handleLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route
          path="/books"
          element={
            <ProtectedRoutes>
              <Books />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/calendar"
          element={
            <ProtectedRoutes>
              <Calendar />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/user/:username"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />

        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
