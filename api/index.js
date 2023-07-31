const express = require('express');
const dotennv = require('dotenv')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

dotennv.config();
mongoose.connect(process.env.MONGO_URL);
const jwtSecret = process.env.JWT_SECRET;

const app = express();

app.get('/test/', (req, res) => {
  res.json('test ok');
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const createUser = await User.create({ username, password });
  jwt.sign({ userId: createUser._id }, jwtSecret, (err, token) => {
    if (err) throw err;
    res.cookie('token', token).status(201).json('ok');
  });
});

app.listen(4000);

// 