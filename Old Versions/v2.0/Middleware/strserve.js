var http = require('http');
var qs = require('querystring');
var fs = require("fs");
var watch = require('node-watch');
var portNumber = 8080;
var sendjson = {
    status: 'Go for IT.'
};

console.log("Initiating Server...");

function makejson(name) {
    js = {};
    var filen = './UserData/' + name + '/linejobs.uk'
    lj = fs.readFileSync(filen, 'utf8');
    var filen = './UserData/' + name + '/circlejobs.uk'
    cj = fs.readFileSync(filen, 'utf8');
    var filen = './UserData/' + name + '/polyjobs.uk'
    pj = fs.readFileSync(filen, 'utf8');
    js.lj = lj;
    js.pj = pj;
    js.cj = cj;
    js.status = 'Success';
    return js;
}

function checkCredibility(name, code) {
    var passwords = JSON.parse(fs.readFileSync('./Middleware/gibberish.json', 'utf8'));
    name = name.toLowerCase();
    if (passwords[name] == code)
        return true;
    return false;
}

function qmakejson(name) {
    var filen = './UserData/' + name + '/questions.json'
    if (fs.existsSync(filen)) {
        js = JSON.parse(fs.readFileSync(filen, 'utf8'));
        jsx = {};
        jsx.status = 'Success';
        jsx.data = js;
        return jsx;
    } else {
        js = {
            'status': 'No Questions Uploaded'
        }
        return js;
    }
}

console.log("Server Launched.");
console.log("Waiting for Auto-Draw Requests at " + portNumber + " .....");
http.createServer(function (request, response) {
    console.log("Incoming Connection.");
    if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });

        request.on('end', function () {
            var post = qs.parse(body);
            var name = post.name;
            var code = post.code;
            var cmdfile = './UserData/' + name + '/commands.uk';
            var statfile = './UserData/' + name + '/status.uk';
            post = post.commands;
            if (checkCredibility(name, code)) {
                datastat = "Wait";
                var xs = JSON.parse(fs.readFileSync('./Middleware/userlist.json', 'utf8'));
                xs['awaiting-solve'].push(name);
                fs.writeFileSync('./Middleware/userlist.json', JSON.stringify(xs))
                fs.writeFile(cmdfile, post, (err) => {
                    if (err) console.log(err);
                    fs.writeFile(statfile, datastat, (err) => {
                        if (err) console.log(err);
                        watch(statfile, {
                            recursive: true
                        }, function (evt, unname) {
                            if (evt == 'update') {
                                datax = fs.readFileSync(statfile, 'utf8');
                                if (datax == "Go" && response != "") {
                                    response.setHeader('Content-Type', 'application/json');
                                    response.setHeader("Access-Control-Allow-Origin", "*");
                                    sendjson = makejson(name);
                                    response.end(JSON.stringify(sendjson));
                                    response = "";
                                }
                            }
                        });
                    });
                });
            } else {
                response.setHeader('Content-Type', 'application/json');
                response.setHeader("Access-Control-Allow-Origin", "*");
                sendjson = {
                    'status': 'Authentication Failed.'
                };
                response.end(JSON.stringify(sendjson));
                response = "";
            }
        });
    }
}).listen(portNumber);

