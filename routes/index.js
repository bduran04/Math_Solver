const router = require('express').Router();
const userRoutes = require('./users.js');
const studyGuideRoutes = require('./study-guides.js');

router.use('/user', userRoutes);
router.use('/study-guide', studyGuideRoutes);


module.exports = router;
