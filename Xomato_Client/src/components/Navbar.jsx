// Importing necessary libraries and components
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import Modal from "../Modal";
import { logo } from "../assets";
import Cart from "../screens/Cart";
import { RiShoppingCart2Line } from "react-icons/ri";
import { useCartState } from "../hooks/contextReducer";

// Navbar component
const Navbar = () => {
  // Accessing cart state from context
  const cartState = useCartState();

  // State to manage the cart view modal
  const [cartView, setCartView] = useState(false);

  // React Router's navigate function
  const navigate = useNavigate();

  // Getting user token from localStorage
  const token = localStorage.getItem("token");

  // Logout functionality
  // Removes user token and email from localStorage, navigates to login page and reloads the page
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
    window.location.reload();
  };

  // Function to open cart view modal
  const loadCart = () => {
    setCartView(true);
  };

  // Rendering the Navbar component
  return (
    <div>
      {/* Navigation bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          {/* Logo link */}
          <Link className="navbar-brand" to="/">
            <img style={{ width: "25vh" }} src={logo} alt="" srcSet="" />
          </Link>

          {/* Navbar toggle button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Navbar links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              {/* Home link */}
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>

              {/* My Orders link (visible only when logged in) */}
              {token && (
                <Link className="nav-link fs-5" to="/myOrders">
                  My Orders
                </Link>
              )}
            </ul>
          </div>

          {/* Conditional rendering based on user authentication */}
          {!token ? (
            // Login button
            <Link className="btn bg-white text-success mx-1" to="/login">
              Login
            </Link>
          ) : (
            // Authenticated user options (Cart, Logout)
            <>
              {/* Cart button with item count badge */}
              <div
                className="btn bg-white text-success mx-2"
                onClick={loadCart}
              >
                <Badge pill bg="danger">
                  <RiShoppingCart2Line /> {cartState.length}
                </Badge>{" "}
                {"  "}
                My Cart
              </div>

              {/* Cart view modal */}
              {cartView && (
                <Modal onClose={() => setCartView(false)}>
                  <Cart />
                </Modal>
              )}

              {/* Logout button */}
              <div
                className="btn bg-white text-danger mx-1"
                onClick={handleLogout}
              >
                Logout
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

// Exporting the Navbar component
export default Navbar;
