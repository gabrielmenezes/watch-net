const Acgw = require('../Models/Acgw');
const Em7 = require('./Em7Controller');

var acgws = [];

module.exports = {

    async store(req, res){
        const { uname, passwd, url } = req.body;
        return Em7.getDataEm7(uname,passwd,url).then( retorno => {
            const { result_set } = retorno;

            result_set.forEach(element => {
                const { URI } = element;

                Em7.getDataEm7(uname,passwd,URI)
                    .then(async result =>{
                        const { ip, name } = result;
                        
                        let acgw = await Acgw.findOne({ ip, name });

                        if(!acgw){
                            acgw = await Acgw.create({ ip, name });
                        }
                    }).catch(err => { return res.json(err)});
                });
                return res.json({"Resultado" : "Atualizados"});
            }).catch(err => { return res.json(err)});
    }
}