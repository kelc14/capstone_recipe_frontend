import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import UserContext from "../hooks/UserContext";

const ProtectedRoutes = ({ children }) => {
  const { userToken } = useSelector((store) => store.auth);

  if (!userToken) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default ProtectedRoutes;
