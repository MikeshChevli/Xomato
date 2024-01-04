// Importing necessary libraries and components
import React from "react";
import { Link } from "react-router-dom";

// Footer component
// This component is used to display the footer of the application
const Footer = () => {
  return (
    <div>
      <div className="container">
        {/* // Footer section */}
        <footer className="py-3 my-4">
          {/* // Navigation links */}
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item">
              {/* // Home link */}
              <Link href="/" className="nav-link px-2 text-muted">
                Home
              </Link>
            </li>
            <li className="nav-item">
              {/* // Features link */}
              <Link href="/" className="nav-link px-2 text-muted">
                Features
              </Link>
            </li>
            <li className="nav-item">
              {/* // Pricing link */}
              <Link href="/" className="nav-link px-2 text-muted">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              {/* // FAQs link */}
              <Link href="/" className="nav-link px-2 text-muted">
                FAQs
              </Link>
            </li>
            <li className="nav-item">
              {/* // About link */}
              <Link href="/" className="nav-link px-2 text-muted">
                About
              </Link>
            </li>
          </ul>
          {/* // Copyright notice */}
          <p className="text-center text-muted">© 2021 Company, Inc</p>
        </footer>
      </div>
      ;
    </div>
  );
};

// Exporting the Footer component
export default Footer;
