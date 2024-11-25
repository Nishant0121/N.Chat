import path from "path";
import express from "express";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";

import authRouter from "./router/auth.router.js";
import messageRouter from "./router/message.router.js";
import userRouter from "./router/user.router.js";
import cors from "cors";
import connectDB from "./db/mongo.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "https://n-chat-sable.vercel.app", // Replace with your frontend's actual origin
  })
);

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/user", userRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
