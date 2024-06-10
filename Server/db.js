const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost' ,
    password: 'Inno@104',
    port: 5432, 
    database: "db"
});

// const createTable = `CREATE TABLE USERS_INFO (
// 	id SERIAL PRIMARY KEY ,
// 	user_name VARCHAR(45) UNIQUE NOT NULL ,
// 	user_password VARCHAR(45) UNIQUE NOT NULL
// );`

// pool.query(createTable).then((Response) => {
//     console.log("Table created");
//     console.log(response);
// })
// .catch((error) => {
//     console.log(error);
// })

module.exports = pool;


