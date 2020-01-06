import express from 'express';
import jwt from 'jsonwebtoken';
var config = require('../Utils/Config');

import * as UsersServices from '../Services/Users/UsersServices';
import { VerifyToken } from '../Utils/JWTUtils'; 
import { Query } from '../Utils/DbConnector';

const router = express.Router();

//? POST
// Register a new user
router.post('/register', async(req,res,next)=> {
    const ss = UsersServices.RegisterUsers();
    res.send(ss);
});

//? POST
// Login users
//* TODO? Migrate this layer to UsersServices.js- 
router.post('/login', async(req,res,next) => {
    if(req.body.user === 'admin' && req.body.pwd === '123') {
        const id = 1; //esse id viria do banco de dados
        var token = jwt.sign({ id }, config.secret, {
            expiresIn: 600 // 10min
        });
        res.status(200).send({ auth: true, token: token });
    } else {
        res.status(500).send('Login inválido!');
    }
});

//? GET
// Remover token do utilizador
//* TODO? Delete token from database
router.get('/logout', (req,res,next) => {
    res.status(200).send({ auth: false, toke:null});
})

router.get('/test', async(req,res,next)=> {
    var output = await Query('SELECT name FROM test');
    res.send(output);
});

module.exports = router;