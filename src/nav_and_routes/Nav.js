import React, { useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
// import orangeWLogo from "../images/w_logo_orange.png";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import WhiskApi from "../api/api";
import { updateUserInfo, logoutUser } from "../features/authSlice";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

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

const NavBar = () => {
  const { userInfo, userToken } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  if (userToken) {
    WhiskApi.token = userToken;
  }

  //   useEffect();
  //   if (userToken && !userInfo) {
  //     WhiskApi.token = userToken;
  //     const { username } = jwt_decode(userToken);
  //     const getUserInfo = async () => {
  //       let userData = await WhiskApi.getUserDetails(username);
  //       dispatch(updateUserInfo(userData));
  //     };
  //     getUserInfo(username);
  //   }

  //   let userToken = null;
  const handleLogout = () => {
    localStorage.clear();
    dispatch(logoutUser());
  };

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
          <button className="NavBar-dropdown-btn">K</button>
          <div className="NavBar-dropdown-content">
            <NavLink to="/profile " className="NavBar-dropdown-content-links">
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
            <img src="/images/w_logo_orange.png" className="Whisk-logo-img" />
          </Link>
        </div>
      </li>

      {userToken ? authLinks() : anonLinks()}
    </ul>
  );
};

export default NavBar;
