const pool = require('../Database/db');

const AddUser =(req, res) => {
    const { user_name, user_password } = req.body;
    const insertSt = 'INSERT INTO USERS_DATA (user_name, user_password) VALUES ($1, $2) RETURNING *;';
    pool.query(insertSt, [user_name, user_password])
        .then(newUser => {
            console.log("User added:", newUser.rows[0]);
            res.json(newUser.rows[0]);
        })
        .catch(error => {
            console.error(error);
        });
}

const DisplayData = (req, res) => {
    const selectSt = `SELECT * FROM USERS_DATA;`;
    pool.query(selectSt)
        .then((result => res.json(result.rows)))
        .catch((error) => {
            console.log(error);
        })
}

const DeleteUser = (req, res) => {
    const { id } = req.params;
    const deleteSt = 'DELETE FROM users_data WHERE id = $1;';
    pool.query(deleteSt, [id])
        .then(() => res.send('User deleted'))
        .catch(error => {
            console.error(error);
        });
};

const UpdateUser = (req, res) => {
    const { id } = req.params;
    console.log("===id===", id)
    const { user_name, user_password } = req.body;
    const UpdateSt = 'UPDATE users_data SET user_name = $1, user_password = $2 WHERE id = $3 RETURNING *;';
    pool.query(UpdateSt, [user_name, user_password, id])
        .then(result => res.json(result.rows[0]))
        .catch(error => {
            console.error(error);
        });
}

module.exports ={
    AddUser , DisplayData ,DeleteUser ,UpdateUser 
};