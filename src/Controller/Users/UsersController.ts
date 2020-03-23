import 'dotenv/config';
import { Router } from 'express';
import { verify } from 'jsonwebtoken';

import UsersServices from '@services/Users/UsersServices';
import ResponseWrapperService from '@utils/ResponseWrapper'; 

import { ResponseWrapper } from '@models/Response/ResponseWrapper';

const router = Router();

var ResponserMessageWrapper = new ResponseWrapperService();
var usersServices = new UsersServices();

/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
router.post('/users/register', async (req,res,next)=> {
    var registerUser = await usersServices.RegisterNewUser(req);

    var output = ResponserMessageWrapper.WrappeMessage(null, registerUser);

    res.status(output.header.status).send(output);
});

/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
router.get('/users/authorize', async(req,res,next) => {
    
});

/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
router.get('/users/logout', async(req,res,next) => {
    
});

/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
router.get('/users/token', async (req,res,next) => {
    var token : any = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    verify(token, process.env.SECRET, function(err: any, decoded: any) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        return res.status(200).send({ auth: true, message: 'User authentication valid.' });
    });

});

/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
router.get('/users/userinfo', async(req,res,next) => {
    var username = req.headers['x-access-token'] || req.headers['authorization'];

    var userInformation = await new UsersServices().GetUserData(username);

    var response : ResponseWrapper = {
        header: {
            auth : false,
            timestamp: Date.now()
        },
        data : userInformation
    };

    res.send(response);
});

export default router;