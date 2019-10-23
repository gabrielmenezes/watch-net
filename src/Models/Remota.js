const mongoose = require('mongoose');

const RemotaSchema = new mongoose.Schema({
    serial: String,
    ip: String,
    name: String,
    nameD: String, 
    ipD: String,
});

module.exports = mongoose.model('Remota', RemotaSchema);