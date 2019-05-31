function line_parse_core(strn) {
    const regex = /\(\(([-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?, [-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?)\), \(([-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?, [-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?)\)\)/mg;
    var str = strn;
    let m;
    while ((m = regex.exec(str)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        crdx1 = parseFloat(m[2])
        crdy1 = parseFloat(m[5])
        crdx2 = parseFloat(m[9])
        crdy2 = parseFloat(m[12])
        ln = []
        pt1 = {
            x: crdx1,
            y: crdy1
        }
        pt2 = {
            x: crdx2,
            y: crdy2
        }
        ln.push(pt1);
        ln.push(pt2);
        instance=strkpoly(color, ln, 0, 0);
        ins.push(instance);
        len++;
    }
}

function poly_parse_core(strn){
    //each polygon in new line
    const regex = /((\(([-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?, [-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?)\),* *))/mg;
    let m;
    ln = [];
    while ((m = regex.exec(strn)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        crdx = parseFloat(m[4]);
        crdy = parseFloat(m[7]);
        pt = {
            x: crdx,
            y: crdy
        }
        ln.push(pt);
    }
    instance=strkpoly(color, ln, 0, 0);
    ins.push(instance);
    len++;
}

function circle_parse_core(strn){
    const regex=/(\(([-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?, [-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?)\), [-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?)+?/mg;
    let m;
    while ((m = regex.exec(strn)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        crdx = parseFloat(m[3]);
        crdy = parseFloat(m[6]);
        rad = parseFloat(m[9]);
        crdx-=rad;
        crdy-=rad;
        instance=strkcircle(color, rad, crdx, crdy);
        ins.push(instance);
        len++;
    }
}

function polygon_wrapper(strn){
    lst=strn.split('\r\n');
    for(var i=0; i<lst.length; i++){
        poly_parse_core(lst[i]);
    }
}