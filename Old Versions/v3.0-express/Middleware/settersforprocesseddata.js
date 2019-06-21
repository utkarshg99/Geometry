retdata.path('lj').set(function (inp) {
    const regex = /\(\(([-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?, [-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?)\), \(([-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?, [-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?)\)\)/mg;
    var str = inp;
    let m;
    var f = [];
    while ((m = regex.exec(str)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        crdx1 = Math.round(parseFloat(m[2]));
        crdy1 = Math.round(parseFloat(m[5]));
        crdx2 = Math.round(parseFloat(m[9]));
        crdy2 = Math.round(parseFloat(m[12]));
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
        f.push(ln);
    }
    this.lj = f;
});

retdata.path('cj').set(function (inp) {
    const regex = /(\(([-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?, [-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?)\), [-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?)+?/mg;
    let m;
    var f = [];
    while ((m = regex.exec(inp)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        crdx = Math.round(parseFloat(m[3]));
        crdy = Math.round(parseFloat(m[6]));
        rad = Math.round(parseFloat(m[9]));
        crdx -= rad;
        crdy -= rad;
        var l = [];
        l.x = crdx;
        l.y = crdy;
        l.r = rad;
        f.push(l);
    }
    this.cj = f;
});

retdata.path('pj').set(function (inp) {
    lst = inp.split('\n');
    var f = [];
    for (var i = 0; i < lst.length; i++) {
        var strn = lst[i];
        const regex = /((\(([-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?, [-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?)\),* *))/mg;
        let m;
        ln = [];
        while ((m = regex.exec(strn)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            crdx = Math.round(parseFloat(m[4]));
            crdy = Math.round(parseFloat(m[7]));
            pt = {
                x: crdx,
                y: crdy
            }
            ln.push(pt);
            f.push(ln);
        }
    }
    this.pj = f;
});
