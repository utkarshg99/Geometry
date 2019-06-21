from decider import decide
from helpers import getdict
from helpers import ptlistdicti
from jobgenerator import ljob
from jobgenerator import cjob
from jobgenerator import poljob
from jobgenerator import genpol
from get_data import make_circle
from get_data import make_line
from get_data import make_poly_gen
from get_data import make_poly_reg
from get_data import make_quads
from get_data import make_rect

shift={'xshift':0,'yshift':0}

def getLineXsetsPolCoords(pj):
    pj=list(pj)
    xsetl=[]
    pjr=pj[1:]+pj[0:1]
    for (p1, p2) in zip(pj, pjr):
        ptB=[]
        ptA=[]
        ptA.append(round(p1[0]+shift['xshift']))
        ptA.append(round(p1[1]+shift['yshift'])) 
        ptB.append(round(p2[0]+shift['xshift']))
        ptB.append(round(p2[1]+shift['yshift']))
        xset={}
        xset['type']='line'
        xset['thresh']=4
        xset['length']=''
        xset['ptA']=ptA
        xset['ptB']=ptB
        if(xset['ptA'][0]>xset['ptB'][0]):
            t=xset['ptA']
            xset['ptA']=xset['ptB']
            xset['ptB']=t
        elif(xset['ptA'][0]==xset['ptB'][0]):
            if(xset['ptA'][1]>xset['ptB'][1]):
                t=xset['ptA']
                xset['ptA']=xset['ptB']
                xset['ptB']=t
        xsetl.append(xset)
    return xsetl

def xsetgen(dicti, strn):
    (ftype, subtype)=decide(strn)
    lj=[]
    cj=[]
    pj=[]
    xsetl=[]
    xset={}
    if(ftype == 'line'):
        slope=0
        (ptA, ptB, lent, lst, slope)=make_line(strn, dicti)
        (lj, dicti)=ljob(lj, slope, lent, ptA, ptB, lst, dicti)
        lj=lj[0]
        xset['ptA']=[]
        xset['ptA'].append(round(lj[0][0]+shift['xshift']))
        xset['ptA'].append(round(lj[0][1]+shift['yshift']))
        xset['ptB']=[]
        xset['ptB'].append(round(lj[1][0]+shift['xshift']))
        xset['ptB'].append(round(lj[1][1]+shift['yshift']))
        if(xset['ptA'][0]>xset['ptB'][0]):
            t=xset['ptA']
            xset['ptA']=xset['ptB']
            xset['ptB']=t
        elif(xset['ptA'][0]==xset['ptB'][0]):
            if(xset['ptA'][1]>xset['ptB'][1]):
                t=xset['ptA']
                xset['ptA']=xset['ptB']
                xset['ptB']=t
        xset['type']='line'
        xset['length']=''
        xset['thresh']=4
        xsetl.append(xset)
    elif(ftype == 'circle'):
        (cen, rad, lst)=make_circle(strn, dicti)
        (cj, dicti)=cjob(cj, rad, cen, lst, dicti)
        cj=cj[0]
        xset['type']='circle'
        xset['thresh']=4
        xset['radius']=round(cj[1])
        xset['center']=[]
        xset['center'].append(round(cj[0][0]+shift['xshift']))
        xset['center'].append(round(cj[0][1]+shift['yshift']))
        xsetl.append(xset)
    elif(ftype == 'poly'):
        if(subtype!='' and subtype!='sq' and subtype!='rect'):
            ptlst=make_poly_gen(strn, dicti)
        if(subtype[len(subtype)-1]=='r'):
            (ptlst, dicti)=make_poly_reg(strn, dicti, subtype[:len(subtype)-1])
        if(subtype=='sq' or subtype=='sq4' or subtype=='rect' or subtype=='rect4'):
            (ptlst, dicti)=make_quads(strn, subtype, dicti)
        (pj, dicti)=poljob(strn, subtype, pj, dicti, ptlst)
        pj=pj[0]
        n=getLineXsetsPolCoords(pj)
        xsetl=xsetl+n
    return xsetl

