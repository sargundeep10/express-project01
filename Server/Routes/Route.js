const express = require("express");
const { DeleteUser , UpdateUser , DisplayData , AddUser} = require('../Controllers/User');

const router = express.Router();

router.post('/user', AddUser);

router.patch('/user/:id', UpdateUser);

router.delete('/user/:id' , DeleteUser);

router.get('/user/data', DisplayData);

module.exports = router;
