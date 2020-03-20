import { Router } from 'express';
import { verify } from 'jsonwebtoken';

import UsersServices from '@services/Users/UsersServices';

import { ResponseWrapper } from '@models/Response/ResponseWrapper';

const router = Router();

router.post('/users', async (req,res,next)=> {
    var usersServices = new UsersServices();

    var response2 = await usersServices.RegisterNewUser(req);

    var response : ResponseWrapper = {
        header: {
            auth : false,
            timestamp: Date.now()
        },
        data : response2
    };

    res.send(response);
});

router.get('/users/check', async (req,res,next) => {
    var token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        return res.status(200).send({ auth: true, message: 'User authentication valid.' });
    });

});

router.get('/users/:Username', async(req,res,next) => {
    var username = { Username : req.params.Username } ;

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