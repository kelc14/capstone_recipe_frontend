import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../features/authActions";

const Profile = () => {
  const { userInfo } = useSelector((store) => store.auth);

  let { username, firstName, lastName, email } = userInfo;

  const INITIAL_STATE = { username, firstName, lastName, email };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  /** Send {firstName, lastName, password, email}
   * to API to patch user data
   *    & clear form. */

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      dispatch(updateUser(formData));
      navigate("/profile");
    } catch (err) {}
  };

  /** Update local state w/curr state of input elem */

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };
  return (
    <div>
      <div>
        <div className="Profile-icon">
          {userInfo.firstName.charAt(0).toUpperCase()}
        </div>
      </div>
      <h3>Update Profile</h3>

      <div className="ProfileForm">
        {/* {alert.length > 0 && showAlerts()} */}
        <form className="ProfileForm-form" onSubmit={handleSubmit}>
          <label htmlFor="username" className="ProfileForm-label">
            Username:
          </label>
          <input
            id="username"
            type="text"
            name="username"
            onChange={handleChange}
            value={formData.username}
            className="ProfileForm-input"
            disabled
          />

          <label htmlFor="firstName" className="ProfileForm-label">
            First Name:
          </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
            className="ProfileForm-input"
          />
          <label htmlFor="lastName" className="ProfileForm-label">
            Last Name:
          </label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
            className="ProfileForm-input"
          />
          <label htmlFor="email" className="ProfileForm-label">
            Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            className="ProfileForm-input"
          />
          {/* {err && showFormError()} */}

          <button className="ProfileForm-button">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
