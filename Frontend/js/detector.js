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
var circlecircle=[];
var lineline=[];
var linelinencr=[];

$(document).keyup(function (e) {
    if (e.key === "Escape") {
        setstat(stat);
    } else if (e.keyCode == 90 && e.ctrlKey) {
        removeLastDrawn();
    } else if (e.keyCode == 89 && e.ctrlKey) {
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
        state.type = "line";
        state.len = eucliddist(endpt[0], endpt[1]);
        var tmp = [];
        tmp.push(endpt[0]);
        tmp.push(endpt[1]);
        state.endpts = tmp;
        if (state.endpts[0].x > state.endpts[1].x) {
            var t = state.endpts[1];
            state.endpts[1] = state.endpts[0];
            state.endpts[0] = t;
        }
        if (endpt[0] != endpt[1])
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
        state.r = r;
        state.cen = {
            x: endpt[0].x,
            y: endpt[0].y
        };
        states.push(state);
        engine.theLoop(detloop);
        istatcntr.push(state.id);
        temp = [];
        temp.push(endpt[0]);
        endpt = temp;
        l = 1;
    }
}

function liesOn(state, q) {
    if (state.type == 'line') {
        var p = state.endpts[0];
        var r = state.endpts[1];
        return Math.abs(eucliddist(p, q) + eucliddist(q, r) - state.len) < 1
    } else if (state.type == 'circle') {
        var pt = state.cen;
        var d1 = eucliddist(pt, point);
        return Math.abs(d1 - state.r) < 1;
    }
}

function orientation(p, q, r) {
    var val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val == 0) return 0;
    return (val > 0) ? 'clock' : 'cntrclock';
}

function doIntersect(state1, state2) {
    var p1 = state1.endpts[0],
        q1 = state1.endpts[1],
        p2 = state2.endpts[0],
        q2 = state2.endpts[1];
    var o1 = orientation(p1, q1, p2);
    var o2 = orientation(p1, q1, q2);
    var o3 = orientation(p2, q2, p1);
    var o4 = orientation(p2, q2, q1);
    if (o1 != o2 && o3 != o4) return true;
    if (o1 == 0 && liesOn(state1, p2)) return true;
    if (o2 == 0 && liesOn(state1, q2)) return true;
    if (o3 == 0 && liesOn(state2, p1)) return true;
    if (o4 == 0 && liesOn(state2, q1)) return true;
    return false;
}

function cmppt(pt1, pt2) {
    return pt1.x == pt2.x && pt1.y == pt2.y;
}

function getIntersectingLines(takecnr) {
    var num = 0;
    var set={};
    if (takecnr) {
        for (var i = 0; i < states.length; i++) {
            for (var j = i + 1; j < states.length; j++) {
                if (states[i].type == 'line' && states[j].type == 'line' && states[i].visible && states[j].visible && doIntersect(states[i], states[j])) {
                    num++;
                    set.i=i;
                    set.j=j;
                    lineline.push(set);
                }
            }
        }
        return num;
    } else {
        for (var i = 0; i < states.length; i++) {
            for (var j = i + 1; j < states.length; j++) {
                if (states[i].type == 'line' && states[j].type == 'line' && states[i].visible && states[j].visible && doIntersect(states[i], states[j])) {
                    num++;
                    set.i=i;
                    set.j=j;
                    linelinencr.push(set);
                    if (cmppt(states[i].endpts[0], states[j].endpts[0]) || cmppt(states[i].endpts[0], states[j].endpts[1]) || cmppt(states[i].endpts[1], states[j].endpts[0]) || cmppt(states[i].endpts[1], states[j].endpts[1]))
                        num--;
                        lineline.pop();
                }
            }
        }
        return num;
    }
}

function getIntersectingCircles() {
    var num = 0;
    for (var i = 0; i < states.length; i++) {
        for (var j = i + 1; j < states.length; j++) {
            if (states[i].type == 'circle' && states[j].type == 'circle' && states[i].visible && states[j].visible) {
                if (eucliddist(states[i].cen, states[j].cen) < (states[i].r + states[j].r) && eucliddist(states[i].cen, states[j].cen) > Math.abs(states[i].r - states[j].r)){
                    num++;
                    set.i=i;
                    set.j=j;
                    circlecircle.push(set);
                }
            }
        }
    }
    return num;
}

function getInterctingLineAndCircles(){

}