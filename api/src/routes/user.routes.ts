import { Router } from 'express'
import db from '../db' // cuando importamos un directorio, se importa el archivo index.ts por defecto

export const UsersRoutes = Router();

// TODO: Get /api/users/:id
UsersRoutes.get('/user/:id', async (req: any, res: any) => {
  try {
    const id = parseInt(req.params.id)
    const user = await db.users.getById(id)
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ error })
  }
})

// TODO: GET /api/users
UsersRoutes.get('/users', async (req: any, res: any) => {
  try {
    const users = await db.users.getAll()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({ error })
  }
})
