const express = require('express');
const dotennv = require('dotenv')
const mongoose = require('mongoose');

dotennv.config();
mongoose.connect(process.env.MONGO_URL);

const app = express();

app.get('/test/', (req, res) => {
  res.json('test ok');
})

app.post('/register', (req, res) => {

})

app.listen(4000);

// 