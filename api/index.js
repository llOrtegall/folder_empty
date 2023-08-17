const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const cors = require('cors');

dotenv.config();
// ** CONECTA CON BASE DE DATOS
mongoose.connect(process.env.MONGO_URL);
const jwtSecret = process.env.JWT_SECRET;

const PORT = 4040
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));

app.get('/test', (req, res) => {
  res.json('test ok ¡¡¡')
})

app.get('/profile', (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) throw err;
      res.json(userData)
    })
  } else {
    res.status(401).json('no token found')
  }
});

app.post('/register', async (req, res) => {
  // ?? CREANDO EL USUARIO
  const { username, password } = req.body;
  try {
    const createUser = await User.create({ username, password });
    //* Creamos el TOKEN
    jwt.sign({ userId: createUser._id, username }, jwtSecret, {}, (err, token) => {
      if (err) throw err
      res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
        id: createUser._id,
      })
    })
  } catch (err) {
    if (err) throw err
    res.status(500).json('error')
  }
})

console.log('Inicializado en el servidor: ' + PORT);
app.listen(PORT);

