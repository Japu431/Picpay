global.TextEncoder = require("util").TextEncoder; global.TextDecoder = require("util").TextDecoder;

const express = require('express');
const app = express();
const routes = require('./src/routes/routes');
const mongoose = require('mongoose');

require('dotenv').config();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/' , routes);


const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@picpayapi.tkz9a.mongodb.net/apiPicpay?retryWrites=true&w=majority`)
.then(()=> {
    console.log(`Conectado o MongoDB`);
    app.listen(3000);
}).catch(err => {
    console.log(err)
})
