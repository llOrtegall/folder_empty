const express = require('express');

const PORT = 4040
const app = express();

app.get('/test', (req, res) => {
  res.json('test ok ¡¡¡')
})


console.log('Inicializado en el servidor: ' + PORT);
app.listen(PORT);