const express = require('express');
const router = express.Router();

const templates = require('./templates');

router.use('/templates', templates);

module.exports = router; 