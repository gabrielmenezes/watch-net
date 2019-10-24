var exec = require('ssh-exec');
var os = require('os');

const Remota = require('../Models/Remota');

var getResultadoPing = /packets received, (\d*)%/i;
var getMediaMs = /\/(\d*\.?\d*)\//i;

module.exports = {  
    async store(name, ip, serial, nameD, ipD){
        
        let remota = await Remota.findOne({serial});

        if (!remota){
            remota = await Remota.create({name, ip, serial, nameD, ipD});
        }

        return remota;
    },

    async testWanA(ipRemota){

        commands = "execute ping-options reset" + os.EOL + "execute ping-options interface wan1" + os.EOL + "execute ping 8.8.8.8";
        
        exec(commands, {
        user: 'hntools',
        host: ipRemota, 
        password: 'LpHzayMEeRLB11Zo'
        }, (err, stdout, stderr)=>{
            if (err) { return [false , Infinity]; }

            let dados = stdout.toString();

            var resultadoPing = dados.match(getResultadoPing), mediaMs = dados.match(getMediaMs);
            var retornaPing = false, retornaMs = Infinity;
            
            if(Array.isArray(resultadoPing)) {
                resultadoPing = resultadoPing[1] < 75 ? false : true;
            }
            if(Array.isArray(mediaMs)){
                retornaMs = mediaMs[1];
            } 

            return [retornaPing, retornaMs];
        });
    },

    async testWanB(ipRemota){

        commands = "execute ping-options reset" + os.EOL + "execute ping-options interface wan2" + os.EOL + "execute ping 8.8.8.8";
        
        exec(commands, {
        user: 'hntools',
        host: ipRemota, 
        password: 'LpHzayMEeRLB11Zo'
        }, (err, stdout, stderr)=>{
            if (err) { return [false , Infinity]; }

            let dados = stdout.toString();

            var resultadoPing = dados.match(getResultadoPing), mediaMs = dados.match(getMediaMs);
            var retornaPing = false, retornaMs = Infinity;
            
            if(Array.isArray(resultadoPing)) {
                resultadoPing = resultadoPing[1] < 75 ? false : true;
            }
            if(Array.isArray(mediaMs)){
                retornaMs = mediaMs[1];
            } 

            return [retornaPing, retornaMs];
        });
    },

    async testAA(ipRemota, ipRemotaAA){

        commands = "execute ping-options reset" + os.EOL + "execute ping " + ipRemotaAA;
        
        exec(commands, {
        user: 'hntools',
        host: ipRemota, 
        password: 'LpHzayMEeRLB11Zo'
        }, (err, stdout, stderr)=>{
            if (err) { return false; }

            let dados = stdout.toString();

            var resultadoPing = dados.match(getResultadoPing);
            var retornaPing = false;
            
            if(Array.isArray(resultadoPing)) {
                resultadoPing = resultadoPing[1] < 75 ? false : true;
            }

            return retornaPing;
        });
    }
};