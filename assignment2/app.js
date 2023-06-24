//  Course name: Web Application Development
//  Course code:COMP229-008
//  Assignment: 1
//  Student ID: 301246562
//  Student Name: Sing Cheung Tin
//  Date:   May 20, 2023
//  Filename: header.ejs

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session'); // Add the session middleware

app.use(express.static(__dirname + '/public'));

const port = 3000;

const dbUrl = 'mongodb://127.0.0.1:27017/myweb';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

var indexRouter = require('./routes/index');
app.use('/', indexRouter);

var loginRouter = require('./routes/login');
app.use('/login', loginRouter);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));

//sesion
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

const User = require('./models/user'); // Import the User model

// home routes
app.get('/', (req, res) => {
  res.render('home');
});

// Login routes
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username, password })
    .then((contact) => {
      if (contact) {
        req.session.authenticated = true; // Set the authenticated flag in the session
        res.redirect('/biz-contacts');
      } else {
        res.redirect('/');
      }
    })
    .catch((err) => {
      console.error(err);
      res.redirect('/');
    });
});


// Business Contacts routes
app.get('/biz-contacts', (req, res, next) => {
  if (req.session && req.session.authenticated) {
    User.find({}, 'username phone email')
      .sort({ username: 1 })
      .exec()
      .then((contacts) => {
        res.render('biz-contacts', { contacts, authenticated: true });  //if auth is success, then route to biz-contacts
      })
      .catch((err) => {
        console.error('Error retrieving contacts:', err);
        next(err);
      });
  } else {
    res.redirect('/');
  }
});

// Update Contact View
// app.get('/contacts/update/:id', isAuthenticated, (req, res) => {
app.get('/contacts/update/:id', (req, res) => {

  const contactId = req.params.id;

  User.findById(contactId)
    .then((contact) => {
      if (contact) {
        res.render('update-contact', { contact });
      } else {
        // Handle if the contact is not found
      }
    })
    .catch((err) => {
      console.error('Error retrieving contact:', err);
    });
});

// Update Contact Action
// app.post('/contacts/update/:id',  isAuthenticated, (req, res) => {
app.post('/contacts/update/:id', (req, res) => {
  const contactId = req.params.id;
  const { username, phone, email } = req.body;

  // Update the contact in the database based on the contactId
  User.findByIdAndUpdate(contactId, { username, phone, email })
    .then(() => {
      res.redirect('/biz-contacts');
    })
    .catch((err) => {
      console.error('Error updating contact:', err);
    });
});

// Delete Contact Action
// app.post('/contacts/delete/:id', isAuthenticated, (req, res) => {
app.post('/contacts/delete/:id', (req, res) => {
  const contactId = req.params.id;

  // Delete the contact from the database based on the contactId
  User.findByIdAndDelete(contactId)
    .then(() => {
      // Handle the successful deletion
      res.redirect('/biz-contacts');
    })
    .catch((err) => {
      console.error('Error deleting contact:', err);
    });
});

// Error handling route
app.use((req, res) => {
  res.redirect('/');
});

module.exports = app;
