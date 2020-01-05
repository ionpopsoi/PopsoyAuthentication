import express from 'express';
import jwt from 'jsonwebtoken';

import * as UsersServices from '../Services/Users/UsersServices';
import { VerifyToken } from '../Utils/JWTUtils'; 

const router = express.Router();

//? POST
// Register a new user
router.post('/register', async(req,res,next)=> {
    const ss = UsersServices.RegisterUsers();
    res.send(ss);
});

router.get('/test', VerifyToken, async(req,res,next)=> {
    const ss = UsersServices.RegisterUsers();
    res.send(ss);
});

module.exports = router;