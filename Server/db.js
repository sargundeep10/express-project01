const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost' ,
    password: 'Inno@104',
    port: 5432, 
    database: "db"
});

module.exports = pool;


