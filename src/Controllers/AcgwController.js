 const request = require('request');
 const HTMLParser = require('node-html-parser');

const Acgw = require('../Models/Acgw');
const Em7 = require('./Em7Controller');

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
                Acgw.find({},(err,docs) =>{
                    if(!err){ res.json(docs); }
                    else{ res.json(err); }    
                });
            }).catch(err => { return res.json(err)});
    },

    getHrAcgw(req, res){

        //if(!acgw){ return "Not found ACGW"; }

         let options = {
             host: '100.124.248.3',
             port: 80,
             method: 'GET'
         };

         var url = 'http://root:hughes01@100.124.248.3'

         request({url: url}, (err, res, body) => {
            if(!err){
                console.log(HTMLParser.parse(body));
            }
        });


        
    }
}