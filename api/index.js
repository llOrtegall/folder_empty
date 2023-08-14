const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
// ** CONECTA CON BASE DE DATOS
mongoose.connect(process.env.MONGO_URL)

const PORT = 4040
const app = express();

app.get('/test', (req, res) => {
  res.json('test ok ¡¡¡')
})

app.post('/register', (req, res) => {

})

console.log('Inicializado en el servidor: ' + PORT);
app.listen(PORT);