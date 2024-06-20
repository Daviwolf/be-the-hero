const express = require('express');

const ongcontroller=require('./controlers/ongcontroler');
const incidentscontroller =require('./controlers/incidentcontroler');
const profilecontroller =require('./controlers/profilecontroller');
const sessioncontroller =require('./controlers/sessioncontroller');

const {
    request
} = require('http');
const routes = express.Router();

routes.post('/sessions',sessioncontroller.create);

routes.get('/ongs',ongcontroller.index);
routes.post('/ong',ongcontroller.create);

routes.post('/incidents',incidentscontroller.create);
routes.get('/incidents',incidentscontroller.index);
routes.delete('incidents/:id',incidentscontroller.delete);
routes.get('/profile',profilecontroller.index);

module.exports = routes;