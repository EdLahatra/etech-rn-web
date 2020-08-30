const express = require('express');

const { login } = require('../controllers/users');

const router = express.Router();

router.post('/', (req, res) => login(req, res));

module.exports = router;
