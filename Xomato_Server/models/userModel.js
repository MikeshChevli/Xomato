// Importing mongoose module
import mongoose from "mongoose";

// Defining the schema for User
const userSchema = new mongoose.Schema({
  // name is a required field of type String
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  // gioLocation is a required field of type String
  gioLocation: {
    type: String,
    required: [true, "Location is required"],
  },
  // email is a required field of type String
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  // password is a required field of type String
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  // isAdmin is a field of type Boolean with a default value of false
  isAdmin: {
    type: Boolean,
    default: false,
  },
  // date is a field of type Date with a default value of the current date
  date: {
    type: Date,
    default: Date.now,
  },
  // age is an optional field of type Number
  age: {
    type: Number,
  },
  // gender is an optional field of type String
  gender: {
    type: String,
  },
});

// Creating a model from the User schema
// The model will be used to create and read documents from the database
const UserModel = mongoose.model("User", userSchema);

// Exporting the UserModel
export default UserModel;
