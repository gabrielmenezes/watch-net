var exec = require('ssh-exec');
var os = require('os');

const Remota = require('../Models/Remota');
const TestRemota = require('../Models/TesteRemota');

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
        return new Promise((resolve, reject) =>{
            
            
            commands = "execute ping-options reset" + os.EOL + "execute ping-options interface wan1" + os.EOL + "execute ping 8.8.8.8";

            exec(commands, {
                user: 'hntools',
                host: ipRemota, 
                password: 'LpHzayMEeRLB11Zo'
                }, (err, stdout, stderr)=>{
                    if (err) { console.log(err);reject([false , Infinity]); }
        
                    let dados = stdout.toString();
        
                    var resultadoPing = dados.match(getResultadoPing), mediaMs = dados.match(getMediaMs);
                    var retornaPing = false, retornaMs = Infinity;
                    
                    if(Array.isArray(resultadoPing)) { retornaPing = resultadoPing[1] < 25 ? true : false; }
                    if(Array.isArray(mediaMs)) { retornaMs = mediaMs[1]; } 
        
                    resolve([retornaPing, retornaMs]);
            }).id;
        });
    },

    async testWanB(ipRemota){
        return new Promise((resolve, reject) =>{
            commands = "execute ping-options reset" + os.EOL + "execute ping-options interface wan2" + os.EOL + "execute ping 8.8.8.8";
            
            exec(commands, {
            user: 'hntools',
            host: ipRemota, 
            password: 'LpHzayMEeRLB11Zo'
            }, (err, stdout, stderr)=>{
                if (err) { console.log(err);reject([false , Infinity]); }

                let dados = stdout.toString();

                var resultadoPing = dados.match(getResultadoPing), mediaMs = dados.match(getMediaMs);
                var retornaPing = false, retornaMs = Infinity;
                
                if(Array.isArray(resultadoPing)) { retornaPing = resultadoPing[1] < 25 ? true : false; }
                if(Array.isArray(mediaMs)) { retornaMs = mediaMs[1]; } 
    
                resolve([retornaPing, retornaMs]);
            });
        });
    },

    async testAA(ipRemota, ipRemotaAA){
        return new Promise((resolve, reject) =>{

            commands = "execute ping-options reset" + os.EOL + "execute ping " + ipRemotaAA;
            
            exec(commands, {
            user: 'hntools',
            host: ipRemota, 
            password: 'LpHzayMEeRLB11Zo'
            }, (err, stdout, stderr)=>{
                if (err) { console.log(err);reject(false); }

                let dados = stdout.toString();

                var resultadoPing = dados.match(getResultadoPing);
                var retornaPing = false;
                
                if(Array.isArray(resultadoPing)) { retornaPing = resultadoPing[1] < 25 ? true : false; }

                resolve(retornaPing);
            });
        });
    },

    async testRemota(ipRemota, ipRemotaAA){
        let checkWanA = [false,Infinity], checkWanB = [false,Infinity], testAA = false;
        await this.testWanA(ipRemota).then(retorno => { checkWanA = retorno; }).catch( err => { checkWanA = err; });
        await this.testWanB(ipRemota).then(retorno => { checkWanA = retorno; }).catch( err => { checkWanA = err; });
        await this.testAA(ipRemota, ipRemotaAA).then(retorno => { testAA = retorno; }).catch( err => { testAA = err; });

        let remota = await Remota.findOne({ip: ipRemotaAA});

        if(!remota){ return "IPNAOEXISTE"; }
        
        let testRemota = await TestRemota.create({ nameD: remota.nameD , wan1connection: checkWanA[0], wan2connection: checkWanB[0], wan1averageMs: checkWanA[1], wan2averageMs: checkWanB[1],
            aaConnection: testAA, 
            date : new Date().toString()
        });

        console.log(testRemota);
    },

    async startCollect (){
        
        var remotas = await Remota.find();

        remotas.forEach(remota => {
            this.testRemota(remota.ipD, remota.ip);
        });

        /*return setInterval(async function () {
           remotas.forEach(remota => {
                this.testRemota(remota.ipD, remota.ip);
           });
        }, 1800000);*/
    
    },

    stopCollect (intervalo) {
        clearInterval(intervalo);
    }

};