var http = require('http');
var qs = require('querystring');
var mongoose = require('mongoose');
let User = require('./userSchema.js');
let Incdata = require('./incdataSchema.js');
let Retdata = require('./retdataSchema.js');
let Quesdata = require('./quesData.js');
let Quesrespdata = require('./quesResp.js');
let express = require('express')
var path = require('path')
var app = express()
var router = express.Router()
var port = process.env.PORT
if (port == null || port == "") {
  port = 8080
}

function splitit(state) {
    state = state.split('\n');
    return state;
}

function setProcess(id) {
    var quer = {
        status: true
    };
    var promiseforreg = new Promise(function (resolve, reject) {
        var userrecord = User.findOneAndUpdate({
            '_id': id
        }, {
            'processed': true
        }, function (err, docs) {
            if (err || typeof docs === 'undefined' || docs == null) {
                quer.status = false;
                resolve(quer);
            } else {
                resolve(quer);
            }
        });
    });
    return promiseforreg;
}

function setStatus(id) {
    var quer = {
        status: true
    };
    var promiseforreg = new Promise(function (resolve, reject) {
        var userrecord = User.findOneAndUpdate({
            '_id': id
        }, {
            'status': true
        }, function (err, docs) {
            if (err || typeof docs === 'undefined' || docs == null) {
                quer.status = false;
                resolve(quer);
            } else {
                resolve(quer);
            }
        });
    });
    return promiseforreg;
}

function authenticate(name, pass) {
    var userid = 0;
    var quer = {};
    var promiseforreg = new Promise(function (resolve, reject) {
        var userrecord = User.find({
            'username': name,
            'password': pass
        }, function (err, docs) {
            if (err || typeof docs[0] === 'undefined') {
                quer.status = 'Authentication Failed';
                resolve(quer);
            } else {
                userid = docs[0]._id;
                quer.status = 'Authentication Successful';
                quer.userid = userid;
                resolve(quer);
            }
        });
    });
    return promiseforreg;
}

function register(post) {
    var name = post.name;
    var pass = post.pass;
    var email = post.email;
    var username = post.username;
    let newuser = new User({
        _id: new mongoose.Types.ObjectId(),
        username: username,
        email: email,
        password: pass,
        name: name
    });
    var userid = newuser._id;
    newuser.save(function (err) {
        if (err) throw err;
        let newincdata = new Incdata({
            _id: new mongoose.Types.ObjectId(),
            useradinp: newuser._id
        });
        newincdata.save(function (err) {
            if (err) throw err;
        });
        let newrespdata = new Retdata({
            _id: new mongoose.Types.ObjectId(),
            useradresp: newuser._id
        });
        newrespdata.save(function (err) {
            if (err) throw err;
        });
        let newquesdata = new Quesdata({
            _id: new mongoose.Types.ObjectId(),
            usersdinp: newuser._id
        });
        newquesdata.save(function (err) {
            if (err) throw err;
        });
        let newquesrespdata = new Quesrespdata({
            _id: new mongoose.Types.ObjectId(),
            usersdresp: newuser._id
        });
        newquesrespdata.save(function (err) {
            if (err) return err;
        });
    });

    var promiseforreg = new Promise(function (resolve, reject) {
        if (userid != 0)
            resolve(userid);
    });
    return promiseforreg;
}

function checkExistence(post) {
    var username = post.username;
    var k = {};
    var promiseforcheck = new Promise(function (resolve, reject) {
        var userrecord = User.find({
            'username': username
        }, function (err, docs) {
            if (err || typeof docs[0] === 'undefined') {
                k.status = true;
                resolve(k);
            } else {
                k.status = false;
                k.reason = "Username already used."
                resolve(k);
            }
        });
    });
    return promiseforcheck;
}

function savecommand(id, commands) {
    commands = splitit(commands);
    var quer = {
        'status': 'Recorded Successfully'
    };
    var promiseforreg = new Promise(function (resolve, reject) {
        var userrecord = Incdata.findOneAndUpdate({
            'useradinp': id
        }, {
            'statement': commands
        }, function (err, docs) {
            if (err || typeof docs === 'undefined' || docs == null) {
                quer.status = "Didn't Register";
                resolve(quer);
            } else {
                resolve(quer);
            }
        });
    });
    return promiseforreg;
}

function returnADresults(id) {
    var quer = {
        'status': 'Success'
    };
    var promiseforreg = new Promise(function (resolve, reject) {
        var userrecord = Retdata.findOne({
            'useradresp': id
        }, function (err, docs) {
            if (err || typeof docs === 'undefined' || docs == null) {
                quer.status = "Either Unprocessed or Not registered";
                resolve(quer);
            } else {
                quer.data = {};
                quer.data.lj = docs.lj;
                quer.data.cj = docs.cj;
                quer.data.pj = docs.pj;
                if (quer.data.lj == [] && quer.data.cj == [] && quer.data.pj == '') {
                    quer.status = "Either Unprocessed or Not registered";
                    resolve(quer);
                }
                resolve(quer);
            }
        });
    });
    return promiseforreg;
}

