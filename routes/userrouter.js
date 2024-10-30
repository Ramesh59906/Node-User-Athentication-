// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const { getall_users, register,  login, updateuser,deleteuser } = require('../controllers/itemLogReg');

router.get('/api/getall_users', getall_users);
router.post('/api/register', register);
router.post('/api/login',  login);
router.put('/api/update/:id', updateuser);
router.delete('/api/delete/:id', deleteuser);

module.exports = router;