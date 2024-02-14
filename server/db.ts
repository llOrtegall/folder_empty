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

const SelectQuery = async <T>(queryString: string): Promise<T[]> => {
  const [results] = await pool.execute(queryString) // TODO: desctructure the results
  return results as T[];
}

SelectQuery<IUserRow>('SELECT * FROM usuarios')
  .then((users) => { console.log(users) })
  .catch((err) => { console.error(err) })

