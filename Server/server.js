const express = require('express');
const cors = require('cors');
const port = 4000;
const route =require('./Routes/Route');


const app = express();
app.use(express.json());
app.use(cors());

app.use('/' , route);

app.listen(port, () => {
    console.log("Server is running");
});

