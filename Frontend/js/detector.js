var xval, yval;
var endpt = [];
var l = 0;
var stat = '';
var snpstat = false;
scrht = 640;
var quesarr = [];
var states = [];
var idcntr = 0;
var istatcntr = [];
var rstatcntr = [];

$(document).keyup(function (e) {
    if (e.key === "Escape") {
        setstat(stat);
    }
    if (e.keyCode == 90 && e.ctrlKey) {
        removeLastDrawn();
    }
    if (e.keyCode == 89 && e.ctrlKey) {
        showLastRemoved();
    }
});

function displayer(event) {
    xval = event.clientX;
    yval = event.clientY;
    document.getElementById("cords").innerHTML = "X = " + xval + " Y = " + yval;
    document.getElementById("snps").innerHTML = "Snap to Fit : " + snpstat;
}

function storecrd(event) {
    xval = event.clientX;
    yval = event.clientY;
    pt = {
        x: xval,
        y: yval
    }
    if (snpstat) {
        if (pt.x % 8 != 0) {
            var lx = parseInt(pt.x / 8) * 8;
            var mx = lx + 8;
            var mid = lx + 4;
            pt.x = (pt.x < mid) ? lx : mx;
        }
        if (pt.y % 8 != 0) {
            var ly = parseInt(pt.y / 8) * 8;
            var my = ly + 8;
            var mid = ly + 4;
            pt.y = (pt.y < mid) ? ly : my;
        }
    }
    endpt.push(pt);
    l++;
}

function eucliddist(pt1, pt2) {
    return Math.sqrt((pt2.x - pt1.x) * (pt2.x - pt1.x) + (pt2.y - pt1.y) * (pt2.y - pt1.y));
}

function setstat(status) {
    stat = status;
    endpt = [];
    l = 0;
}

function setsnpstat() {
    snpstat = !snpstat;
}

function removeLastDrawn() {
    if (istatcntr.length > 1) {
        c = istatcntr.pop();
        states[c - 1].visible = false;
        engine.theLoop(detloop);
        rstatcntr.push(c);
        endpt = [];
        l = 0;
    }
}

function showLastRemoved() {
    if (rstatcntr.length != 0) {
        c = rstatcntr.pop();
        states[c - 1].visible = true;
        engine.theLoop(detloop);
        istatcntr.push(c);
        endpt = [];
        l = 0;
    }
}

function detloop() {
    if (grdstat)
        drawBoard();
    for (var i = 0; i < states.length; i++) {
        if (states[i].visible) {
            states[i].instance.draw();
        }
    }
}

function process() {
    var state = {};
    if (stat == 'line' && l > 1) {
        instance = strkpoly(color, endpt, 0, 0);
        state.instance = instance;
        state.visible = true;
        state.id = ++idcntr;
        state.line = "";
        states.push(state);
        engine.theLoop(detloop);
        istatcntr.push(state.id);
        temp = [];
        temp.push(endpt[1]);
        endpt = temp;
        l = 1;
    } else if (stat == 'circle' && l > 1) {
        var r = eucliddist(endpt[0], endpt[1]);
        instance = strkcircle(color, r, endpt[0].x - r, endpt[0].y - r);
        state.instance = instance;
        state.visible = true;
        state.id = ++idcntr;
        state.type = "circle"
        states.push(state);
        engine.theLoop(detloop);
        istatcntr.push(state.id);
        temp = [];
        temp.push(endpt[0]);
        endpt = temp;
        l = 1;
    }
}