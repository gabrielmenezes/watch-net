const express = require('express');
const AcgwController = require('./Controllers/AcgwController');
const HrController = require('./Controllers/HrController');


const routes = express.Router();

routes.get('/acgw', AcgwController.store);
routes.get('/remotas', AcgwController.getHrAcgw);
routes.get('/testWan1', (req, res) =>{
    return res.json(HrController.testWanA('100.124.249.20'));
});

module.exports = routes;