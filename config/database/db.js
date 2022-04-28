import mysql from "mysql2/promise";
import "dotenv/config";
import express from 'express';

const app = express();
const pool = mysql.createPool({
    connectionLimit: 10000,
    host: "localhost",
    user: "root",
    password: "",
    database: "blog_3wa",
});

pool.getConnection().then(res => {
    console.log(`Bien connecté à la BDD --> ${res.config.database}`);
})

export default pool;