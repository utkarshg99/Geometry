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
    js={};
    lj=fs.readFileSync('./Middleware/linejobs.uk', 'utf8');
    cj=fs.readFileSync('./Middleware/circlejobs.uk', 'utf8');
    pj=fs.readFileSync('./Middleware/polyjobs.uk', 'utf8');
    js.lj=lj;
    js.pj=pj;
    js.cj=cj;
    return js;
}

console.log("Server Launched.");
console.log("Waiting for Requests at "+portNumber+" .....");
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
                console.log("\n"+post+"\n");
                console.log("Commands are Recorded.");
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
                                sendjson=makejson();
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