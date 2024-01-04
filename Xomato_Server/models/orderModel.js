// Importing mongoose module
import mongoose from "mongoose";

// Defining the schema for Order
const OrderSchema = new mongoose.Schema({
    // email is a required field of type String and must be unique
    email: {
        type: String,
        required: true,
        unique: true
    },
    // order_data is a required field of type Array
    order_data: {
        type: Array,
        required: true,
    },
});

// Creating a model from the Order schema
// The model will be used to create and read documents from the database
const orderModel = mongoose.model("Orders", OrderSchema);

// Exporting the order model
export default orderModel;