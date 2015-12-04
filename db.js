module.exports.init_mongoose = function () {
  // Something...
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
};
