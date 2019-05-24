import re
import math
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

def make_poly_gen(strn, dicti={}):
    lst_pts=[]
    key=dicti.keys()
    regpt=r"([A-Z]).*?"
    matchiter_pts=re.finditer(regpt, strn)
    for pt in matchiter_pts:
        if(pt.group(1) in key):
            lst_pts.append(dicti[pt.group(1)])
    return lst_pts

def make_poly_reg(strn, dicti={}, subtype=''):
    lst_pts=[]
    reglen=r"([-+]?\d+) *?cm"
    mtiter=re.finditer(reglen, strn)
    leng=0
    if(subtype==''):
        return
    n=int(subtype)
    for tr in mtiter:
        leng=float(tr.group(1))
        break
    angdif=math.pi*2/n
    r=leng/(2*math.sin(angdif/2))
    r=float('%.4f'%(r))
    cen=(0,0)
    key=dicti.keys()
    regpt=r"([A-Z]).*?"
    matchiter_pts=re.finditer(regpt, strn)
    for pt in matchiter_pts:
        if(pt.group(1) in key):
            cen=dicti[pt.group(1)]
        else:
            dicti[pt.group(1)]=cen
    if (cen==(0,0)):
        regex_cords=r"(\(([-+]?\d+),.*?([-+]?\d+)\))"
        matchiter_cord=re.finditer(regex_cords, strn)
        for cord in matchiter_cord:
            cen=(float(cord.group(2)),float(cord.group(3)))
    ang=0
    print(r)
    for i in range(n):
        ang=i*angdif
        x1=cen[0]+r*math.cos(ang)
        y1=cen[1]+r*math.sin(ang)
        x1=float('%.4f'%(x1))
        y1=float('%.4f'%(y1))
        lst_pts.append((x1,y1))
    return (lst_pts, dicti)

def make_square(strn, dicti={}):
    pass
# strn = "draw a circle of radius length 30cm"
# strn="draw a circle with centre C having coords (70, 67) with dia=40cm"
# strn = "draw a line conecting points A with co-ordinates (90,90) and (30,50) of length 230 cm"
# strn="draw a line AB of length 10 cm"
# strn="draw a polygon ABCD with (10,20) (90,80) (30,40) (50,60)"
# dicti=getdict(strn, {})
# print(make_poly(strn, dicti))