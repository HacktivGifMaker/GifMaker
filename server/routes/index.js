var express = require('express');
var router = express.Router();
const controller = require('../controllers/gif')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', controller.gifConvert)

module.exports = router;
