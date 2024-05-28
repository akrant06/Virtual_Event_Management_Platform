const express = require("express");
const userRegistrationRouter = require("express").Router();
const URLQueryParams = require("url-search-params");
userRegistrationRouter.use(express.json());

// Register a user
userRegistrationRouter.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user to the database (in a real app, you would use a database like MongoDB)
  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: "User registered successfully" });
});

module.exports = userRegistrationRouter;
