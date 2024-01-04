import React from "react";
import { useCartState, useCartDispatch } from "../hooks/contextReducer";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";

/**
 * Cart component that displays the items in the user's cart.
 * It provides functionality to remove items from the cart and to checkout.
 * The checkout process involves sending a POST request to the server with the order data.
 * If the checkout is successful, the cart is emptied.
 * The total price of the items in the cart is also calculated and displayed.
 */
const Cart = () => {
  // Custom hooks to access cart state and dispatch functions
  const cartState = useCartState();
  const cartDispatch = useCartDispatch();

  // If the cart is empty, display a message
  if (cartState.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-white text-center fs-3">
          The Cart is Empty!
        </div>
      </div>
    );
  }

  // Function to handle the checkout process
  const handleCheckOut = async () => {
    try {
      // Get user email from local storage
      let userEmail = localStorage.getItem("userEmail");

      // Get user email from local storage
      const response = await axios.post(
        "http://localhost:3001/api/auth/orderData",
        {
          order_data: cartState,
          email: userEmail,
          order_date: new Date().toDateString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // If the checkout is successful, empty the cart
      if (response.status === 200) {
        cartDispatch({ type: "EMPTY_CART" });
      } else {
        console.error("Checkout failed:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Calculate total price of items in the cart
  let totalPrice = cartState.reduce((total, food) => total + food.price, 0);

  return (
    <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
      {/* Cart Table */}
      <table className="table table-hover ">
        <thead className=" text-success fs-4">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Option</th>
            <th scope="col">Amount</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {/* Map through cart items and display in table rows */}
          {cartState.map((food, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{food.name}</td>
              <td>{food.quantity}</td>
              <td>{food.size}</td>
              <td>{food.price}</td>
              <td>
                {/* Delete button for removing an item from the cart */}
                <button type="button" className="btn p-0">
                  <MdDeleteForever
                    onClick={() => {
                      cartDispatch({ type: "REMOVE_FROM_CART", index: index });
                    }}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display total price */}
      <div>
        <h1 className="fs-2 text-white">Total Price: {totalPrice}/-</h1>
      </div>
      
      {/* Checkout button */}
      <div>
        <button className="btn bg-success m-5" onClick={handleCheckOut}>
          Check Out
        </button>
      </div>
    </div>
  );
};

export default Cart;
