import mysql from 'mysql'

export const db = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    database: "social"
})