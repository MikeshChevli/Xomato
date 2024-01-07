// Importing necessary modules
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

// Signup component
// This component is used to handle the user registration process
const Signup = () => {
  // useNavigate hook from react-router-dom is used to programmatically navigate to different routes
  const navigate = useNavigate();
  
  // useState hook is used to manage the form data
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    gioLocation: "",
  });

  // handleChange function is used to update the state as the user types in the form
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // handleSubmit function is used to handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Try-catch block is used to handle the API call
    try {
      // Axios is used to make a POST request to the server
      const response = await axios.post(
        "https://xomatobackend.onrender.com/api/user/register",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // If the response is successful, the user is redirected to the login page
      if (response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      message.error("Something went wrong!");
    }
  };
  
  // The component returns a form for the user to fill in their details
  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="InputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={(e) => handleChange(e)}
            className="form-control"
            id="InputName"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={(e) => handleChange(e)}
            className="form-control"
            id="InputEmail1"
            autoComplete="username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={(e) => handleChange(e)}
            className="form-control"
            id="InputPassword1"
            autoComplete="current-password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputAddress1" className="form-label">
            Address
          </label>
          <input
            type="text"
            name="gioLocation"
            value={values.gioLocation}
            onChange={(e) => handleChange(e)}
            className="form-control"
            id="InputAddress1"
          />
        </div>

        <button type="submit" className="m-3 btn btn-primary">
          Sign up
        </button>
        <Link to="/login" className=" m-3 btn btn-danger">
          Already a user!
        </Link>
      </form>
    </div>
  );
};

// Exporting the Signup component
export default Signup;
