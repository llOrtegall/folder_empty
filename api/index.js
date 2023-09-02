import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 4040;

app.get('/test', (req, res) => {
  res.json('Test Ok');
})

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));