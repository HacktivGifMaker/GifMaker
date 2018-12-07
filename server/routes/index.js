var express = require('express');
var router = express.Router();
const multer = require('../helpers/converter')
const {sendUploadToGCS} = require('../controllers/gyfController')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/upload', function(){
console.log("sebelum multer"); 
next();
},
multer.single('userPhoto'), function(){
  console.log("masuk sini==="); console.log(req.files); next();
}, sendUploadToGCS)


module.exports = router;