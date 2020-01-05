import express from 'express';

const UsersController = require('./Controller/UsersController');

const app = express();
const PORT = 8443;

app.use('/api/v1/users', UsersController);

app.listen(PORT, ()=> { console.log("SERVICE STARTED ON PORT", PORT)})