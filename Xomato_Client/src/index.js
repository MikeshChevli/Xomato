// Importing necessary modules
import React from "react";
import ReactDOM from "react-dom/client";
// Importing CSS styles
import "./index.css";
// Importing the main App component
import App from "./App";

// Creating a root for the React application
const root = ReactDOM.createRoot(document.getElementById("root"));
// Rendering the App component within React's StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
