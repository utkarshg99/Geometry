var name = '',
    code = '',
    id='';

function authenticate() {
    name = document.getElementById('username').value;
    code = SHA256(document.getElementById('password').value);
    document.getElementById('authpanel').style.display='none';
    getAccess(9000);
}

function getAccess(port){
    var req = '';
    var namex = encodeURIComponent(JSON.stringify(name));
    namex = 'username=' + namex.substring(3, namex.length - 3).replace(/%5Cn/g, '%0A');
    var codex = encodeURIComponent(JSON.stringify(code));
    codex = 'pass=' + codex.substring(3, codex.length - 3).replace(/%5Cn/g, '%0A');
    req = req + '&' + namex + '&' + codex;
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:" + port;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            js = JSON.parse(xhr.responseText);
            alert(js.status);
            if (js.status == 'Authentication Successful') {
                id=js.userid;
            } else {
                document.getElementById('authpanel').style.display = '';
            }
        }
    };
    xhr.send(req);
}