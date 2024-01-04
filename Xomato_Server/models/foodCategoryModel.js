// Importing mongoose module
import mongoose from "mongoose";

// Defining the schema for Food Category
const foodCategorySchema = new mongoose.Schema({
  // CategoryName is a required field of type String
  CategoryName: { type: String, required: true },
});

// Creating a model from the schema
const FoodCategoryModel = mongoose.model("Food_Category", foodCategorySchema);

// Exporting the FoodCategoryModel
export default FoodCategoryModel;