function savequestions(id, questions) {
    var quer = {
        'status': 'Recorded Successfully'
    };
    var promiseforreg = new Promise(function (resolve, reject) {
        var userrecord = Quesdata.findOneAndUpdate({
            'usersdinp': id
        }, {
            'questions': questions
        }, function (err, docs) {
            if (err || typeof docs === 'undefined' || docs == null) {
                quer.status = "Didn't Register";
                resolve(quer);
            } else {
                resolve(quer);
            }
        });
    });
    return promiseforreg;
}

function returnSDresults(username) {
    var quer = {
        'status': 'Success'
    };
    var promiseforreg = new Promise(function (resolve, reject) {
        var userrecord = User.find({
            'username': username
        }, function (err, docs) {
            if (err || typeof docs[0] === 'undefined') {
                quer.status = 'Not Registered';
                resolve(quer);
            } else {
                id = docs[0]._id;
                var resp = Quesrespdata.findOne({
                    'usersdresp': id
                }, function (err, docs) {
                    if (err || typeof docs === 'undefined' || docs == null) {
                        quer.status = "No Document Found";
                        resolve(quer);
                    } else {
                        quer.data = docs.data;
                        if (quer.data.toString() == []) {
                            quer.status = "Unprocessed";
                            resolve(quer);
                        }
                        resolve(quer);
                    }
                });
            }
        });
    });
    return promiseforreg;
}

options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
};
mongoose.connect('mongodb://127.0.0.1:27017/admin', options, function (err) {
    if (err) throw err;
    console.log("Server Launched.");

    router.post('/auth', function (request, response) {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            var post = qs.parse(body);
            name = post.username;
            pass = post.pass;
            var prom = authenticate(name, pass);
            prom.then(function (quer) {
                response.setHeader('Content-Type', 'application/json');
                response.setHeader("Access-Control-Allow-Origin", "*");
                response.end(JSON.stringify(quer));
            }).catch((err) => {
                console.log(err);
            });
        });
    });

    router.post('/register', function (request, response) {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            var post = qs.parse(body);
            var exist = checkExistence(post);
            exist.then(function (k) {
                if (k.status) {
                    var prom = register(post);
                    prom.then(function (useid) {
                        response.setHeader('Content-Type', 'application/json');
                        response.setHeader("Access-Control-Allow-Origin", "*");
                        var sendjson = {
                            'status': 'Registration Successful',
                            'id': useid
                        };
                        response.end(JSON.stringify(sendjson));
                    });
                } else {
                    response.setHeader('Content-Type', 'application/json');
                    response.setHeader("Access-Control-Allow-Origin", "*");
                    var sendjson = {
                        'status': 'Registration Failed',
                        'reason': k.reason
                    };
                    response.end(JSON.stringify(sendjson));
                }
            }).catch((err) => {
                console.log(err);
            });
        });
    });

    router.post('/savecommands', function (request, response) {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            var post = qs.parse(body);
            commands = post.commands;
            id = post.id;
            var preprom = setStatus(id);
            preprom.then((xc) => {
                if (xc.status) {
                    var prom = savecommand(id, commands);
                    prom.then(function (quer) {
                        response.setHeader('Content-Type', 'application/json');
                        response.setHeader("Access-Control-Allow-Origin", "*");
                        response.end(JSON.stringify(quer));
                    });
                    prom.catch((err) => {
                        console.log(err);
                    });
                }
            });
            preprom.catch((err) => {
                console.log(err);
            });
        });
    });

    router.post('/getresultsad', function (request, response) {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            var post = qs.parse(body);
            id = post.id;
            var prom = returnADresults(id);
            prom.then(function (quer) {
                response.setHeader('Content-Type', 'application/json');
                response.setHeader("Access-Control-Allow-Origin", "*");
                response.end(JSON.stringify(quer));
            }).catch((err) => {
                console.log(err);
            });
        });
    });

    router.post('/savequestions', function (request, response) {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            var post = qs.parse(body);
            questions = post.questions;
            id = post.id;
            var preprom = setProcess(id);
            preprom.then((xc) => {
                if (xc.status) {
                    var prom = savequestions(id, questions);
                    prom.then(function (quer) {
                        response.setHeader('Content-Type', 'application/json');
                        response.setHeader("Access-Control-Allow-Origin", "*");
                        response.end(JSON.stringify(quer));
                    });
                    prom.catch((err) => {
                        console.log(err);
                    });
                }
            });
            preprom.catch((err) => {
                console.log(err);
            });
        });
    });

    router.post('/getresultssd', function (request, response) {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            var post = qs.parse(body);
            var username = post.username;
            var prom = returnSDresults(username);
            prom.then(function (quer) {
                response.setHeader('Content-Type', 'application/json');
                response.setHeader("Access-Control-Allow-Origin", "*");
                response.end(JSON.stringify(quer));
            }).catch((err) => {
                console.log(err);
            });
        });
    });

    router.get('/',function(req,res){
        res.sendFile(path.join(__dirname+'/../Frontend/UI.html'));
    });

    app.use('/',express.static(__dirname+'/../Frontend/'))
    app.use('/',router)
    app.listen(port)
});