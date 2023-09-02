import expresss from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './Models/User.js';
import jwt from 'jsonwebtoken';
import cors from 'cors';

dotenv.config();

// TODO: conexción con la base de datos
mongoose.connect(process.env.MONGO_URL);
const jwtSecret = process.env.JWT_SECRET;

const app = expresss();
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));
const PORT = process.env.PORT ?? 4040;

app.get('/test', (req, res) => {
  res.json('Test Ok');
});

// TODO: Ruta para crear un usuario y loguearlo automáticamente
app.post('/registro', async (req, res) => {
  const { usuario, contrasena } = req.body;
  const createUser = await User.create({ usuario, contrasena });

  // !! Creamos el TOKEN con JWT
  jwt.sign({ userId: createUser._id }, jwtSecret, (err, token) => {
    if (err) throw err;
    res.cookie('token', token).status(201).json('ok user created');
  });
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
