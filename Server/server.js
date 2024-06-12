const express = require('express');
const pool = require('./db');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/user', (req, res) => {
    const { user_name, user_password } = req.body;
    const insertSt = `INSERT INTO USERS_DATA (user_name, user_password) VALUES ($1, $2) RETURNING *;`;
    pool.query(insertSt, [user_name, user_password])
        .then(newUser => {
            console.log("User added:", newUser.rows[0]);
            res.json(newUser.rows[0]);
        })
        .catch(error => {
            console.error(error);
        });
});

app.patch('/user/:id', (req, res) => {
    const { id } = req.params;
    console.log("===id===", id)
    const { user_name, user_password } = req.body;
    const UpdateSt = 'UPDATE users_data SET user_name = $1, user_password = $2 WHERE id = $3 RETURNING *;';
    pool.query(UpdateSt, [user_name, user_password, id])
        .then(result => res.json(result.rows[0]))
        .catch(error => {
            console.error(error);
        });
})

app.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    const deleteSt = 'DELETE FROM users_data WHERE id = $1;';
    pool.query(deleteSt, [id])
        .then(() => res.send('User deleted'))
        .catch(error => {
            console.error(error);
        });
});

app.get('/fetched-data', (req, res) => {
    const selectSt = `SELECT * FROM USERS_DATA;`;
    pool.query(selectSt)
        .then((result => res.json(result.rows)))
        .catch((error) => {
            console.log(error);
        })
});

const port = 4000;
app.listen(port, () => {
    console.log("Server is running");
});

