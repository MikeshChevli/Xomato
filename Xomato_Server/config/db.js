import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

/**
 * This function connects to the MongoDB database using the connection string provided in the environment variables.
 * It then fetches the 'food_items' collection and stores it in a global variable for easy access.
 * It also sets up error and disconnection handlers for the MongoDB connection.
 * @async
 * @function
 */
const mongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log(`MongoDB Connected: ${mongoose.connection.host}`);

    const fetchData = mongoose.connection.db.collection("food_items");
    const data = await fetchData.find({}).toArray();
    global.food_items = data;

    // Error handler for MongoDB connection
    mongoose.connection.on("error", (error) => {
      console.error(`MongoDB Connection Error: ${error}`);
    });

    // Disconnection handler for MongoDB connection
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB Disconnected");
    });
  } catch (error) {
    console.error(`MongoDb Server issue ${error}`);
  }
};

export default mongoDb;
