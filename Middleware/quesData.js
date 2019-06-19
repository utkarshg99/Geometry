var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var quesdata = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    questions: {
        type:String,
        default:''
    },
    usersdinp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Quesdata', quesdata);