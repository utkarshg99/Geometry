var name;
var code;
var email;
var seck;
var fname;
var organ;

function frontalChecks() {
    code = SHA256(document.getElementById('password').value);
    var ccode = SHA256(document.getElementById('cpassword').value);
    name = document.getElementById('name').value;
    fname = document.getElementById('fullname').value;
    email = document.getElementById('email').value;
    organ = document.getElementById('organ').value;
    seck = document.getElementById('secret').value;
    if (name.length < 7) {
        alert('Name too short.');
        return;
    }
    if (fname.length < 7) {
        alert('Full Name too short.');
        return;
    }
    if (document.getElementById('password').value.length < 8) {
        alert('Password too short.');
        return;
    }
    if (code != ccode) {
        alert("Passwords don't match");
        return;
    }
    if (email.indexOf('@') == -1) {
        alert('Invalid E-mail address, missing "@".');
        return;
    }
    if (email.indexOf('.') == -1) {
        alert('Invalid E-mail address, missing ".".');
        return;
    }
    regis(5050);
}

function regis(port) {
    var req = '';
    var namex = encodeURIComponent(JSON.stringify(name));
    namex = 'name=' + namex.substring(3, namex.length - 3).replace(/%5Cn/g, '%0A');
    var codex = encodeURIComponent(JSON.stringify(code));
    codex = 'code=' + codex.substring(3, codex.length - 3).replace(/%5Cn/g, '%0A');
    var fnamex = encodeURIComponent(JSON.stringify(fname));
    fnamex = 'fname=' + fnamex.substring(3, fnamex.length - 3).replace(/%5Cn/g, '%0A');
    var organx = encodeURIComponent(JSON.stringify(organ));
    organx = 'org=' + organx.substring(3, organx.length - 3).replace(/%5Cn/g, '%0A');
    var seckx = encodeURIComponent(JSON.stringify(seck));
    seckx = 'seck=' + seckx.substring(3, seckx.length - 3).replace(/%5Cn/g, '%0A');
    var emailx = encodeURIComponent(JSON.stringify(email));
    emailx = 'email=' + emailx.substring(3, emailx.length - 3).replace(/%5Cn/g, '%0A');
    req = req + '&' + namex + '&' + codex + '&' + fnamex + '&' + organx + '&' + seckx + '&' + emailx;
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:" + port;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            js = JSON.parse(xhr.responseText);
            alert(js.status);
        }
    };
    xhr.send(req);
}