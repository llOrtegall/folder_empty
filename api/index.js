import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
mongoose.connect(process.env.MONGO_URL)

const app = express()

app.get('/test', (req, res) => {
  res.json('test ok')
})

app.post('/resgister', (req, res) => {

})

app.listen(4040)
