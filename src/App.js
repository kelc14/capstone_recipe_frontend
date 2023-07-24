import React, { useEffect, useState } from "react";
import "./App.css";
import "./variables.css";
// import { Routes, Route, Nvaigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "./features/authSlice";
import WhiskApi from "./api/api";

import Nav from "./nav_and_routes/Nav";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "./features/authSlice";

import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./nav_and_routes/ProtectedRoutes";
import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignupForm";
import Home from "./home/Home";
import Books from "./books/Books";
import Calendar from "./calendar/Calendar";
import Profile from "./profile/Profile";

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
  return (
    <div className="App">
      <Nav />
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
