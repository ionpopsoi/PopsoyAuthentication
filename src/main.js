require('dotenv').config()
import express from 'express';

var bodyParser = require('body-parser')

const UsersController = require('./Controller/UsersController');
const app = express();
const PORT = 8443;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/users', UsersController);


app.listen(PORT, ()=> { console.log("SERVICE STARTED ON PORT", PORT)})