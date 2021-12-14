import mysql from 'mysql'
import { dbConfig } from '../config/db.config'

// Create connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.password,
  database: dbConfig.DB,
})

// // open the MySQL connection
connection.connect((error) => {
  if (error) throw error
  console.log('Successfully connected to the database')
})

export { connection as sql }
