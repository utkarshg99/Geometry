var xval, yval;
var endpt = [];
var l = 0;
var stat = '';
var snpstat = false;
scrht = 640;
var quesarr=[];;

$(document).keyup(function (e) {
    if (e.key === "Escape") {
        setstat(stat);
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
        if(pt.x%40!=0){
            var lx=parseInt(pt.x/40)*40;
            var mx=lx+40;
            var mid=lx+20;
            pt.x=(pt.x<mid)?lx:mx;
        }
        if(pt.y%40!=0){
            var ly=parseInt(pt.y/40)*40;
            var my=ly+40;
            var mid=ly+20;
            pt.y=(pt.y<mid)?ly:my;
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

function process() {
    if (stat == 'line' && l > 1) {
        instance = strkpoly(color, endpt, 0, 0);
        instance.draw();
        temp = [];
        temp.push(endpt[1]);
        endpt = temp;
        l = 1;
    } else if (stat == 'circle' && l > 1) {
        var r = eucliddist(endpt[0], endpt[1]);
        instance = strkcircle(color, r, endpt[0].x - r, endpt[0].y - r);
        instance.draw();
        temp = [];
        temp.push(endpt[0]);
        endpt = temp;
        l = 1;
    }
}