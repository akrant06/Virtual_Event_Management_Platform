const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Dummy data
let events = [];
let eventIdCounter = 1;

// Middleware
app.use(bodyParser.json());

// Authentication middleware
function authenticate(req, res, next) {
  // Dummy authentication logic
  const { username, password } = req.headers;
  if (username === "organizer" && password === "password") {
    next(); // Authorized
  } else {
    res.status(401).send("Unauthorized");
  }
}

// Routes

// Create event
app.post("/events", authenticate, (req, res) => {
  const { date, time, description } = req.body;
  const event = {
    id: eventIdCounter++,
    date,
    time,
    description,
    participants: [],
  };
  events.push(event);
  res.status(201).send(event);
});

// Get all events
app.get("/events", authenticate, (req, res) => {
  res.status(200).send(events);
});

// Get event by ID
app.get("/events/:eventId", authenticate, (req, res) => {
  const eventId = parseInt(req.params.eventId);
  const event = events.find((event) => event.id === eventId);
  if (!event) {
    res.status(404).send("Event not found");
  } else {
    res.status(200).send(event);
  }
});

// Update event by ID
app.put("/events/:eventId", authenticate, (req, res) => {
  const eventId = parseInt(req.params.eventId);
  const { date, time, description } = req.body;
  const index = events.findIndex((event) => event.id === eventId);
  if (index === -1) {
    res.status(404).send("Event not found");
  } else {
    events[index] = {
      id: eventId,
      date,
      time,
      description,
      participants: events[index].participants,
    };
    res.status(200).send(events[index]);
  }
});

// Delete event by ID
app.delete("/events/:eventId", authenticate, (req, res) => {
  const eventId = parseInt(req.params.eventId);
  const index = events.findIndex((event) => event.id === eventId);
  if (index === -1) {
    res.status(404).send("Event not found");
  } else {
    events.splice(index, 1);
    res.status(204).send();
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
