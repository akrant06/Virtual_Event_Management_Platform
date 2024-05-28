const express = require("express");
const eventManagerRouter = require("express").Router();
const URLQueryParams = require("url-search-params");
eventManagerRouter.use(express.json());

// Dummy data
let events = [];

// Middleware
eventManagerRouter.use(bodyParser.json());

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
eventManagerRouter.post("/events", authenticate, (req, res) => {
  const { date, time, description, participants } = req.body;
  const event = { date, time, description, participants };
  events.push(event);
  res.status(201).send(event);
});

eventManagerRouter.get("/events", authenticate, (req, res) => {
  res.status(200).send(events);
});

eventManagerRouter.get("/events/:eventId", authenticate, (req, res) => {
  const eventId = parseInt(req.params.eventId);
  const event = events.find((event) => event.id === eventId);
  if (!event) {
    res.status(404).send("Event not found");
  } else {
    res.status(200).send(event);
  }
});

eventManagerRouter.put("/events/:eventId", authenticate, (req, res) => {
  const eventId = parseInt(req.params.eventId);
  const { date, time, description, participants } = req.body;
  const index = events.findIndex((event) => event.id === eventId);
  if (index === -1) {
    res.status(404).send("Event not found");
  } else {
    events[index] = { id: eventId, date, time, description, participants };
    res.status(200).send(events[index]);
  }
});

eventManagerRouter.delete("/events/:eventId", authenticate, (req, res) => {
  const eventId = parseInt(req.params.eventId);
  const index = events.findIndex((event) => event.id === eventId);
  if (index === -1) {
    res.status(404).send("Event not found");
  } else {
    events.splice(index, 1);
    res.status(204).send();
  }
});

module.exports = eventManagerRouter;
