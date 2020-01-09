import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

var config = require('../Utils/Config');

import * as UsersServices from '../Services/Users/UsersServices';
import { VerifyToken } from '../Utils/JWTUtils'; 
import { Query } from '../Utils/DbConnector';

const router = express.Router();

//? POST
// Register a new user
router.post('/register', async(req,res,next)=> {

    var input = {
        Username : req.body.Username,
        Password : req.body.Password,
        Email : req.body.Email,
        ApplicationId : req.body.ApplicationId  
    };

    const output = await UsersServices.RegisterUsers(input);

    res.status(200).json(output);
});

//? POST
// Login users
//* TODO? Migrate this layer to UsersServices.js- 
router.post('/login', async(req,res,next) => {
    //GET USER DATA
    var userData = await UsersServices.GetUserData(req.body.user);
    
    //VERIFICAR SE ESTE USER TEM CONTA NA APPLICATIONID
    if(req.body.ApplicationId != userData[0].ApplicationId){
        res.status(500).send({ auth:false, message: "Invalid login."})
    } else {
        //COMPARE PASSWORD
        var passwordMatch = await bcrypt.compareSync(req.body.pwd, userData[0].Password);
    
        //SEND JWT
        if(passwordMatch) {
            var payload = userData[0];
            
            var token = jwt.sign( {payload }, config.secret, {
                expiresIn: 600
            });

            //Guardar o TOKEN na BASE DE DADOS

            res.status(200).send({ auth: true, token: token });
        } else {
            //SE TIVER TOKEN NA DB APAGA
            
            res.status(500).send('Invalid login');
        }
    }

});

//? GET
// Remover token do utilizador
//* TODO? Delete token from database
router.get('/logout/:Username/:Token', (req,res,next) => {
    //DELETE TOKEN DA DB
    var username = req.param.Username;
    var token = req.param.Token;

    await UsersServices.DeleteUserToken(username, token);

    res.status(200).send({ auth: false, toke:null});
})

router.get('/test', async(req,res,next)=> {
    var output = await UsersServices.GetUserData("teste");
    res.send(output);
});

module.exports = router;