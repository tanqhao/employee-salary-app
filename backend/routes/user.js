const express = require('express');

const UserController = require('../controllers/user');

const router = express.Router();

router.get('/upload', UserController.userUpload);

module.exports = router;
