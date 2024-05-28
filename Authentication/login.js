const express = require("express");
const loginRouter = require("express").Router();
const URLQueryParams = require("url-search-params");
loginRouter.use(express.json());

// Dummy user database
const users = [];

// Login route
loginRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check if the provided password matches the hashed password
  if (await bcrypt.compare(password, user.password)) {
    // Create a JWT token
    const token = jwt.sign(
      { username: user.username },
      process.env.SECRET_CODE
    );
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = loginRouter;
