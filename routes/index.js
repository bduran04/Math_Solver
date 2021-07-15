const router = require('express').Router();
const userRoutes = require('./users.js');

router.use('/user', userRoutes);
module.exports = router;
