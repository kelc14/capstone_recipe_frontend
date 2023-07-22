import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
// import orangeWLogo from "../images/w_logo_orange.png";
import "./Nav.css";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import WhiskApi from "../api/api";
import { updateUserInfo, logoutUser } from "../features/authSlice";
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
        <li className="NavBar-li" style={{ float: "right" }}>
          <NavLink to="/" onClick={handleLogout}>{`Logout`}</NavLink>
        </li>
        <li className="NavBar-li" style={{ float: "right" }}>
          <NavLink to="/profile ">Profile</NavLink>
        </li>
        <li className="NavBar-li" style={{ float: "right" }}>
          <NavLink to="/calendar">Calendar</NavLink>
        </li>
        <li className="NavBar-li" style={{ float: "right" }}>
          <NavLink to="/books">Books</NavLink>
        </li>
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
      <li className="NavBar-li">
        <Link to="/" className="Whisk-logo-txt">
          {/* WHISK */}
          <img src="/images/w_logo_orange.png" className="Whisk-logo-img" />
        </Link>
      </li>

      {userToken ? authLinks() : anonLinks()}
    </ul>
  );
};

export default NavBar;
