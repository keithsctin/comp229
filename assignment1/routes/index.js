/*  COMP229-008
      Assignment: 1
      Author: Sing Cheung Tin
      Date:   May 20, 2023
      Filename: index.js
*/

var express = require('express');
var router = express.Router();

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
