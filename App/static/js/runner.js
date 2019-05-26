var num_of_imgs = 1;
var loaded_imgs = 0;
var color;
var bgcolor;
var x, y, r, w, h, pts=[];
var ins=[], len=0;
var f=0;
function myLoop() {
	for(var i=0; i<len; i++){
        ins[i].draw();
    }
}

function increaseLoaded() {
	loaded_imgs++;
}

function checkforload() {
	if(loaded_imgs == num_of_imgs && f==1) {
        engine.theLoop(myLoop);
        f=0;
	} else {
		setTimeout("checkforload()",1000);	
	}
}

function datacollector(){
    if(document.getElementById('x').value=='' || document.getElementById('x').value==null){
        alert('Missing X');
        x=-1;}
    else
        x=Number(document.getElementById('x').value);
    if(document.getElementById('y').value=='' || document.getElementById('y').value==null){
        alert('Missing Y');
        y=-1;}
    else
        y=Number(document.getElementById('y').value);
    if(document.getElementById('h').value=='' || document.getElementById('h').value==null){
        alert('Missing Height');
        h=-1;}
    else
        h=Number(document.getElementById('h').value);
    if(document.getElementById('w').value=='' || document.getElementById('w').value==null){
        alert('Missing Width');
        w=-1;}
    else
        w=Number(document.getElementById('w').value);
    if(document.getElementById('r').value=='' || document.getElementById('r').value==null){
        alert('Missing Radius');
        r=-1;}
    else
        r=Number(document.getElementById('r').value);
}

function addpts(){
    var xd=document.getElementById('xd').value;
    var yd=document.getElementById('yd').value;
    if(document.getElementById('xd').value=='' || document.getElementById('xd').value==null){
        alert('Missing X-coordinate');
        return -1;}
    else
        xd=Number(document.getElementById('xd').value);
    if(document.getElementById('yd').value=='' || document.getElementById('yd').value==null){
        alert('Missing Y-coordinate');
        return -1;}
    else
        yd=Number(document.getElementById('yd').value);
    data={
        x:xd,
        y:yd
    };
    pts.push(data);
    alert('Added Successfully');
}

function drawer(){
    var type=document.getElementById('type').value;
    var instance='';
    if(type=='' || type==null){
        alert('Blank Type');
    }
    datacollector();
    if(type=='filledsquare'){
        if(x==-1 || y==-1 || (w==-1 && h==-1)){
            alert('Incomplete parameters');
            return;
        }
        else{
            instance=(w!=-1)?fldsq(color, w, w, x, y):fldsq(color, h, h, x, y);
        }
    }
    else if(type=='strokesquare'){
        if(x==-1 || y==-1 || (w==-1 && h==-1)){
            alert('Incomplete parameters');
            return;
        }
        else{
            instance=(w!=-1)?strksq(color, w, w, x, y):strksq(color, h, h, x, y);
        }
    }
    else if(type=='filledrect'){
        if(x==-1 || y==-1 || w==-1 || h==-1){
            alert('Incomplete parameters');
            return;
        }
        else{
            instance=fldsq(color, w, h, x, y);
        }
    }
    else if(type=='strokerect'){
        if(x==-1 || y==-1 || w==-1 || h==-1){
            alert('Incomplete parameters');
            return;
        }
        else{
            instance=strksq(color, w, h, x, y);
        }
    }
    else if(type=='filledelipse'){
        if(x==-1 || y==-1 || w==-1 || h==-1){
            alert('Incomplete parameters');
            return;
        }
        else{
            instance=fldelip(color, w, h, x, y);
        }
    }
    else if(type=='strokeelipse'){
        if(x==-1 || y==-1 || w==-1 || h==-1){
            alert('Incomplete parameters');
            return;
        }
        else{
            instance=strkelip(color, w, h, x, y);
        }
    }
    else if(type=='filledcircle'){
        if(x==-1 || y==-1 || r==-1){
            alert('Incomplete parameters');
            return;
        }
        else{
            instance=fldcircle(color, r, x, y);
        }
    }
    else if(type=='strokecircle'){
        if(x==-1 || y==-1 || r==-1){
            alert('Incomplete parameters');
            return;
        }
        else{
            instance=strkcircle(color, r, x, y);
        }
    }
    else if(type=='filledpoly'){
        if(x==-1 || y==-1 || pts==[]){
            alert('Incomplete parameters');
            return;
        }
        else{
            instance=fldpoly(color, pts, x, y);
            pts=[];
        }
    }
    else if(type=='strokepoly'){
        if(x==-1 || y==-1 || pts==[]){
            alert('Incomplete parameters');
            return;
        }
        else{
            instance=strkpoly(color, pts, x, y);
            pts=[];
        }
    }
    else{
        alert('Incorrect Type.');
        return;
    }
    if(instance!=''){
        ins.push(instance);
        len++;
    }
    alert('Added Successfully');
}

function make(){
    f=1;
}

function configure(){
    color=(document.getElementById('fillcolor').value == '' || document.getElementById('fillcolor').value == null)?'#FFFFFF':document.getElementById('fillcolor').value;
    bgcolor=(document.getElementById('bgcolor').value == '' || document.getElementById('bgcolor').value == null)?'#DAA520':document.getElementById('bgcolor').value;
    $(document).ready(function() {
        engine = new bHive({
            width: screen.width,
            height: 700,
            domobject: 'stageholder',
            backgroundColor: bgcolor
        });
        bg = engine.createBitmap({
            src: './img/grid.png',
            x: 0,
            y: 0
        });
        bg.addEventListener('onload',increaseLoaded);
        setTimeout("checkforload()",1000);
        });
}