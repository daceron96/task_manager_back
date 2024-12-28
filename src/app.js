const express = require('express');
const { config, validateConfig } = require('./infrastructure/config');

validateConfig()

const app =  express();

app.use(express.json());

const routes = require('./interfaces/routes');

app.use(config.server.apiPrefix, routes);

module.exports = app;