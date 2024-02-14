import mysql from 'mysql2/promise'
import type { ResultSetHeader, RowDataPacket } from 'mysql2'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'users',
  port: 3020,
  connectionLimit: 10,
})

interface IUserRow extends RowDataPacket {
  id: number
  nombre: string
  correo: string
}

// async function SelectQuery<T>(queryString: string): Promise<T[]> {
//   const [results] = await pool.execute(queryString) // TODO: desctructure the results
//   return results as T[];
// }

// SELECT * FROM usuarios
const SelectQuery = async <T>(queryString: string): Promise<T[]> => {
  const [results] = await pool.execute(queryString) // TODO: desctructure the results
  return results as T[];
}

//  TODO: INSERT, UPDATE, DELETE
const ModifyQuery = async (queryString: string): Promise<ResultSetHeader> => {
  const [results] = await pool.execute(queryString)
  return results as ResultSetHeader
}
  
// ModifyQuery('INSERT INTO usuarios (nombre, correo) VALUES ("Ivan Ortega", "IvanOrtega@example.com")')
//   .then((result) => console.log(result))
//   .catch((err) => console.error(err))


// SelectQuery<IUserRow>('SELECT * FROM usuarios')
//   .then((users) => { 
//     users.forEach((user) => {
//       const { id, nombre, correo } = user
//       console.log(`id: ${id}, nombre: ${nombre}, correo: ${correo}`)
//     })
//    })
//   .catch((err) => { console.error(err) })

// Good practice to put into an api  endpoint !
function getAllUser(){
  return SelectQuery<IUserRow>('SELECT * FROM usuarios')
}

getAllUser()
  .then((users) => {
    users.forEach((user) => {
      const { id, nombre, correo } = user
      console.log(`id: ${id}, nombre: ${nombre}, correo: ${correo}`)
    })
  }).catch((err) => {console.log(err)});