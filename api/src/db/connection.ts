import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'users',
  port: 3020,
  connectionLimit: 10,
})

export default pool
