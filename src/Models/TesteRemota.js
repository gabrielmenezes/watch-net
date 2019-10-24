const mongoose = require('mongoose');

const TesteRemota = new mongoose.Schema({
    nameD: String,
    wan1connection: Boolean,
    wan2connection: Boolean,
    wan1averageMs: Number,
    wan2averageMs: Number,
    aaConnection: Boolean,
    date: Date
});

module.exports = mongoose.model('TesteRemota', TesteRemota);