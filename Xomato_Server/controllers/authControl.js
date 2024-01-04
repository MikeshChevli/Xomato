// Importing the order model
import orderModel from "../models/orderModel.js";

// Controller for handling order data
export const orderDataController = async (req, res) => {
  try {
    // Extracting order data from the request body and adding the order date
    let data = [...req.body.order_data];
    data.unshift({ Order_date: req.body.order_date });

    // Finding the user with the given email
    let userId = await orderModel.findOne({ email: req.body.email });

    // If the user doesn't exist, create a new user with the given email and order data
    if (userId === null) {
      await orderModel.create({
        email: req.body.email,
        order_data: [data],
      });
    } else {
      // If the user exists, update the user's order data with the new order data
      await orderModel.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
    }
    // Sending a JSON response with a success message
    res.json({ success: true });
  } catch (error) {
    // Handling any errors that occur during the execution of the code
    console.error(error.message);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Controller for handling a user's order data
export const myOrderDataController = async (req, res) => {
  try {
    // Extracting the email from the request body
    const userEmail = req.body.email;

    // If the email is not provided in the request body, return an error message
    if (!userEmail) {
      return res
        .status(400)
        .json({ error: "Email is required in the request body." });
    }

    // Finding all orders for the given email
    const userOrders = await orderModel.find({ email: userEmail });

    // If no orders are found for the provided email, return an error message
    if (!userOrders || userOrders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for the provided email." });
    }
    // Sending a JSON response with the user's orders
    res.json({ orderData: userOrders });
  } catch (error) {
    // Handling any errors that occur during the execution of the code
    console.error(error.message);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
