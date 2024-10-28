import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});
import cookieParser from "cookie-parser";
import UserRoute from "./routes/UserRoute.js";
import EventRoute from "./routes/EventRoute.js";
import cors from "cors";
const app = express();
const Port = process.env.port || 5000;
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/user", UserRoute);
app.use("/api/event", EventRoute);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(Port, () => {
  console.log(`Server listening on port:${Port}`);
});
