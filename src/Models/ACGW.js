const mongoose = require('mongoose');

const AcgwSchema = new mongoose.Schema({
    ip: String,
    name: String,
});

module.exports = mongoose.model('Acgw', AcgwSchema);