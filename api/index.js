import express from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import { UserModel } from './models/User.js'
import cors from 'cors'
import jwt from 'jsonwebtoken'

config()
connect(process.env.MONGO_URL)
const jwtSecret = process.env.JWT_SECRET

const app = express()
app.use(express.json())

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))

app.get('/test', (req, res) => {
  res.json('test ok')
})

app.post('/register', async (req, res) => {
  const { usename, password } = req.body
  try {
    const createdUser = await UserModel.create({ usename, password })
    // TODO: creamos el token
    jwt.sign({ UserId: createdUser._id }, jwtSecret, {}, (err, token) => {
      if (err) throw err
      res.cookie('token', token).status(201).json('ok')
    })
  } catch (error) {
    if (error) throw error
    res.status(500).json('error')
  }
})

app.listen(4040)
