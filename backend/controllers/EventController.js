import { Event } from "../models/EventSchema.js";
import { User } from "../models/UserSchema.js";

export const getEvents = async (req, res) => {
  const response = await Event.find();
  res.send(response);
};

export const createEvent = async (req, res) => {
  try {
    const { image, title, description, month, year, location } = req.body;
    const userId = req.user;
    if (!image || !title || !description || !month || !year || !location) {
      return res.status(401).json({
        message: "Fields are required.",
        success: false,
      });
    }
    const user = await User.findById(userId).select("-password");

    await Event.create({
      image,
      title,
      description,
      month,
      year,
      location,
      userId: userId,
      userDetails: user,
    });

    return res.status(201).json({
      message: "Event created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, error: error.message });
  }
};
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    await Event.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, title, description, month, year, location } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { image, title, description, month, year, location },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the event",
      error: error.message,
    });
  }
};
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};
