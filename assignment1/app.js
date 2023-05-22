var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
//test.js
var testRouter = require('./routes/test');
//
//assignment1 var start
var ejs = require('ejs');
//

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//test.js
app.use('/test', testRouter);
//

app.use('/', indexRouter);
app.use('/users', usersRouter);

//assignment1 start
// var ejs = require('ejs');
app.engine('ejs', ejs.renderFile);
// app.use('/contact', contactRouter);
// app.get('/',function(req,res){  
//   res.render('index', {  
//       title:'Assignment 1',  
//       menu:[  
//           {  
//               href:'/index',  
//               text:'Home'  
//           },  
//           {  
//               href:'/projects',  
//               text:'Projects'  
//           },  
//           {  
//               href:'/about',  
//               text:'About Me'  
//           }, 
//           {
//               href:'/servcies',
//               text:'Services'
//           },
//           {  
//               href:'/contact',  
//               text:'Contact Me'  
//           },  
//       ]  
//   });  
// });
//assignment end

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//manual add
app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
  
//

module.exports = app;
