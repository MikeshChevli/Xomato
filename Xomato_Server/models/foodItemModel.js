// Importing mongoose module
import mongoose from "mongoose";

// Defining the schema for Food Item
const foodItemSchema = new mongoose.Schema({
  // CategoryName is a required field of type String
  CategoryName: {
    type: String,
    required: true,
  },
  // Name is a required field of type String
  name: {
    type: String,
    required: true,
  },
  // Img is an optional field of type String for storing image URL
  img: {
    type: String,
  },
  // Options is an array of objects with half and full as optional fields of type String
  options: [
    {
      half: {
        type: String,
      },
      full: {
        type: String,
      },
    },
  ],
  // Description is an optional field of type String
  description: {
    type: String,
  },
});

// Creating a model from the food item schema
const FoodItemModel = mongoose.model("Food_Item", foodItemSchema);

// Exporting the Food Item Model
export default FoodItemModel;
