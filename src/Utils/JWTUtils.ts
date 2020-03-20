import { verify } from 'jsonwebtoken';

export function VerifyToken(req,res,next) {
    var token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) return res.status(401).send({ header :{ auth: false }, data: { errorCode: 'No token provided.'}});

    verify(token, process.env.SECRET , function(err : any, decoded: any) {
        if (err) return res.status(500).send({ header :{ auth: false }, data: { errorCode: 'Failed to authenticate token.'}});

        res.userData = decoded.userData;
        next();
    });
}