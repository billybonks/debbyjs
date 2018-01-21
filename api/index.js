'use strict';

//const newrelic = require('newrelic');
const http = require('http');
const express = require('express');
//const config = require('./config.json');

let app = express();
app.server = http.createServer(app);

app.use(require('./middlewares/request_logger'));

app.use(require('./middlewares/body_parser'));

app.use(require('./routes/webhook'));

module.exports = app;
