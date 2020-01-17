const express = require('express');

const AcgwController = require('./Controllers/AcgwController');
const TesteRemotaController = require('./Controllers/TesteRemotaController');

const routes = express.Router();

routes.get('/acgw', AcgwController.store);
routes.get('/remotas', AcgwController.getHrAcgw);
routes.get('/testeRemotas', TesteRemotaController.index);
routes.get('/collectRemotas', TesteRemotaController.comecar);
routes.get('/stopClustering', TesteRemotaController.parar);
routes.get('/statusCollectRemotas', TesteRemotaController.status);

module.exports = routes;