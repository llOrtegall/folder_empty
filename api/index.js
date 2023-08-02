import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "./models/User.js";
import cors from "cors";
import cookieParse from "cookie-parser"



dotenv.config();
mongoose.connect(process.env.MONGO_URL);
const jwtSecret = process.env.JWT_SECRET;

const app = express();
app.use(express.json());
app.use(cookieParse());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));

app.get('/test/', (req, res) => {
  res.json('test ok');
})

app.get('/profile', (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) throw err;
      res.json({ userData });
    });
  } else {
    res.status(401).json('no token sorry')
  }
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const createUser = await User.create({ username, password });
    jwt.sign({ userId: createUser._id, username }, jwtSecret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
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