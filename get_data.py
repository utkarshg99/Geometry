import re
from helpers import getdict
def make_circle(strn, dicti={}):
    reglen=r"([-+]?\d+) *?cm"
    mtiter=re.finditer(reglen, strn)
    leng=0
    for tr in mtiter:
        leng=float(tr.group(1))
        break
    regpt=r"([A-Z]).*?"
    matchiter_pts=re.finditer(regpt, strn)
    ptcrd=[]
    ptlst=[]
    if ('diameter' in strn):
        leng=leng/2
    key = dicti.keys()
    for pt in matchiter_pts:
        if(pt.group(1) in key):
            ptcrd.append(dicti[pt.group(1)])
        else:
            ptlst.append(pt.group(1))
    if(len(ptcrd)==1):
        return (ptcrd[0], leng, ptlst)
    if(len(ptcrd)==0):
        return ((0, 0), leng, ptlst)

def make_line(strn, dicti={}):
    reglen=r"([-+]?\d+).*?cm"
    mtiter=re.finditer(reglen, strn)
    leng=0
    for tr in mtiter:
        leng=float(tr.group(1))
        break
    regpt=r"([A-Z]).*?"
    matchiter_pts=re.finditer(regpt, strn)
    ptcrd=[]
    ptlst=[]
    key = dicti.keys()
    for pt in matchiter_pts:
        if(pt.group(1) in key):
            ptcrd.append(dicti[pt.group(1)])
        else:
            ptlst.append(pt.group(1))
    ptlst.reverse()
    if(len(ptcrd)==2):
        return (ptcrd[0], ptcrd[1], 0, ptlst)
    if(len(ptcrd)==1):
        return (ptcrd[0], (0, 0), leng, ptlst)
    if(len(ptcrd)==0):
        return ((0, 0), (0, 0), leng, ptlst)
# strn = "draw a circle of radius length 30cm"
# strn="draw a circle with centre C having coords (70, 67) with dia=40cm"
# strn = "draw a line conecting points A with co-ordinates (90,90) and (30,50) of length 230 cm"
# strn="draw a line AB of length 10 cm"
# dicti=getdict(strn, {})
# print(make_line(strn, dicti))