def beginUnderstanding(question, datln):
    i=0
    question['data']=[]
    globdict={}
    while i < len(datln):
        stmnt=datln[i]
        if(stmnt.startswith('@')):
            return question
        if(stmnt.startswith('>>>>')):
            question['title']=stmnt[4:]
            i+=1
        elif(stmnt.startswith('##')):
            question['score']=int(stmnt[2:])
            i+=1
        elif(stmnt.startswith('!desc')):
            question['desc']=stmnt[6:]
            i+=1
        elif(stmnt.startswith('$')):
            xset={}
            xset['type']=stmnt[1:]
            while True:
                if(xset['type']=='circle'):
                    i+=1
                    stmnt=datln[i]
                    if(stmnt.startswith('$') or stmnt.startswith('@')):
                        keys=xset.keys()
                        if('radius' not in keys):
                            xset['radius']=''
                        if('center' not in keys):
                            xset['center']=''
                        if('thresh' not in keys):
                            xset['thresh']=4
                        question['data'].append(xset)
                        break
                    stmnt=stmnt[1:]
                    if(stmnt.startswith('radius')):
                        xset['radius']=int(stmnt[7:])
                    elif(stmnt.startswith('diamet')):
                        xset['radius']=int(stmnt[7:])/2
                    elif(stmnt.startswith('thresh')):
                        xset['thresh']=int(stmnt[7:])
                    elif(stmnt.startswith('center')):
                        lst=ptlistdicti(stmnt, globdict)
                        xset['center']=[]
                        xset['center'].append(round(lst[0][0]))
                        xset['center'].append(round(lst[0][1]))
                elif(xset['type']=='tangent'):
                    i+=1
                    stmnt=datln[i]
                    if(stmnt.startswith('$') or stmnt.startswith('@')):
                        keys=xset.keys()
                        if('radius' not in keys):
                            xset['radius']=''
                        if('center' not in keys):
                            xset['center']=''
                        if('int' not in keys):
                            xset['int']=''
                        if('thresh' not in keys):
                            xset['thresh']=4
                        if('length' not in keys):
                            xset['length']=''
                        question['data'].append(xset)
                        break
                    stmnt=stmnt[1:]
                    if(stmnt.startswith('radius')):
                        xset['radius']=int(stmnt[7:])
                    if(stmnt.startswith('thresh')):
                        xset['thresh']=int(stmnt[7:])
                    elif(stmnt.startswith('length')):
                        xset['length']=int(stmnt[7:])
                    elif(stmnt.startswith('center')):
                        lst=ptlistdicti(stmnt, globdict)
                        xset['center']=[]
                        xset['center'].append(round(lst[0][0]))
                        xset['center'].append(round(lst[0][1]))
                    elif(stmnt.startswith('int')):
                        lst=ptlistdicti(stmnt, globdict)
                        xset['int']=[]
                        xset['int'].append(round(lst[0][0]))
                        xset['int'].append(round(lst[0][1]))
                elif(xset['type']=='chord'):
                    i+=1
                    stmnt=datln[i]
                    if(stmnt.startswith('$') or stmnt.startswith('@')):
                        keys=xset.keys()
                        if('radius' not in keys):
                            xset['radius']=''
                        if('thresh' not in keys):
                            xset['thresh']=4
                        if('length' not in keys):
                            xset['length']=''
                        if('center' not in keys):
                            xset['center']=''
                        if('ptA' not in keys):
                            xset['ptA']=''
                        if('ptB' not in keys):
                            xset['ptB']=''
                        question['data'].append(xset)
                        break
                    stmnt=stmnt[1:]
                    if(stmnt.startswith('radius')):
                        xset['radius']=int(stmnt[7:])
                    if(stmnt.startswith('thresh')):
                        xset['thresh']=int(stmnt[7:])
                    elif(stmnt.startswith('length')):
                        xset['length']=int(stmnt[7:])
                    elif(stmnt.startswith('center')):
                        lst=ptlistdicti(stmnt, globdict)
                        xset['center']=[]
                        xset['center'].append(round(lst[0][0]))
                        xset['center'].append(round(lst[0][1]))
                    elif(stmnt.startswith('int')):
                        lst=ptlistdicti(stmnt, globdict)
                        xset['ptA']=[]
                        xset['ptA'].append(round(lst[0][0]))
                        xset['ptA'].append(round(lst[0][1]))
                        xset['ptB']=[]
                        xset['ptB'].append(round(lst[1][0]))
                        xset['ptB'].append(round(lst[1][1]))
                        if(xset['ptA'][0]>xset['ptB'][0]):
                            t=xset['ptA']
                            xset['ptA']=xset['ptB']
                            xset['ptB']=t
                        elif(xset['ptA'][0]==xset['ptB'][0]):
                            if(xset['ptA'][1]>xset['ptB'][1]):
                                t=xset['ptA']
                                xset['ptA']=xset['ptB']
                                xset['ptB']=t
                elif(xset['type']=='line'):
                    i+=1
                    stmnt=datln[i]
                    if(stmnt.startswith('$') or stmnt.startswith('@')):
                        keys=xset.keys()
                        if('length' not in keys):
                            xset['length']=''
                        if('ptA' not in keys):
                            xset['ptA']=''
                        if('ptB' not in keys):
                            xset['ptB']=''
                        if('thresh' not in keys):
                            xset['thresh']=4
                        question['data'].append(xset)
                        break
                    stmnt=stmnt[1:]
                    if(stmnt.startswith('thresh')):
                        xset['thresh']=int(stmnt[7:])
                    elif(stmnt.startswith('length')):
                        xset['length']=int(stmnt[7:])
                    elif(stmnt.startswith('name')):
                        lst=ptlistdicti(stmnt, globdict)
                        xset['ptA']=[]
                        xset['ptA'].append(round(lst[0][0]))
                        xset['ptA'].append(round(lst[0][1]))
                        xset['ptB']=[]
                        xset['ptB'].append(round(lst[1][0]))
                        xset['ptB'].append(round(lst[1][1]))
                        if(xset['ptA'][0]>xset['ptB'][0]):
                            t=xset['ptA']
                            xset['ptA']=xset['ptB']
                            xset['ptB']=t
                        elif(xset['ptA'][0]==xset['ptB'][0]):
                            if(xset['ptA'][1]>xset['ptB'][1]):
                                t=xset['ptA']
                                xset['ptA']=xset['ptB']
                                xset['ptB']=t
                elif(xset['type']=='dicti'):
                    i+=1
                    stmnt=datln[i]
                    if(stmnt.startswith('$') or stmnt.startswith('@')):
                        keys=xset.keys()
                        if('points' not in keys):
                            xset['points']=[]
                        question['data'].append(xset)
                        break
                    if(stmnt.startswith('#')):
                        xset['points']=getdict(stmnt[1:])
                        globdict=xset['points']
                elif(xset['type']=='stat'):
                    i+=1
                    stmnt=datln[i]
                    if(stmnt.startswith('$') or stmnt.startswith('@')):
                        shift['xshift']=0
                        shift['yshift']=0
                        break
                    stmnt=stmnt[1:]
                    if(stmnt.startswith('trans')):
                        stmnt=stmnt[6:]
                        lst=ptlistdicti(stmnt, globdict)
                        shift['xshift']=round(lst[0][0])
                        shift['yshift']=round(lst[0][1])
                    else:
                        question['data']=question['data']+xsetgen(globdict, stmnt)
                elif(xset['type']=='poly'):
                    i+=1
                    stmnt=datln[i]
                    if(stmnt.startswith('$') or stmnt.startswith('@')):
                        break
                    question['data']=question['data']+xsetgen(globdict, stmnt)