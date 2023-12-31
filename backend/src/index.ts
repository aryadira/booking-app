import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";

import "dotenv/config";

import authRoutes from "./routes/auth-route";
import userRoutes from "./routes/user-route";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(2703, () => {
  console.log(`Server running on port:2703...`);
});
