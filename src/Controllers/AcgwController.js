var exec = require('ssh-exec');
const checkIP = require('ip');
 
const Acgw = require('../Models/Acgw');
const Em7 = require('./Em7Controller');
const Hr = require('./HrController');

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

    async getHrAcgw(req, res){

        const { host } = req.body;

        command = "gawk -F: '{ print $1\",\"$2\",\"$3\",\"}' /tmp/registeredAAonGw.txt";
        
        exec(command, {
        user: 'root',
        host: host, 
        password: 'hughes01'
        }, async (err, stdout, stderr)=>{
            if (err) { return res.status(404).send(err); }
            let dados = stdout.toString().replace(/\r?\n|\r/g, "").split(',');
            let remota = [];
            for (i = 0; i < dados.length; i+=3){
                name = dados[i];
                ip = dados[i+1];
                serial = dados [i+2];
                nameD = name.replace(/AA/i,'D');

                test = checkIP.toLong(ip + "") - 1;
                ipD = checkIP.fromLong(test);

                if (!name || !ip || !serial)
                    continue;
                remota.push(await Hr.store( name, ip, serial, nameD, ipD ));
            }

            return res.json(remota);
        });
    }
}