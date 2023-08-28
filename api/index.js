import express from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import { UserModel } from './models/User.js'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { WebSocketServer } from 'ws'
import { Message } from './models/Messaje.js'

config()
connect(process.env.MONGO_URL)
const jwtSecret = process.env.JWT_SECRET
const bcryptSalt = bcrypt.genSaltSync(10)

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

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  const foundUser = await UserModel.findOne({ username })
  if (foundUser) {
    const passOk = bcrypt.compareSync(password, foundUser.password)
    if (passOk) {
      jwt.sign({ UserId: foundUser._id, username }, jwtSecret, {},
        (_err, token) => {
          res.cookie('token', token, { sameSite: 'none', secure: true }).json({
            id: foundUser._id
          })
        })
    }
  }
})

// TODO: para realizar el registro de los usuarios
app.post('/register', async (req, res) => {
  const { username, password } = req.body
  try {
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt)
    const createdUser = await UserModel.create({
      username,
      password: hashedPassword
    })
    // TODO: creamos el token
    jwt.sign({ userId: createdUser._id, username }, jwtSecret, {}, (err, token) => {
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

const server = app.listen(4040)

// TODO: Crearemos el WebSocketServer...

const wss = new WebSocketServer({ server })

wss.on('connection', (connection, req) => {
  const cookies = req.headers.cookie

  // TODO: Revisa que usuarios están conectados y me trae la informacion mediante el token
  if (cookies) {
    const tokenCookieString = cookies.split(';').find(str => str.startsWith('token='))
    if (tokenCookieString) {
      const token = tokenCookieString.split('=')[1]
      if (token) {
        jwt.verify(token, jwtSecret, {}, (err, userData) => {
          if (err) { throw err }
          const { userId, username } = userData
          connection.userId = userId
          connection.username = username
          // console.log(userData)
        })
      }
    }
  }

  connection.on('message', async (message) => {
    const messageData = JSON.parse(message.toString())
    const { recipient, text } = messageData
    if (recipient && text) {
      const messageDoc = await Message.create({
        sender: connection.userId,
        recipient,
        text
      });

      [...wss.clients]
        .filter(c => c.userId === recipient)
        .forEach(c => c.send(JSON.stringify({
          text,
          sender: connection.userId,
          recipient,
          id: messageDoc._id
        })))
    }
  });

  // TODO: para ver los usuarios conetados
  [...wss.clients].forEach(client => {
    client.send(JSON.stringify({
      online: [...wss.clients].map(c => ({ userId: c.userId, username: c.username }))
    }))
  })
})
