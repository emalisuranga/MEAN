

 const mongoose = require('mongoose');
 const bcrypt = require('bcryptjs');
 const Schema = mongoose.Schema;

 var usersSchema = new Schema({

    userName:  { type: String, required: true },
    name:  { type: String, required: true },
    email:    { type: String, required: true },
    password: { type: String, required: true }

  });


  const Users =  module.exports = mongoose.model("Users", usersSchema);


  module.exports.saveUser = function(newUser,callback){

      bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;

            if(err) throw err;
            newUser.save(callback);
          });
      });
  };

  module.exports.findByEmail = function(email,callback){
    
    const query = {email:email};
    Users.findOne(query,callback);
  };

  module.exports.passwordCheck = function(plainPassword,hash,callback){

    bcrypt.compare(plainPassword,hash, function(err, res) {
      
      if(err) throw err;
      if(res){
        callback(null,res);
      }
     //console.log(res)
    });
  };

  module.exports.findUserbyId = function(id,callback){

    Users.findOne(id,callback); 

  }
  