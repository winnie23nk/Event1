import express from "express";
import isAuthenticated from "../config/Auth.js";
import {
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
  getEventById,
} from "../controllers/EventController.js";
const router = express.Router();
router.get("/getEvents", isAuthenticated, getEvents);
router.post("/createEvent", isAuthenticated, createEvent);
router.delete("/deleteEvent/:id", isAuthenticated, deleteEvent);
router.put("/updateEvent/:id", isAuthenticated, updateEvent);
router.get("/getEventById/:id", isAuthenticated, getEventById);

export default router;
