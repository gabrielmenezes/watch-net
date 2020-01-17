
const TesteRemota = require('../Models/TesteRemota');
const HrController = require('./HrController');

var isClustering = null;

module.exports = {
    async index(req, res){
        const testes = await TesteRemota.find();

        return res.json(testes);
    },

    async comecar(req, res) {
        
        isClustering = HrController.startCollect();
        res.json({'status': 'iniciado'});
    },

    async parar (req, res) {
        if (isClustering){
            HrController.stopCollect(isClustering);
            isClustering = null;
            res.json({'status': 'Finalizado'});
        } else {
            res.json({'statu': 'Não Iniciado!'})
        }
    },

    status (req,res) {
        if (isClustering){
            res.json({'status': 'Rodando'});
        } else {
            res.json({'statu': 'Não Iniciado!'})
        }
    },
}