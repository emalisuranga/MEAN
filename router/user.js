

const express = require('express');
const router = express();
const config = require('../config/database');
const users = require('../models/users');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// respond with "hello world" when a GET request is made to the homepage
router.get('/user', function (req, res) {
  res.send('hello test2')
 // res.send('hello world')
});


router.post('/register', function (req, res) {
 //res.send('Welcome register page')
 //console.log(req.body)

  const newUser = new users({
    userName:req.body.userName,
    name:req.body.name,
    email:req.body.email,
    password:req.body.password

  });

  users.saveUser(newUser,function(err,user){
    if(err){
       res.json({state:false,msg:"data not insert"}) 
    }
    if(user){
      res.json({state:true,msg:"data insert"}) 
    }

    });

});

router.post('/login', function (req, res) {
  
  const email = req.body.email;
  const password = req.body.password;
  
  users.findByEmail(email,function(err,user){
    if(err) throw err;
    if(!user){
      res.json({state:false,msg:"Not user found"});
    }

  users.passwordCheck(password,user.password,function(err,match){
      if(err) throw err;

      if (match){
        //console.log('done');

        const token = jwt.sign({user}, config.secret,{expiresIn:86400});
        res.json(
          {
            state:true,
            token:"JWT "+ token,
            user:{
              id:user._id,
              name:user.name,
              uaserName:user.uaserName,
              email:user.email
            }
          })
        }
    });  
  });

});


router.post('/profile', passport.authenticate('jwt', { session: false }),function(req, res) {
    //res.send(req.user.profile);
    res.json({user:req.user});
 }
);
 

router.get('/api',ensuerTok,function (req,res){
  // const user = {id:3};
  // const token = jwt.sing({user},'my_secret_key');
  // res.json({
  //     token:token
  // })
 // res.send('hello api')
  jwt.verify(req.token, config.secret, function(err,data){
    if(err){
      res.sendStatus(403);
    } else{
      res.json[{
        text:'this is done',
        data:data
      }];
    }
  })

});

function ensuerTok(req,res,next){
  const beareHeder = req.headers['authorization'];
  if(typeof beareHeder !== 'undifined'){
    const bearer = beareHeder.split("");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else{
    res.sendStatus(403);
  }
}

module.exports = router;  