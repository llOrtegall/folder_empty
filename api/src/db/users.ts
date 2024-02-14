import type { RowDataPacket } from 'mysql2'
import { SelectQuery } from './queryUtils'

export interface IUserRow extends RowDataPacket {
  id: number
  nombre: string
  correo: string
}

// * Good practice to put into an api  endpoint !
export function getAll(){
  return SelectQuery<IUserRow>('SELECT * FROM usuarios')
}

export function getById(id: number){
  return SelectQuery<IUserRow>(`SELECT * FROM usuarios WHERE id = ${id}`)
}