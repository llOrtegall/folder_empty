import pool from './connection'
import { ResultSetHeader } from 'mysql2'

export const SelectQuery = async <T>(queryString: string): Promise<T[]> => {
  const [results] = await pool.execute(queryString) // TODO: desctructure the results
  return results as T[];
}

//  TODO: INSERT, UPDATE, DELETE
export const ModifyQuery = async (queryString: string): Promise<ResultSetHeader> => {
  const [results] = await pool.execute(queryString)
  return results as ResultSetHeader
}
  