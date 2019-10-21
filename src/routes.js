const express = require('express');
const AcgwController = require('./Controllers/AcgwController');
const HrController = require('./Controllers/HrController');


const routes = express.Router();

routes.get('/acgw', AcgwController.store);
routes.get('/remotas', AcgwController.getHrAcgw);

module.exports = routes;