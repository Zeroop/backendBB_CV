var model = require('../models/db');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const fs = require('fs')
var privateKey = fs.readFileSync('./key/private.pem')
var publicKey = fs.readFileSync('./key/publickey.crt')
var db = new model()

function register(req,res){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        const entity = {
            username: req.body.username,
            fullname: req.body.fullname,
            email: req.body.email,
            phonenumbers: req.body.phonenumbers,
            role: req.body.role,
            password: hash
        }
        /*  db.register(entity,function(result){
           
         }) */
        
        db.checkExist(entity, (result) => {
            if (result) {
                db.register(entity, (user_id,role) => {
                    var token = jwt.sign({user_id: user_id },privateKey,{algorithm:'RS256'})
                    res.setHeader('Content-Type', 'text/html');
                    res.setHeader('Token', `${token}`);
                    res.setHeader('Role',`${role}`);
                    res.writeHead(200,{'Content-Type': 'text/plain' })
                });
            } else {
                res.status(400).json('Invalid username/password supplied');
            }
        });   
}

module.exports = register;