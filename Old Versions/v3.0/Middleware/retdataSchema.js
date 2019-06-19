var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var retdata = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    lj: {
        type: String,
        default: ''
    },
    cj: {
        type: String,
        default: ''
    },
    pj: {
        type: String,
        default: ''
    },
    useradresp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Retdata', retdata);