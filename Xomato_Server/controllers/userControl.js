// This file contains the logic for the user routes.
// The `import` statements are used to import external modules or files into the current JavaScript file.
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import FoodItemModel from "../models/foodItemModel.js";
import FoodCategoryModel from "../models/foodCategoryModel.js";

// This function handles the user registration.
export const registerController = async (req, res) => {
  try {
    // Check if a user with the provided email already exists in the database.
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(200)
        .send({ success: false, message: "User already exists" });
    }

    // Extract the password from the request body and validate it.
    const password = req.body.password;

    // Password validation criteria //
    // Check if the password provided by the user meets the required criteria.
    // const isPasswordValid =
    //   password.length >= 8 &&
    //   /[A-Z]/.test(password) &&
    //   /[a-z]/.test(password) &&
    //   /\d/.test(password) &&
    //   /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Check if the password provided by the user meets the required criteria.
    // if (!isPasswordValid) {
    //   return res.status(400).send({
    //     success: false,
    //     message:
    //       "Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, digits, and special characters.",
    //   });
    // }

    // Encrypt the user's password before saving it to the database.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    // Create a new instance of the UserModel and save it to the database.
    const newUser = new UserModel(req.body);
    await newUser.save();

    // Send a response to the client indicating that the user has been created successfully.
    res.status(201).send({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    // Handle any errors that may occur during the user registration process.
    console.error(error);
    // Send a response to the client indicating that an error occurred during the registration process.
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// This function handles the user login.
export const loginController = async (req, res) => {
  try {
    // Check if a user with the provided email exists in the database.
    const user = await UserModel.findOne({ email: req.body.email });

    // If the user is not found, return a response indicating that the user does not exist.
    if (!user) {
      return res
        .status(200)
        .send({ success: false, message: "User not found" });
    }

    // Compare the provided password with the hashed password stored in the database.
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    // Check if the provided password matches the hashed password stored in the database.
    if (!isMatch) {
      return res
        .status(200)
        .send({ success: false, message: "Invalid credentials" });
    }

    // Generate a JWT token for the user and send it back to the client.
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send a response to the client indicating that the user has been logged in successfully.
    res.status(200).send({ success: true, message: "Login Successful", token });
  } catch (error) {
    // Handle any errors that may occur during the user login process.
    console.error(error);
    // Send a response to the client indicating that an error occurred during the login process.
    res.status(500).send({
      success: false,
      message: `Error in Login Controller ${error.message}`,
    });
  }
};

// This function fetches the food items and food categories from the database.
export const getFoodItemsController = async (req, res) => {
  try {
    // Find all food items and food categories from the database.
    const foodItems = await FoodItemModel.find({});

    // Find all food categories from the database.
    const foodCategory = await FoodCategoryModel.find({});

    // Send a response to the client indicating that the food items and food categories have been fetched successfully.
    res.status(200).send({
      success: true,
      message: "Food Items Fetched Successfully",
      data: { foodItems, foodCategory },
    });
  } catch (error) {
    // Handle any errors that may occur during the fetching of food items and food categories.
    console.log(error);
    // Send a response to the client indicating that an error occurred during the fetching of food items and food categories.
    res.status(500).send({
      success: false,
      message: `Error in Getting Food Items: ${error.message}`,
    });
  }
};
