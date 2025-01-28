import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Navbar } from "../Navbar";
import UploadPage from "../../pages/UploadPage";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route
        path="/upload-page"
        element={
          <PrivateRoute>
            <>
              <Navbar />
              <UploadPage />
            </>
          </PrivateRoute>
        }
      />
      {/* Add more private routes as needed */}
    </Routes>
  );
};

export default PrivateRoutes;
