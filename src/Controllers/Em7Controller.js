const https = require('http');

module.exports = {

    getDataEm7(uname, pword, path){
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
            }).on("error", (err) =>{ 
                reject("Error: " + err.message); });

        });
    }
}