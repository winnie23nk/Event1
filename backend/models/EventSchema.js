import mongoose from "mongoose";
const eventSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
