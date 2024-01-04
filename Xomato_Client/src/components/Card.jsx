import React, { useEffect, useRef, useState } from "react";
import { useCartState, useCartDispatch } from "../hooks/contextReducer";

const Card = (prop) => {
  // Ref to get the size dropdown value
  const sizeRef = useRef();

  // Access cart state and dispatch function from context
  let cartState = useCartState();
  const cartDispatch = useCartDispatch();

  // Extract options, size options, and food item from props
  const options = prop.options;
  let sizeOption = Object.keys(options);
  sizeOption.shift(1);
  const foodItem = prop.foodItem;

  // State for quantity, size, and total price
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(sizeOption[0] || "");

  /**
   * Function to handle adding item to cart.
   * It checks if the same food item with the same size already exists in the cart.
   * If it does, it updates the quantity and total price.
   * If it doesn't, it adds a new item to the cart.
   */
  const handleAddToCart = async () => {
    // Check if the same food item with the same size already exists in the cart
    const existingFood = cartState.find((item) => item._id === foodItem._id);

    if (existingFood) {
      if (existingFood.size === size) {
        // Update quantity and total price if the same size already exists
        await cartDispatch({
          type: "UPDATE_CART",
          id: foodItem._id,
          price: totalPrice,
          quantity,
        });
      } else {
        // Add a new item to the cart if the size is different
        await cartDispatch({
          type: "ADD_TO_CART",
          id: foodItem._id,
          name: foodItem.name,
          price: totalPrice,
          quantity,
          size,
          category: foodItem.category,
          img: foodItem.img,
        });
        console.log("Size is different, so simply ADD one more to the list");
      }
    } else {
      // Add a new item to the cart if it doesn't exist
      await cartDispatch({
        type: "ADD_TO_CART",
        id: foodItem._id,
        name: foodItem.name,
        price: totalPrice,
        quantity,
        size,
      });
    }
  };

  // Calculate total price based on quantity and selected size
  const totalPrice = Number(quantity * parseInt(options[size], 10));

  // Set initial size value using a useEffect hook
  useEffect(() => setSize(sizeRef.current.value), []);

  return (
    <div
      className="card mt-3"
      style={{
        width: "18rem",
        height: "350px",
      }}
    >
      {/* Food item image */}
      <img
        src={prop.foodItem.img}
        className="card-img-top"
        alt="..."
        style={{ maxHeight: "160px", objectFit: "fill" }}
      />
      <div className="card-body">
        {/* Food item name */}
        <h5 className="card-title">{prop.foodItem.name}</h5>
        <div className="container w-100">
          {/* Quantity dropdown */}
          <select
            className="m-2 h-100 rounded bg-success"
            onChange={(e) => setQuantity(e.target.value)}
          >
            {Array.from(Array(6), (_, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          {/* Size dropdown */}
          <select
            className="m-2 h-100 bg-success rounded"
            ref={sizeRef}
            onChange={(e) => setSize(e.target.value)}
          >
            {sizeOption.map((option, index) => {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
          {/* Total price */}
          <div className="fs-5 d-inline h-100">₹{totalPrice}/-</div>
        </div>
        <hr />
        {/* Add to cart button */}
        <button
          className="btn btn-success justify-content-center  m-2"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};
export default Card;
