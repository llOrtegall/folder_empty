import express from 'express'
import { UsersRoutes } from './routes/user.routes'

const PORT = 3000
const app = express()

app.use(express.json())
app.use('/api', UsersRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})