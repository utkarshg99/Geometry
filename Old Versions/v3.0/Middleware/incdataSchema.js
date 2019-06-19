var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var incdata = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    statement: {
        type:[String],
        default:[]
    },
    useradinp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Incdata', incdata);