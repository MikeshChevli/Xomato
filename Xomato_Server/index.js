// Importing necessary modules
import express from "express";
import mongoDb from "./config/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import path from "path";

// Creating an instance of the Express application
const app = express();

// Setting up a middleware function in Express that adds CORS (Cross-Origin Resource Sharing) headers to the response object
app.use(cors());

// A middleware function in Express that serves static files from the "public" directory
app.use(express.static("public"));

// A middleware function in Express that parses incoming requests with JSON payloads
app.use(express.json());

// Specifying that the `userRoutes` should be used for handling these requests
app.use("/api/user", userRoutes);

// Specifying that the `authRoutes` should be used for handling these requests
app.use("/api/auth", authRoutes);

// Serve the static files from the "build" directory
const buildPath = path.resolve("build");
app.use(express.static(buildPath));

// Handle the wildcard route by serving index.html
app.get("*", function (req, res) {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Calling a function named `mongoDb` which is responsible for establishing a connection to the MongoDB database
mongoDb();

// Setting the port number for the server to listen on port given in Environment variable file(.env) or port 8080
const PORT = process.env.PORT || 8080;

// Starting a server and listens for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Xomato backend app listening on port ${PORT}`);
});
