//Creates an Express application. The express() function is a top-level function exported by the express module.
var express = require('express');

/* The app object conventionally denotes the Express application. Create it by calling the top-level express() function exported by the Express module: */
var app = express();


var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var signup = require('./routes/signup');




//conecting to mongodb server
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hookfish');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));?

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/signup', signup);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;


var user_schema = new mongoose.Schema({
  _id :String,
  username:{ type: String, default: "def_username" },
  email : { type: String, default: "def@email.com" },
  first_name :{ type: String, default: "def_fname" },
  last_name:{ type: String, default: "def_lname" },
  password:{ type: String, default: "123456" },
  auth_key:{ type: String, default: "qwerty" },
  user_type: {type: String, enum: ['customer', 'broker'],default: "customer"},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },

});
var user = mongoose.model('master_user',user_schema);


//signin up new user
app.post('/signup', function (req, res) {
  
    console.log(req.bodyParser.email);
    res.json(req.bodyParser);

    //create object
    var user1 = new User();

    user1.email = req.bodyParser.email;
    user1.first_name = req.bodyParser.name;

    console.log(user1);
    
    user1.save(function (err, userObj) {
      if (err) {
        console.log(err);
      } else {
        console.log('saved successfully:', userObj);
      }
    });

});


app.get('/hello', function (req, res) {
  res.send('<h3>Hello World!</h3>');
});

/// below code is for creating server
var server = app.listen(3100, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});