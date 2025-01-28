import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts"; // Assuming useAuth is a hook to access auth context

const PrivateRoute = ({ children }) => {
  const { userLoggedIn } = useAuth();

  // Redirect to login if user is not logged in
  return userLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
