import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authenticateUser } from "../features/authActions";
import WhiskApi from "../api/api";
import jwt_decode from "jwt-decode";

import SearchBar from "./SearchBar";

import "./Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

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

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (localStorage.userToken && !userInfo) {
      WhiskApi.token = localStorage.userToken;
      if (userInfo === null) {
        const { username } = jwt_decode(localStorage.userToken);
        dispatch(authenticateUser({ username, token: WhiskApi.token }));
      }
    }
  }, [window.location.pathname]);

  const authLinks = () => {
    return (
      <>
        <div className="NavBar-div">
          <li className="NavBar-li NavBar-li-allowactive">
            <NavLink to="/books" className="NavBar-links">
              Books
            </NavLink>
          </li>
        </div>

        <div className="NavBar-div">
          {/* search bar space for large screens */}
        </div>
        <div className="NavBar-div">
          <li className="NavBar-li NavBar-li-allowactive">
            <NavLink to="/calendar" className="NavBar-links">
              Calendar
            </NavLink>
          </li>
        </div>

        <div className="NavBar-div NavBar-dropdown">
          <button className="NavBar-dropdown-btn">
            {userInfo.firstName.charAt(0).toUpperCase()}
          </button>
          <div className="NavBar-dropdown-content">
            <NavLink
              to={`/user/${userInfo.username}`}
              className="NavBar-dropdown-content-links NavBar-links"
            >
              Profile
            </NavLink>
            <NavLink
              to="/"
              onClick={handleLogout}
              className="NavBar-dropdown-content-links NavBar-links"
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
        <div className="NavBar-div NavBar-login">
          <li className="NavBar-li">
            <NavLink to="/login " className="NavBar-links">
              Log in
            </NavLink>
          </li>{" "}
        </div>{" "}
        <div className="NavBar-div">
          <li className="NavBar-li">
            <NavLink to="/signup " className="NavBar-links">
              Sign Up
            </NavLink>
          </li>
        </div>
      </>
    );
  };

  return (
    <ul className="NavBar">
      <li className="NavBar-li-logo">
        <Link to="/">
          <img
            src="/images/w_logo_orange.png"
            className="Whisk-logo-img"
            alt="w whisk logo"
          />
        </Link>
      </li>
      {/* <div className="NavBar-hamburger">
        <FontAwesomeIcon icon={faBars} />
      </div> */}

      <input
        type="checkbox"
        id="NavBar-check"
        onClick={() => setIsChecked(() => !isChecked)}
      />
      <label for="NavBar-check" class="NavBar-hamburger">
        {isChecked ? (
          <FontAwesomeIcon icon={faX} />
        ) : (
          <FontAwesomeIcon icon={faBars} />
        )}
      </label>

      <div className="NavBar-menu">{userInfo ? authLinks() : anonLinks()}</div>
    </ul>
  );
};

export default NavBar;
