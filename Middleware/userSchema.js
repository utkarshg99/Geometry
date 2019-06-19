var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var user = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    name:String,
    email:String,
    password:String,
    status: {
        type: Boolean,
        default: true
    },
    processed: {
        type: Boolean,
        default: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', user);