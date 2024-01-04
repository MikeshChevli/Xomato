// Importing React
import React from "react";

// Creating context for cart state and dispatch
const CartStateContext = React.createContext();
const CartDispatchContext = React.createContext();

// Reducer function to handle cart actions
const reducer = (state, action) => {
  switch (action.type) {
    // Case to add a new item to the cart
    case "ADD_TO_CART":
      return [
        ...state,
        {
          _id: action.id,
          name: action.name,
          quantity: action.quantity,
          size: action.size,
          price: action.price,
          img: action.img,
          category: action.category,
        },
      ];
    // Case to update quantity and price of an existing item
    case "UPDATE_CART":
      let arr = [...state];
      arr.find((food, index) => {
        if (food._id === action.id) {
          arr[index] = {
            ...food,
            quantity: parseInt(action.quantity) + food.quantity,
            price: action.price + food.price,
          };
        }
        return arr;
      });
      return arr;
    // Case to remove an item from the cart based on its index
    case "REMOVE_FROM_CART":
      return state.filter((_, index) => index !== action.index);
    // Case to clear the entire cart
    case "EMPTY_CART":
      return [];
    // Default case to return the current state
    default:
      return state;
  }
};

// CartProvider component to provide cart state and dispatch to children components
export const CartProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Custom hooks to use cart state and dispatch
export const useCartState = () => React.useContext(CartStateContext);
export const useCartDispatch = () => React.useContext(CartDispatchContext);
