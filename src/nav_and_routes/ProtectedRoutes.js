import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
// import UserContext from "../hooks/UserContext";

const ProtectedRoutes = ({ children }) => {
  //   const user = useContext(UserContext);

  const user = null;

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default ProtectedRoutes;
