import React, { useState } from "react";
import "./LoginForm.css";

import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../features/authActions";

import { useNavigate } from "react-router-dom";
import WhiskApi from "../api/api";
// import WhiskApi from "../api/api";

const LoginForm = () => {
  const INITIAL_STATE = { username: "", password: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);
  let navigate = useNavigate();

  const { loading, userInfo, error, success } = useSelector(
    (store) => store.auth
  );
  const dispatch = useDispatch();

  //   const [err, documentErrors, showFormError] = useErrors();

  /** Send {USERNAME, PASSWORD} to API to check if logged in and provide feedback
   *    & clear form. */
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      console.log(formData, "submitted");
      dispatch(loginUser(formData));

      let token = await WhiskApi.userLogin(formData);
      WhiskApi.token = token;
      //   console.log(token);
      //   loginUser(formData.username, token);
      navigate("/");
      setFormData(INITIAL_STATE);
    } catch (err) {
      //   documentErrors(err);
    }
  };
  /** setLoggedInContext */
  /** Update local state w/curr state of input elem */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };
  /** Render:
   *
   */
  return (
    <div className="LoginForm" onSubmit={handleSubmit}>
      <h2 className="LoginForm-heading">Log In</h2>
      <form className="LoginForm-form">
        <label htmlFor="username" className="LoginForm-label">
          Username:
        </label>
        <input
          id="username"
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
          className="LoginForm-input"
          autoComplete="username"
        />
        <label htmlFor="password" className="LoginForm-label">
          Password:
        </label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          className="LoginForm-input"
          autoComplete="current-password"
        />
        {/* {err && showFormError()} */}
        <button className="LoginForm-button">Log in</button>
      </form>
    </div>
  );
};

export default LoginForm;