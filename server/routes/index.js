var express = require('express');
var router = express.Router();
const multer = require('../helpers/converter')
const {sendUploadToGCS} = require('../controllers/gyfController')

router.post('/upload', multer.single('userPhoto'), sendUploadToGCS)


module.exports = router;