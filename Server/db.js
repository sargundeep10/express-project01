const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost' ,
    password: 'Inno@104',
    port: 5432, 
    database: "db"
});

// pool.query('DELETE FROM USERS_DATA ;')
// .then((response) => console.log(response) )
// .catch((error) => {
//     console.error(error);
// })

// pool.query('ALTER SEQUENCE USERS_DATA_ID_SEQ RESTART WITH 1;')
// .then((response) => console.log(response))
// .catch((error ) => console.log(error));

module.exports = pool;


