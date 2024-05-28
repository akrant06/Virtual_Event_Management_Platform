const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Dummy data
let events = [];
let users = [];

// Middleware
app.use(bodyParser.json());

// Authentication middleware
function authenticate(req, res, next) {
  // Dummy authentication logic
  const { username, password } = req.headers;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    req.user = user; // Attach user object to request
    next(); // Authorized
  } else {
    res.status(401).send("Unauthorized");
  }
}

// Routes

// User registration
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    res.status(400).send("User already exists");
  } else {
    const newUser = { username, password };
    users.push(newUser);
    res.status(201).send("User registered successfully");
  }
});

// POST endpoint to register for an event
app.post("/events/:eventId/register", (req, res) => {
  const eventId = parseInt(req.params.eventId);
  const event = events.find((event) => event.id === eventId);
  if (!event) {
    res.status(404).send("Event not found");
  } else {
    const { username } = req.body;
    if (!event.participants.includes(username)) {
      event.participants.push(username);
      res.status(200).send("Registration successful");
    } else {
      res.status(400).send("User already registered for this event");
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
