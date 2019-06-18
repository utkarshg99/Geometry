function go(port) {
    var req = {};
    var st = document.getElementById("commands").value;
    req.commands = st + '\n';
    req=encodeURIComponent(JSON.stringify(st));
    req='commands='+req.substring(3,req.length-3).replace(/%5Cn/g,'%0A');
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:"+port;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            js=JSON.parse(xhr.responseText);
            line_parse_core(js.lj);
            polygon_wrapper(js.pj);
            circle_parse_core(js.cj);
            make();
        }
    };
    xhr.send(req);
}

function getques(port) {
    var req = {};
    var st="";
    req=encodeURIComponent(JSON.stringify(st));
    req='commands='+req.substring(3,req.length-3).replace(/%5Cn/g,'%0A');
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:"+port;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            js=JSON.parse(xhr.responseText);
            quesarr=js.data;
            dispquestion();
        }
    };
    xhr.send(req);
}

function goq(port) {
    var req = {};
    var st = document.getElementById("commands").value;
    req.commands = st + '\n';
    req=encodeURIComponent(JSON.stringify(st));
    req='commands='+req.substring(3,req.length-3).replace(/%5Cn/g,'%0A');
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:"+port;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            js=JSON.parse(xhr.responseText);
            alert("Upload Complete.")
        }
    };
    xhr.send(req);
}