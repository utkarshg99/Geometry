var bw = parseInt(screen.width*0.989/40)*40+40;
var bh = scrht;
var canvas;
var context;

function globalizer() {
    canvas = document.getElementById("stageholder").children[0];
    context = canvas.getContext("2d");
}

function drawBoard() {
    globalizer();
    for (var x = 0; x <= bw; x += 40) {
        context.moveTo(x, 0);
        context.lineTo(x, bh);
    }
    for (var x = 0; x <= bh; x += 40) {
        context.moveTo(0, x);
        context.lineTo(bw, x);
    }
    context.strokeStyle = "black";
    context.stroke();
}