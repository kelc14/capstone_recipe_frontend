import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import UserContext from "../hooks/UserContext";

/** ProtectedRoutes Component:
 *
 * Authenticates user by redirecting to the homepage if there is no userToken
 */
const ProtectedRoutes = ({ children }) => {
  const { userToken } = useSelector((store) => store.auth);

  if (!userToken) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoutes;
