import re
import math
def getdict(string, dicti={}):
    regex_pts = r"([A-Z]).*?"
    regex_cords=r"(\(([-+]?\d+),.*?([-+]?\d+)\))"
    matchiter_cord=re.finditer(regex_cords, string)
    matchiter_pts=re.finditer(regex_pts, string)
    for (cord,pt) in zip(matchiter_cord, matchiter_pts):
        dicti[pt.group(1)]=(float(cord.group(2)),float(cord.group(3)))
    return dicti

def eu_dist(ptA, ptB):
    d=math.sqrt((ptA[0]-ptB[0])**2+(ptA[1]-ptB[1])**2)
    return d

def beginUnderstanding(question, datln):
    i=0
    question['data']=[]
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
                            xset['thresh']=0
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
                        stmnt='A'+stmnt
                        xs=getdict(stmnt, {})['A']
                        xset['center']=[]
                        xset['center'].append(round(xs[0]))
                        xset['center'].append(round(xs[1]))
                elif(xset['type']=='tangent'):
                    i+=1
                    stmnt=datln[i]
                    if(stmnt.startswith('$') or stmnt.startswith('@')):
                        keys=xset.keys()
                        if('radius' not in keys):
                            xset['radius']=''
                        if('thresh' not in keys):
                            xset['thresh']=0
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
                elif(xset['type']=='chord'):
                    i+=1
                    stmnt=datln[i]
                    if(stmnt.startswith('$') or stmnt.startswith('@')):
                        keys=xset.keys()
                        if('radius' not in keys):
                            xset['radius']=''
                        if('thresh' not in keys):
                            xset['thresh']=0
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