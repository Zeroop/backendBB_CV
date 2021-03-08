const express = require('express');

const app = require('express')();

const path = require('path');

const route = require('./routes/index');

const jwt = require('jsonwebtoken');

const fs = require('fs')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

var session = require('express-session');

const redis = require('redis');
const redisClient = redis.createClient(6379);
var redisStore= require('connect-redis')(session)

redisClient.on('error',(error)=>{
  console.log('Redis Error',error)
})
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false,maxAge: 115000 },
  store: new redisStore({host:'localhost',port:'6379',client:redisClient,ttl:86400})
}))


app.get('/logout',(req,res)=>{
  req.session.destroy();
  res.end();
})
//route init
route(app);

app.listen('4000', () => {
    console.log('4000');
});

// tạo private key và public key để xác thực token
/* var privateKey = fs.readFileSync('./key/private.pem')
var publicKey = fs.readFileSync('./key/publickey.crt')
var token = jwt.sign({Name: 'Trung Nguyen'},privateKey,{algorithm:'RS256'})

let reuslt = jwt.verify(token,publicKey,{algorithms:['RS256']},function(err,data){
  console.log(err);
  console.log(data);
})
 */
/* app.get('/demo',(req,res)=>{
    if (req.session.views) {
        req.session.views++
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.end()
      } else {
        req.session.views = 1
        res.end('welcome to the session demo. refresh!')
      }
    
}) */