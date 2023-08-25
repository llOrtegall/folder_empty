import express from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import { UserModel } from './models/User.js'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

config()
connect(process.env.MONGO_URL)
const jwtSecret = process.env.JWT_SECRET

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))

app.get('/test', (req, res) => {
  res.json('test ok')
})

app.get('/profile', (req, res) => {
  const token = req.cookies?.token
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) throw err
      res.json(userData)
    })
  } else {
    res.status(401).json('No Token Sorry')
  }
})

// TODO: para realizar el registro de los usuarios
app.post('/register', async (req, res) => {
  const { username, password } = req.body
  try {
    const createdUser = await UserModel.create({ username, password })
    // TODO: creamos el token
    jwt.sign({ UserId: createdUser._id, username }, jwtSecret, {}, (err, token) => {
      if (err) throw err
      res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
        id: createdUser._id
      })
    })
  } catch (error) {
    if (error) throw error
    res.status(500).json('error')
  }
})

app.listen(4040)
