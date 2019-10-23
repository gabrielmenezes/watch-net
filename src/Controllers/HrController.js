const Remota = require('../Models/Remota');

module.exports = {  
    async store(name, ip, serial, nameD, ipD){
        
        let remota = await Remota.findOne({serial});

        if (!remota){
            remota = await Remota.create({name, ip, serial, nameD, ipD});
        }

        return remota;
    }
};