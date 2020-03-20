import express from 'express';


import routes from './routes';
import users from './Controller/Users/UsersController';

const app = express();

app.use(express.json());

app.use(routes);
app.use('/api/v1', users);

export default app;