// Importing necessary modules and hooks
import React, { useEffect, useState } from "react";
import axios from "axios";
// Importing components
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// MyOrder component
const MyOrder = () => {
  // State for storing order data
  const [orderData, setOrderData] = useState([]);

  // Function to fetch order data
  const fetchMyOrder = async () => {
    try {
      // Getting user email from local storage
      const userEmail = localStorage.getItem("userEmail");
      // Making a POST request to the server to get order data
      const response = await axios.post(
        "https://xomatobackend.onrender.com/api/auth/myOrderData",
        { email: userEmail },
        { headers: { "Content-Type": "application/json" } }
      );

      // Setting the order data state
      setOrderData(response.data.orderData);
    } catch (error) {
      // Logging any errors
      console.error("Error fetching order data:", error);
    }
  };

  // Using useEffect to call fetchMyOrder function when the component mounts
  useEffect(() => {
    fetchMyOrder();
  }, []);

  // Rendering the component
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {orderData.map((order, orderIndex) => (
            <div key={orderIndex}>
              {order.order_data
                .slice(0)
                .reverse()
                .map((itemGroup, itemGroupIndex) => (
                  <div key={itemGroupIndex}>
                    {itemGroup.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        {item.Order_date ? (
                          <div className="m-auto mt-5">
                            {item.Order_date}
                            <hr />
                          </div>
                        ) : (
                          <div className="col-12 col-md-6 col-lg-3">
                            <div
                              className="card mt-3"
                              style={{ width: "16rem", maxHeight: "360px" }}
                            >
                              <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <div
                                  className="container w-100 p-0"
                                  style={{ height: "38px" }}
                                >
                                  <span className="m-1">{item.quantity}</span>
                                  <span className="m-1">{item.size}</span>
                                  <span className="m-1">{item.Order_date}</span>
                                  <div className=" d-inline ms-2 h-100 w-20 fs-5">
                                    ₹{item.price}/-
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Exporting the MyOrder component
export default MyOrder;
