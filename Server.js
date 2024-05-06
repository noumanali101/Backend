const express = require("express");
const mongoose = require("mongoose");
const connectMongoDB = require("./Db");

const { Schema } = mongoose;
const cors = require("cors");

const app = express();
const port = 5000;

// Connect to MongoDB using Mongoose
connectMongoDB();

// Middleware
app.use(cors());
app.use(express.json());

//Api routes
app.use("/", require("./Routes/Users"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
