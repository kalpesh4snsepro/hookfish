//Creates an Express application. The express() function is a top-level function exported by the express module.
var express = require('express');
var path = require('path');
var app = express();

//conecting to mongodb server
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/hookfish');

  var user_schema = new mongoose.Schema({
    //_id :String,
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
  var User = mongoose.model('master_user',user_schema);

/* The app object conventionally denotes the Express application. Create it by calling the top-level express() function exported by the Express module: */
//var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


router.post('/', function (req, res) {
  
    // console.log(typeof req.body.email);
    // console.log(typeof req.body.email1);
    // res.send('in signup post'+req.body.email);
    // console.log(JSON.stringify(req.body.name));
    // return;
    /*
    console.log(req.bodyParser.email);
    */
    //return;

    //create object of user schema which is defined in db.js file in root directory
    var newuser = new User();

    newuser.email = ((typeof req.body.email != 'undefined') ? req.body.email.trim() : 'default_email@email.com');

    newuser.password = ((typeof req.body.password != 'undefined') ? req.body.password.trim() : '11122333');

    newuser.first_name = ((typeof req.body.first_name != 'undefined') ? req.body.first_name.trim() : 'default_first_name');
    
    newuser.last_name = ((typeof req.body.last_name != 'undefined') ? req.body.last_name.trim() : 'default_last_name');

    newuser.username = ((typeof req.body.email != 'undefined') ? getUsername(req.body.email) : 'default_user_name');
    
    newuser.auth_key = randomString(5);
    
    newuser.user_type = ((typeof req.body.user_type != 'undefined') ? ((req.body.user_type == '1')?'customer':'broker') : 'customer');
    
    newuser.save(function (err, userObj) {
      if (err) {
        console.log(err);
      } else {
      console.log(newuser);
        console.log('saved successfully:', userObj);
        res.json('saved successfully:'+userObj);
        //res.json(userObj);
      }
    });

});

module.exports = router;

/* user deined functions*/

function getUsername(email){
  var arry = email.split("@");
  return arry[0];
}

function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}
