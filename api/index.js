const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');

dotenv.config();
// ** CONECTA CON BASE DE DATOS
mongoose.connect(process.env.MONGO_URL);
const jwtSecret = process.env.JWT_SECRET;

const PORT = 4040
const app = express();

app.get('/test', (req, res) => {
  res.json('test ok ¡¡¡')
})

app.post('/register', async (req, res) => {

  // ?? CREANDO EL USUARIO
  const { username, password } = req.body;
  const createUser = await User.create({ username, password });

  //* Creamos el TOKEN
  jwt.sign({ userId: createUser._id }, jwtSecret, (err, token) => {
    if (err) throw err
    res.cookie('token', token).status(201).json('Ok User Create')
  })
})

console.log('Inicializado en el servidor: ' + PORT);
app.listen(PORT);

