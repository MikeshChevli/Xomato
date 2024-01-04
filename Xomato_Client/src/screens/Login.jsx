// Importing necessary modules and hooks
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Login component
const Login = () => {
  // Using the useNavigate hook from react-router-dom to programmatically navigate through our application
  const navigate = useNavigate();
  
  // Using the useState hook to manage the state of our form
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // Function to handle the change of input fields
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Function to handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Try to login the user
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/login",
        values
      );
      console.log(response);
      // If the login is successful, store the token and user email in the local storage and navigate to the home page
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userEmail", values.email);
        console.log(`${response.data.message}`);
        navigate("/");
      } else {
        console.log(`${response.data.message}`);
      }
    } catch (error) {
      console.log(`Error message : ${error}`);
      console.log("Something went wrong!");
    }
  };
  
  // Render the login form
  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary">
          Lon in
        </button>
        <Link to="/signup" className=" m-3 btn btn-danger">
          Sign up
        </Link>
      </form>
    </div>
  );
};

// Exporting the Login component
export default Login;
