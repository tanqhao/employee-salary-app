const express = require('express');

const UserController = require('../controllers/user');

const router = express.Router();

router.post('/upload', UserController.userUpload);

module.exports = router;
