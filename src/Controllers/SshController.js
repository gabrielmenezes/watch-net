var Client = require('ssh2').Client;
var os = require('os');

var getResultadoPing = /packets received, (\d*)%/i;
var getMediaMs = /\/(\d*\.?\d*)\//i;

const cmdWanA = "execute ping-options reset" + os.EOL + "execute ping-options interface wan1" + os.EOL + "execute ping 8.8.8.8";
const cmdWanB = "execute ping-options reset" + os.EOL + "execute ping-options interface wan2" + os.EOL + "execute ping 8.8.8.8";
const cmdAA = "execute ping-options reset" + os.EOL + "execute ping " + '100.124.249.23';
 
var conn = new Client();
conn.on('ready', function () {
    conn.exec(cmdWanA, function (err, stream) {
        if (err) console.log('Error ' + err.message);
        
        stream.on('data', function (data) {
            console.log('WanA: ' + data);
        });
    });
    
    conn.exec(cmdWanB, function (err, stream){
        if (err) console.log('Error ' + err.message);

        stream.on('data', function (data) {
            console.log('WanB: ' + data);
        });
    });

    conn.exec(cmdAA, function (err, stream){
        if (err) console.log('Error ' + err.message);

        stream.on('data', function (data) {
            console.log('AA: '+ data);
        });
    });

}).connect({
    host: '100.124.249.22',
    username: 'hntools',
    password: 'LpHzayMEeRLB11Zo',
    readyTimeout: 3000
});