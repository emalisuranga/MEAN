


const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); 
const passport = require('passport');


const app = express() ;
const port = process.env.PORT ||3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport)


const user = require('./router/user'); 
const config = require('./config/database');


app.use(express.static(path.join(__dirname,"public")));


const connection = mongoose.connect(config.database);
if(connection){
    console.log("database connected");
}
else{
    console.log("database not connected");
}
 

app.use(user);

// app.get("/user",function (req,res){
//     res.send("hello user");
// });

app.get("/",function (req,res){
    res.send("hello emal");
});

// app.post("/api",function(req,res){
//     const user = {id:3};
//     const token = jwt.sign({user},config.secret);
//     res.json({
//         token:token
//     })
//    // res.send("hello world");
// })

app.listen(port,function () {
    console.log("test 3000");
});
