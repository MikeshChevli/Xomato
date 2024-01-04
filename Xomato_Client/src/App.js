import { Home, Login, MyOrder, PageNotFound, Signup } from "./screens";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React  from "react";
import { CartProvider } from "./hooks/contextReducer.js";

function App() {
  return (
    // Wrapping the entire application within CartProvider to provide cart context to all components
    <CartProvider>
        {/* // Using Router to handle routing within the application */}
        <Router>
          {/* // Defining the routes for the application */}
          <Routes>
            {/* // Home route */}
            <Route path="/" element={<Home />} />
            {/* // Login route */}
            <Route path="/login" element={<Login />} />
            {/* // Signup route */}
            <Route path="/signup" element={<Signup />} />
            {/* // MyOrders route */}
            <Route path="/myOrders" element={<MyOrder />} />
            {/* // Fallback route for any undefined paths */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
    </CartProvider>
  );
}

// Exporting the App component
export default App;
