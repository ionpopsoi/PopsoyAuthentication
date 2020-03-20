import { Router } from 'express';

const routes = Router();

routes.get('/api/v1/status', (req,res,next) => {
    res.send("OK");
})

export default routes;