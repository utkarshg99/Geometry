var name = '',
    code = '';

function authenticate() {
    name = document.getElementById('username').value;
    code = SHA256(document.getElementById('password').value);
    document.getElementById('authpanel').style.display='none';
}