const mongoose = require("mongoose");

const connectMongoDB = async () => {
    try {
      await mongoose.connect(
        "mongodb+srv://alinaman1296:rR4Gra36egJQjZPP@users.fgay3ao.mongodb.net/Users",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      console.log("MongoDB connected");
    } catch (error) {
      console.error("Failed to connect to MongoDB", error);
    }
  };

    module.exports = connectMongoDB;