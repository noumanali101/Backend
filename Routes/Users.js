const routes = require("express").Router();
const express = require("express");
const Users = require("../Models/Users");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// Middleware
routes.use(express.json());
routes.use(express.urlencoded({ extended: true }));

// ... rest of the code ...
//Auth All Users
routes.get("/Auth", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await Users.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).send("User not found.");
    }
    bcrypt.compare(password, existingUser.password, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("An error occurred while logging in.");
      }
      if (!result) {
        return res.status(400).send("Invalid password.");
      }
      return res.send("User logged in successfully.");
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("An error occurred while logging in.");
  }

  // Check if the password is correct
});
//Create New User
routes.post("/createaccount", async (req, res) => {
  const { name, email, reTypePassword } = req.body;
  let { password } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  // Check if passwords match
  if (password !== reTypePassword) {
    return res.status(400).send("Passwords do not match.");
  }
  let userPassword = password;
  bcrypt.hash(userPassword, salt, (err, hash) => {
    if (err) {
      // Handle error
      return;
    }

    // Hashing successful, 'hash' contains the hashed password
    console.log("Hashed password:", hash);
    userPassword = hash;
    return userPassword;
  });

  try {
    // Check if user already exists
    const existingUser = await Users.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send("User already exists.");
    }
    password = userPassword;
    console.log(password);
    // Create a new user if not existing
    const newUser = new Users({
      name,
      email,
      password,
    });

    // Save the new user
    const user = await newUser.save();
    console.log(user); // Output the saved user to the console
    res.send("User created successfully."); // Send a success message
  } catch (err) {
    console.log(err); // Output the error to the console
    res.status(500).send("An error occurred while creating the user.");
  }
});
//Read All Users
routes.get("/users", async (req, res) => {
  try {
    const users = await Users.find();
    updatedUsers = users.map((user) => {
      return {
        name: user.name,
        email: user.email,
      };
    });
    res.send(updatedUsers);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while fetching users.");
  }
});
//Update User
routes.put("/updateuser", async (req, res) => {
  const { email, name } = req.body;
  try {
    const user = await Users.findOneAndUpdate({ email: email }, { name: name });
     // Find the user by email and update the name
     res.send("User updated successfully.");
  } catch (err) {
    console.log(err);
  }
});
//JWT Tokken

module.exports = routes;
