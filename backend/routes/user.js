const express = require('express');
const multer = require('multer');

const UserController = require('../controllers/user');

const router = express.Router();
const upload = multer({ dest: 'tmp/csv/' });

router.post('/upload', upload.single('file'), UserController.userUpload);

module.exports = router;
