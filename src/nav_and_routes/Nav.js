import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authenticateUser } from "../features/authActions";
import WhiskApi from "../api/api";
import jwt_decode from "jwt-decode";

import SearchBar from "./SearchBar";

import "./Nav.css";

/**
 * NavBar Component ->
 *
 * if userToken stored (auth) - display authenticated routes:
 * -calendar, books, profile, logout
 *
 * if anon - display anon routes
 * - log in, sign up
 *
 */

const NavBar = ({ handleLogout }) => {
  const { userInfo } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.userToken && !userInfo) {
      WhiskApi.token = localStorage.userToken;
      if (userInfo === null) {
        const { username } = jwt_decode(localStorage.userToken);
        dispatch(authenticateUser({ username, token: WhiskApi.token }));
      }
    }
  });

  const authLinks = () => {
    return (
      <>
        <div className="NavBar-div">
          <li
            className="NavBar-li NavBar-li-allowactive"
            style={{ float: "right" }}
          >
            <NavLink to="/books">Books</NavLink>
          </li>{" "}
        </div>
        <div className="NavBar-div">
          <li className="NavBar-li">
            <SearchBar />
          </li>{" "}
        </div>
        <div className="NavBar-div">
          <li
            className="NavBar-li NavBar-li-allowactive"
            style={{ float: "right" }}
          >
            <NavLink to="/calendar">Calendar</NavLink>
          </li>
        </div>

        <div className="NavBar-div NavBar-dropdown">
          <button className="NavBar-dropdown-btn">
            {userInfo.firstName.charAt(0).toUpperCase()}
          </button>
          <div className="NavBar-dropdown-content">
            <NavLink
              to={`/user/${userInfo.username}`}
              className="NavBar-dropdown-content-links"
            >
              Profile
            </NavLink>
            <NavLink
              to="/"
              onClick={handleLogout}
              className="NavBar-dropdown-content-links"
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? "white" : "",
                };
              }}
            >{`Logout`}</NavLink>
          </div>
        </div>
      </>
    );
  };

  const anonLinks = () => {
    return (
      <>
        <li className="NavBar-li" style={{ float: "right" }}>
          <NavLink to="/signup ">Sign Up</NavLink>
        </li>
        <li className="NavBar-li" style={{ float: "right" }}>
          <NavLink to="/login ">Log in</NavLink>
        </li>
      </>
    );
  };

  return (
    <ul className="NavBar">
      <li className="NavBar-li-logo">
        <div className="Whisk-logo-txt">
          {" "}
          <Link to="/">
            <img
              src="/images/w_logo_orange.png"
              className="Whisk-logo-img"
              alt="w whisk logo"
            />
          </Link>
        </div>
      </li>

      {userInfo ? authLinks() : anonLinks()}
    </ul>
  );
};

export default NavBar;
