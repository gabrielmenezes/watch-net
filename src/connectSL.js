const https = require('http');

function getDataEm7(uname, pword, path, retorno){

    const options = {
        host: 'em7.hdbops.net',
        port: 80,
        path: path,
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Basic ' + new Buffer.from(uname + ':' + pword).toString('base64')
        }
    }

    https.get(options, (resp) =>{
        let data = '';

        resp.on('data', (chunk) =>{
            data+= chunk;
        });

        resp.on('end', () =>{
            console.log(JSON.parse(data));            
            retorno = JSON.parse(data);
    });
    }).on("error",(err)=>{
        retorno = ("Error: " + err.message);
    });
}
var testRetorno;
getDataEm7('gsoares','Xdr4593!05','/api/device/', testRetorno);
console.log(testRetorno);