var sdportNumber = 7070;
console.log("Waiting for Self-Draw Requests at " + sdportNumber + " .....");
http.createServer(function (request, response) {
    console.log("Incoming Connection.");
    if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });

        request.on('end', function () {
            var post = qs.parse(body);
            var name = post.name;
            var code = post.code;
            var rawquesd = "./UserData/"+name+"/rawques.uk";
            var qstatusd = "./UserData/"+name+"/qstatus.uk";
            post = post.commands;
            if (checkCredibility(name, code)) {
                var xs = JSON.parse(fs.readFileSync('./Middleware/userlist2.json', 'utf8'));
                xs['awaiting-question'].push(name);
                fs.writeFileSync('./Middleware/userlist2.json', JSON.stringify(xs))
                datastat = "Wait";
                fs.writeFile(rawquesd, post, (err) => {
                    if (err) console.log(err);
                    fs.writeFile(qstatusd, datastat, (err) => {
                        if (err) console.log(err);
                        watch(qstatusd, {
                            recursive: true
                        }, function (evt, name) {
                            if (evt == 'update') {
                                datax = fs.readFileSync(qstatusd, 'utf8');
                                if (datax == "Go" && response != "") {
                                    response.setHeader('Content-Type', 'application/json');
                                    response.setHeader("Access-Control-Allow-Origin", "*");
                                    sendjson = {
                                        "status": "Success"
                                    };
                                    response.end(JSON.stringify(sendjson));
                                    response = "";
                                }
                            }
                        });
                    });
                });
            } else {
                response.setHeader('Content-Type', 'application/json');
                response.setHeader("Access-Control-Allow-Origin", "*");
                sendjson = {
                    'status': 'Authentication Failed.'
                };
                response.end(JSON.stringify(sendjson));
                console.log("Processed Successfully.");
                response = "";
            }
        });
    }
}).listen(sdportNumber);

var qportNumber = 6060;
console.log("Waiting for Question Requests at " + qportNumber + " .....");
http.createServer(function (request, response) {
    if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });

        request.on('end', function () {
            var post = qs.parse(body);
            var name = post.name;
            response.setHeader('Content-Type', 'application/json');
            response.setHeader("Access-Control-Allow-Origin", "*");
            sendjson = qmakejson(name);
            response.end(JSON.stringify(sendjson));
            response = "";
        });
    }
}).listen(qportNumber);

var regportNumber = 5050;
console.log("Waiting for Registration Requests at " + regportNumber + " .....");
http.createServer(function (request, response) {
    if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });

        request.on('end', function () {
            var post = qs.parse(body);
            var name = post.name;
            var fname= post.fname;
            var code = post.code;
            var org = post.org;
            var seck = post.seck;
            var email = post.email;
            var passwords = JSON.parse(fs.readFileSync('./Middleware/gibberish.json', 'utf8'));
            name = name.toLowerCase();
            if (typeof passwords[name] === 'undefined') {
                passwords[name] = code;
                fs.writeFileSync('./Middleware/gibberish.json', JSON.stringify(passwords));
                var dir = './UserData/' + name;
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                var fileadd = dir + '/data.json'
                var datab = {}
                datab.name = name;
                datab.org = org;
                datab.seck = seck;
                datab.email = email;
                datab.fname = fname;
                fs.writeFileSync(fileadd, JSON.stringify(datab));
                var filen = './UserData/' + name + '/linejobs.uk'
                lj = fs.writeFileSync(filen, '');
                var filen = './UserData/' + name + '/qstatus.uk'
                lj = fs.writeFileSync(filen, '');
                var filen = './UserData/' + name + '/rawques.uk'
                lj = fs.writeFileSync(filen, '');
                var filen = './UserData/' + name + '/quetions.json'
                lj = fs.writeFileSync(filen, '');
                var filen = './UserData/' + name + '/circlejobs.uk'
                cj = fs.writeFileSync(filen, '');
                var filen = './UserData/' + name + '/polyjobs.uk'
                pj = fs.writeFileSync(filen, '');
                var filen = './UserData/' + name + '/commands.uk'
                pj = fs.writeFileSync(filen, '');
                var filen = './UserData/' + name + '/status.uk'
                pj = fs.writeFileSync(filen, '');
                response.setHeader('Content-Type', 'application/json');
                response.setHeader("Access-Control-Allow-Origin", "*");
                sendjson = {
                    'status': 'Account Creation Successful'
                };
                response.end(JSON.stringify(sendjson));
            } else {
                response.setHeader('Content-Type', 'application/json');
                response.setHeader("Access-Control-Allow-Origin", "*");
                sendjson = {
                    'status': 'Account Already Exists'
                };
                response.end(JSON.stringify(sendjson));
            }
        });
    }
}).listen(regportNumber);