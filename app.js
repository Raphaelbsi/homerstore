var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
// Database setup
require ('./config/database')

var usersRouter = require('./app/routes/users');
var productsRouter = require('./app/routes/products');
var providersRouter = require('./app/routes/providers')
var salesRouter = require('./app/routes/sales');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/providers', providersRouter);
app.use('/sales', salesRouter);


module.exports = app;
