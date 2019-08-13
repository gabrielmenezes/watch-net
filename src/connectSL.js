const https = require('http');

 function getDataEm7(uname, pword, path){
    return new Promise ((resolve, reject) => {
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
                resolve(JSON.parse(data));
        });
            }).on("error",(err)=>{
                reject("Error: " + err.message);
            });
    });
}

getDataEm7('gsoares','Xdr4593!05','/api/device/3092')
    .then(result => console.log(result))
    .catch(err => console.log(err));