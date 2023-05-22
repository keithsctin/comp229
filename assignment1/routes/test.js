var express = require('express');
var router = express.Router();

// router.get('/test', (req, res) => {
//     res.render('test');
//   });
  
router.get('/', function(req, res) {
  res.render('test');
});

module.exports = router;