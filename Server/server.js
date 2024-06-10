const express = require('express');
const pool = require('./db');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/addUser', (req, res) => {
    const { user_name, user_password } = req.body;

    const insertSt = `INSERT INTO USERS_INFO (user_name, user_password) VALUES ($1, $2) RETURNING *;`;

    pool.query(insertSt, [user_name, user_password])
        .then(newUser => {
            console.log("User added:", newUser.rows[0]);
            res.json(newUser.rows[0]);
        })
        .catch(error => {
            console.error(error);
        });
});


const port = 4000;
app.listen(port, () => {
    console.log("Server is running");
});



// const express = require('express');
// const pool = require('./db');

// const app = express();
// const cors = require('cors');

// app.use(express.json());
// app.use(cors());


// app.post('/addUser' , (req,res) => {
//     const user_name = req.body["user_name"];
//     const user_password = req.body["user_password"];

//     res.send("Response added" + req.body)

//     const insertSt = `INSERT INTO USERS_INFO (user_name ,user_password) VALUES ('${user_name}' , '${user_password}');`

//     pool.query(insertSt).then((response) => {
//         console.log("insertion done");
//         console.log(response);
//     })
//     .catch((error) => {
//         console.log(error);
//     })
// })

// // app.get("/api", (req, res) => {
// //     res.json({ "users": ["one", "two", "three"] });
// //   });

// // app.get('/message', (req, res) => {
// //     res.json({ message: "Hello from server!" });
// // });

// app.listen(4000 , () => {
//     console.log("Server is running")
// });

