// Importing Router from express
import { Router } from "express";

// Importing controllers from userControl.js
import {
  getFoodItemsController,
  loginController,
  registerController,
} from "../controllers/userControl.js";

// Creating a new router
const router = Router();

// Defining routes

// Route for user login
// This route accepts POST requests and uses the loginController function to authenticate users
router.post("/login", loginController);

// Route for user registration
// This route accepts POST requests and uses the registerController function to register new users
router.post("/register", registerController);

// Route for getting all food items
// This route accepts GET requests and uses the getFoodItemsController function to retrieve all food items
router.get("/getAllFoodItems", getFoodItemsController);

// Exporting the router
export default router;
