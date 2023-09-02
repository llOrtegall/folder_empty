import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './Models/User.js';

dotenv.config();

// TODO: conexción con la base de datos
mongoose.connect(process.env.MONGO_URL);

const app = express();
const PORT = process.env.PORT ?? 4040;

app.get('/test', (req, res) => {
  res.json('Test Ok');
});

// TODO: Ruta para crear un usuario y loguearlo automáticamente
app.post('/registro', async (req, res) => {
  const { usuario, contrasena } = req.body;
  await User.create({ usuario, contrasena });
  res.json('');
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
