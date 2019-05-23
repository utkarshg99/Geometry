import re
from coordinate_finder import getdict
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
    if ('diameter' in strn):
        leng=leng/2
    key = dicti.keys()
    for pt in matchiter_pts:
        if(pt.group(1) in key):
            ptcrd.append(dicti[pt.group(1)])
    if(len(ptcrd)==1):
        return (ptcrd[0], leng)
    if(len(ptcrd)==0):
        return ((0, 0), leng)
# strn = "draw a circle of radius length 30cm"
# strn="draw a circle with centre C having coords (70, 67) with dia=40cm"
# dicti=getdict(strn, {})
# print(make_circle(strn, dicti))