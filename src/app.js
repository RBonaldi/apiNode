'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

mongoose.connect("mongodb://rafaelbonaldi:'R@f171B171'@localhost:27017/admin")

const indexRoute = require('./routes/index-route')
const productsRoute = require('./routes/products-route.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', indexRoute);
app.use('/products', productsRoute);

module.exports = app;