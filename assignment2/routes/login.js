const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
  res.render('login');      //login.ejs
});

router.post('/login', (req, res) => {
  const { username, password, email, phone } = req.body;

  User.findOne({ username, password })
    .then((contact) => {          //new variable 'contact'
      if (contact) {
        res.render('biz-contacts');     //if found, go to biz-contacts.ejs
      } else {
        res.redirect('/');
      }
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/');
    });
});

module.exports = router;
