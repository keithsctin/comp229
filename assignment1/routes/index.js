var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'index' });
// });

router.get('/', function(req, res) {
  res.render('home', { title: 'Home' });
});

router.get('/about', function(req, res) {
  res.render('about', { title: 'About Me' });
});

router.get('/projects', function(req, res) {
  res.render('projects', { title: 'Projects' });
});

router.get('/services', function(req, res) {
  res.render('services', { title: 'Services' });
});

router.get('/contact', function(req, res) {
  res.render('contact', { title: 'Contact Me' });
});

module.exports = router;
