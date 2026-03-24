import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    user: process.env.dbUser,
    database: process.env.dbName,
    password: process.env.dbPassword,
    host: process.env.dbHost,
    port: Number(process.env.dbPort),
    ssl: {rejectUnauthorized: false}

});

export default pool;