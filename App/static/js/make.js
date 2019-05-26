function strksq(color, wid, ht, x, y){ //stroke square
    return strokesquare = engine.createShape({
		shape: 'square',
		style: 'stroke',
		backgroundColor: color,
		width: wid,
		height: ht,
		x: x,
		y: y
	});
}

function strkcircle(color, r, x, y){ //stroke circle
    return strokecircle = engine.createShape({
		shape: 'circle',
		style: 'stroke',
		backgroundColor: color,
		radius: r,
		x: x,
		y: y
	});
}

function strkelip(color, wid, ht, x, y){ //stroke ellipse
    return elipse = engine.createShape({
		shape: 'elipse',
		style: 'stroke',
		backgroundColor: color,
		x: x,
		y: y,
		height: ht,
		width: wid
	}); 
}

function strkpoly(color, points, x, y){ //stroke polygon
    return poly = engine.createShape({
        shape: 'poly',
        style: 'stoke',
        backgroundColor: color,
        x: x,
        y: y,
        points: points
    });
}

function fldsq(color, wid, ht, x, y){ //filled square
    return filledsquare = engine.createShape({
		shape: 'square',
		style: 'filled',
		backgroundColor: color,
		width: wid,
		height: ht,
		x: x,
		y: y
	});
}

function fldcircle(color, r, x, y){ // filled circle
    return filledcircle = engine.createShape({
		shape: 'circle',
		style: 'filled',
		backgroundColor: color,
		radius: r,
		x: x,
		y: y
	});
}

function fldelip(color, wid, ht, x, y){ //filled ellipse
    return elipse = engine.createShape({
		shape: 'elipse',
		style: 'filled',
		backgroundColor: color,
		x: x,
		y: y,
		height: ht,
		width: wid
	}); 
}

function fldpoly(color, points, x, y){ // filled polygon
    return poly = engine.createShape({
        shape: 'poly',
        style: 'filled',
        backgroundColor: color,
        x: x,
        y: y,
        points: points
    });
}
