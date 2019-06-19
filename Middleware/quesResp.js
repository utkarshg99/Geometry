var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var quesrespdata = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    data: {
        type:Array,
        default:[]
    },
    usersdresp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Quesrespdata', quesrespdata);