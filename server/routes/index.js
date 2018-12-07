var express = require('express');
var router = express.Router();
const multer = require('../helpers/converter')
const {sendUploadToGCS} = require('../controllers/gyfController')
const controller = require('../controllers/gif')

router.post('/upload', multer.single('userPhoto'), sendUploadToGCS)

router.post('/', controller.gifConvert)

router.post('/', controller.gifConvert)

module.exports = router;
