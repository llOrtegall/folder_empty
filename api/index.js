import express from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import { UserModel } from './models/User.JS'
import jwt from 'jsonwebtoken'

config()
connect(process.env.MONGO_URL)
const jwtSecret = process.env.JWT_SECRET

const app = express()

app.get('/test', (req, res) => {
  res.json('test ok')
})

app.post('/resgister', async (req, res) => {
  const { usename, password } = req.body
  const createUser = await UserModel.create({ usename, password })

  // TODO: creamos el token
  jwt.sign({ UserId: createUser._id }, jwtSecret, (err, token) => {
    if (err) throw err
    res.cookie('token', token).status(201).json('ok')
  })
})

app.listen(4040)
