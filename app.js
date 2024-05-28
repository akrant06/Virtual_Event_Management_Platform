const express = require("express");
const jwt = require("jsonwebtoken");
const routes = require("express").Router();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const env = require("dotenv").config("../.env");
const app = express();

// Middleware for parsing JSON data
app.use(bodyParser.json());

const PORT = 3000;

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
