var express = require('express');
var router = express.Router();

//conecting to mongodb server
var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/hookfish');

var Schema = mongoose.Schema;
var UserDetail = new Schema({
      username: String,
      password: String
    }, {
      collection: 'master_users'
    });

//this method has to be defined manually
UserDetail.methods.validPassword = function( pwd ) {
    
    return ( this.password === pwd );
};

var UserDetails = mongoose.model('master_users', UserDetail);

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    UserDetails.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
		
	//copied from net  
      if (user.password != password) 
      { 
      		return done(null, false, { message: 'Invalid password' }); 
      }

      /*
		//default function
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }*/

      return done(null, user);
    });
  }
));

router.post('/', function(req, res, next) {
  res.send('in login post action');
  	var fff = passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
  	console.log(fff);
     var email = ((typeof req.body.email != 'undefined') ? req.body.email.trim() : 'default_email@email.com');
     var password = ((typeof req.body.password != 'undefined') ? req.body.password.trim() : '123456');
});

/*router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.send({ success : false, message : 'authentication failed' });
    }
    return res.send({ success : true, message : 'authentication succeeded' });
  })(req, res, next);
});
*/

module.exports = router;
