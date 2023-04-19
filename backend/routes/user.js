const express = require('express');
const multer = require('multer');
const cors = require("cors");

const UserController = require('../controllers/user');

const router = express.Router();
const upload = multer({ dest: 'tmp/csv/' });

router.use(cors());
router.post('/upload', upload.single('file'), UserController.userUpload);
router.get('/users', UserController.userList);

module.exports = router;
