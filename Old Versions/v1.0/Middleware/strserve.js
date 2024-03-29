var http = require('http');
var qs = require('querystring');
var fs = require("fs");
var watch = require('node-watch');
var portNumber = 8080;
var sendjson = {
    status: 'Go for IT.'
};

console.log("Initiating Server...");

function makejson() {
    js = {};
    lj = fs.readFileSync('./Middleware/linejobs.uk', 'utf8');
    cj = fs.readFileSync('./Middleware/circlejobs.uk', 'utf8');
    pj = fs.readFileSync('./Middleware/polyjobs.uk', 'utf8');
    js.lj = lj;
    js.pj = pj;
    js.cj = cj;
    return js;
}

function qmakejson() {
    js = JSON.parse(fs.readFileSync('./Middleware/questions.json', 'utf8'));
    jsx = {};
    jsx.data = js;
    return jsx;
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
            post = post.commands;
            datastat = "Wait";
            fs.writeFile("./Middleware/commands.uk", post, (err) => {
                if (err) console.log(err);
                // console.log("\n" + post + "\n");
                console.log("Commands were Recorded.");
                fs.writeFile("./Middleware/status.uk", datastat, (err) => {
                    if (err) console.log(err);
                    console.log("Processing.....");
                    watch('./Middleware/status.uk', {
                        recursive: true
                    }, function (evt, name) {
                        if (evt == 'update') {
                            datax = fs.readFileSync("./Middleware/status.uk", 'utf8');
                            if (datax == "Go" && response != "") {
                                response.setHeader('Content-Type', 'application/json');
                                response.setHeader("Access-Control-Allow-Origin", "*");
                                sendjson = makejson();
                                response.end(JSON.stringify(sendjson));
                                console.log("Processed Successfully.");
                                response = "";
                            }
                        }
                    });
                });
            });
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
            post = post.commands;
            datastat = "Wait";
            fs.writeFile("./Middleware/rawques.uk", post, (err) => {
                if (err) console.log(err);
                // console.log("\n" + post + "\n");
                console.log("Questions were Recorded.");
                fs.writeFile("./Middleware/qstatus.uk", datastat, (err) => {
                    if (err) console.log(err);
                    console.log("Processing.....");
                    watch('./Middleware/qstatus.uk', {
                        recursive: true
                    }, function (evt, name) {
                        if (evt == 'update') {
                            datax = fs.readFileSync("./Middleware/qstatus.uk", 'utf8');
                            if (datax == "Go" && response != "") {
                                response.setHeader('Content-Type', 'application/json');
                                response.setHeader("Access-Control-Allow-Origin", "*");
                                sendjson = {
                                    "status": "Processed Succesfully"
                                };
                                response.end(JSON.stringify(sendjson));
                                console.log("Processed Successfully.");
                                response = "";
                            }
                        }
                    });
                });
            });
        });
    }
}).listen(sdportNumber);

var qportNumber = 6060;
console.log("Waiting for Question Requests at " + qportNumber + " .....");
http.createServer(function (request, response) {
    console.log("Incoming Connection.");
    response.setHeader('Content-Type', 'application/json');
    response.setHeader("Access-Control-Allow-Origin", "*");
    sendjson = qmakejson();
    response.end(JSON.stringify(sendjson));
    console.log("Processed Successfully.");
    response = "";
}).listen(qportNumber);