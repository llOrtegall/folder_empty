import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "./models/User.js";
import cors from "cors";



dotenv.config();
mongoose.connect(process.env.MONGO_URL);
const jwtSecret = process.env.JWT_SECRET;

const app = express();
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));

app.get('/test/', (req, res) => {
  res.json('test ok');
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const createUser = await User.create({ username, password });
    jwt.sign({ userId: createUser._id }, jwtSecret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token).status(201).json({
        id: createUser._id,
      });
    });
  } catch (err) {
    if (err) throw err;
    res.status(500).json('error');
  }
});

app.listen(4000);

// 