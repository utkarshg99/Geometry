var stepper={status:false};

function go(port) {
    var req = '';
    var st = document.getElementById("commands").value;
    req.commands = st + '\n';
    req = encodeURIComponent(JSON.stringify(st));
    req = 'commands=' + req.substring(3, req.length - 3).replace(/%5Cn/g, '%0A');
    var idx = encodeURIComponent(JSON.stringify(id));
    idx = 'id=' + idx.substring(3, idx.length - 3).replace(/%5Cn/g, '%0A');
    req = req + '&' + idx;
    var xhr = new XMLHttpRequest();
    // var url = "http://localhost:" + port;
    var url = "http://172.27.36.31/savecommands"
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 201)) {
            js = JSON.parse(xhr.responseText);
            if(js.status=='Recorded Successfully'){
                stepper.status=true;
            }
            else{
                stepper.status=false;
                alert(js.status);
            }
        }
    };
    xhr.send(req);
}

function getResponse(port){
    if(!stepper.status){
        return;
    }
    var req = '';
    var idx = encodeURIComponent(JSON.stringify(id));
    idx = 'id=' + idx.substring(3, idx.length - 3).replace(/%5Cn/g, '%0A');
    req = idx;
    var xhr = new XMLHttpRequest();
    // var url = "http://localhost:" + port;
    var url = "http://172.27.36.31/getresultsad"
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 201)) {
            js = JSON.parse(xhr.responseText);
            if(js.status=='Success'){
                stepper.status=false;
                js=js.data;
                line_parse_core(js.lj);
                polygon_wrapper(js.pj);
                circle_parse_core(js.cj);
                make();
            }
        }
    };
    xhr.send(req);
}

function getques(port) {
    var req = {};
    var st = document.getElementById("username").value;
    req = encodeURIComponent(JSON.stringify(st));
    req = 'username=' + req.substring(3, req.length - 3).replace(/%5Cn/g, '%0A');
    var xhr = new XMLHttpRequest();
    // var url = "http://localhost:" + port;
    var url = "http://172.27.36.31/getresultssd"
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 201)) {
            js = JSON.parse(xhr.responseText);
            if(js.status=='Success'){
                quesarr = js.data;
                dispquestion();
            }
            else{
                alert(js.status);
            }
        }
    };
    xhr.send(req);
}

function goq(port) {
    var req = '';
    var st = document.getElementById("commands").value;
    req.commands = st + '\n';
    req = encodeURIComponent(JSON.stringify(st));
    req = 'questions=' + req.substring(3, req.length - 3).replace(/%5Cn/g, '%0A');
    var idx = encodeURIComponent(JSON.stringify(id));
    idx = 'id=' + idx.substring(3, idx.length - 3).replace(/%5Cn/g, '%0A');
    req = req + '&' + idx;
    var xhr = new XMLHttpRequest();
    // var url = "http://localhost:" + port;
    var url = "http://172.27.36.31/savequestions"
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 201)) {
            js = JSON.parse(xhr.responseText);
            alert(js.status);
        }
    };
    xhr.send(req);
}

setInterval(getResponse,2000,8080+'/getresultsad');