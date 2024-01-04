// Importing necessary modules
import React from "react";
import { Link } from "react-router-dom";

// PageNotFound component
// This component is displayed when the user navigates to a route that does not exist in the application
const PageNotFound = () => {
  // The component returns a 404 error message and a button to navigate back to the home page
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          <span className="text-danger">Opps!</span> Page not found.
        </p>
        <p className="lead">The page you’re looking for doesn’t exist.</p>
        {/* // The Link component is used to navigate back to the home page */}
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
};

// Exporting the PageNotFound component
export default PageNotFound;
