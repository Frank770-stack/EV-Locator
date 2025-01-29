import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";

import chargeRoutes from "./routes/chargeRoutes.js";

import { connectDB } from "./config/db.js";
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

//MIDDLEWARE

app.use(express.json());
app.use(cookieParser());
//ROUTES
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", chargeRoutes);
//START SERVER
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
