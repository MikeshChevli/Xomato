// Importing Router from express
import { Router } from "express";
// Importing controllers from authControl.js
import { myOrderDataController, orderDataController } from "../controllers/authControl.js";

// Creating a new router
const router = Router();

// Route for posting order data
router.post("/orderData", orderDataController);

// Route for posting my order data
router.post("/myOrderData", myOrderDataController);

// Exporting the router
export default router;
