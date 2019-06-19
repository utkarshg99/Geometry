var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var user = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    status: {
        type: String,
        default: 'Wait'
    },
    created: {
        type: Date,
        default: Date.now
    }
});
var retdata = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    lj: String,
    cj: String,
    pj: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
});
var incdata = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    statement: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

var User = 
module.exports = mongoose.model('User', user);
var Retdata = mongoose.model('Retdata', retdata);
var Incdata = mongoose.model('Incdata', incdata);