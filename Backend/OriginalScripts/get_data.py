import re
import math
from helpers import getdict
def make_circle(strn, dicti={}):
    cen =(0,0)
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
        cen=ptcrd[0]
    if(len(ptcrd)==0):
        if (cen==(0,0)):
            regex_cords=r"(\(([-+]?\d+),.*?([-+]?\d+)\))"
            matchiter_cord=re.finditer(regex_cords, strn)
            for cord in matchiter_cord:
                cen=(float(cord.group(2)),float(cord.group(3)))
    return (cen, leng, ptlst)

def make_line(strn, dicti={}):
    regslope=r'(([-+]?\d+) *?cm)'
    reglen=r"([-+]?\d+) *?cm"
    mtiter=re.finditer(reglen, strn)
    leng=0
    for tr in mtiter:
        leng=float(tr.group(1))
        break
    nsiter=re.finditer(regslope, strn)
    for tr in nsiter:
        nslope=tr.group(1)
        strn=strn.replace(nslope, '')
    regslp=r'slope ([-+]?\d+)'
    sliter=re.finditer(regslp, strn)
    slope=0
    for tr in sliter:
        slope=float(tr.group(1))
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
        return (ptcrd[0], ptcrd[1], 0, ptlst, slope)
    if(len(ptcrd)==1):
        return (ptcrd[0], (0, 0), leng, ptlst, slope)
    if(len(ptcrd)==0):
        return ((0, 0), (0, 0), leng, ptlst, slope)

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
    t=''
    if(subtype[len(subtype)-1]=='n'):
        t='n'
        subtype=subtype[:len(subtype)-1]
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
    i=0
    matchiter_pts=re.finditer(regpt, strn)
    if(t=='n'):
        for pt in matchiter_pts:
            if(i==n):
                break
            ang=i*angdif
            x1=cen[0]+r*math.cos(ang)
            y1=cen[1]+r*math.sin(ang)
            x1=float('%.4f'%(x1))
            y1=float('%.4f'%(y1))
            lst_pts.append((x1,y1))
            dicti[pt.group(1)]=(x1,y1)
            i+=1
    else:
        for i in range(n):
            ang=i*angdif
            x1=cen[0]+r*math.cos(ang)
            y1=cen[1]+r*math.sin(ang)
            x1=float('%.4f'%(x1))
            y1=float('%.4f'%(y1))
            lst_pts.append((x1,y1))
    return (lst_pts, dicti)

def make_quads(strn, sub, dicti={}):
    ptlst=[]
    reglen=r"([-+]?\d+) *?cm"
    mtiter=re.finditer(reglen, strn)
    leng=0
    brea=0
    for tr in mtiter:
        brea=float(tr.group(1))
        break
    for tr in mtiter:
        leng=float(tr.group(1))
        break
    if(leng==0):
        leng=brea
    bl=(0,0)
    key=dicti.keys()
    regpt=r"([A-Z]).*?"
    matchiter_pts=re.finditer(regpt, strn)
    for pt in matchiter_pts:
        if(pt.group(1) in key):
            bl=dicti[pt.group(1)]
        else:
            dicti[pt.group(1)]=bl
    if (bl==(0,0)):
        regex_cords=r"(\(([-+]?\d+),.*?([-+]?\d+)\))"
        matchiter_cord=re.finditer(regex_cords, strn)
        for cord in matchiter_cord:
            bl=(float(cord.group(2)),float(cord.group(3)))
            break
    tl=(bl[0], bl[1]+leng)
    tr=(bl[0]+brea, bl[1]+leng)
    br=(bl[0]+brea, bl[1])
    x=0
    if(sub=='sq4' or sub=='rect4'):
        matchiter_pts=re.finditer(regpt, strn)
        for pt in matchiter_pts:
            if(x==0):
                dicti[pt.group(1)]=bl
            if(x==1):
                dicti[pt.group(1)]=tl
            if(x==2):
                dicti[pt.group(1)]=tr
            if(x==3):
                dicti[pt.group(1)]=br
            x+=1
    ptlst.append(bl)
    ptlst.append(tl)
    ptlst.append(tr)
    ptlst.append(br)
    return (ptlst, dicti)   
    
def make_rect(strn, sub, dicti={}):
    ptlst=[]
    reglen=r"([-+]?\d+) *?cm"
    mtiter=re.finditer(reglen, strn)
    leng=0
    brea=0
    for tr in mtiter:
        brea=float(tr.group(1))
        break
    for tr in mtiter:
        leng=float(tr.group(1))
        break
    bl=(0,0)
    key=dicti.keys()
    regpt=r"([A-Z]).*?"
    matchiter_pts=re.finditer(regpt, strn)
    for pt in matchiter_pts:
        if(pt.group(1) in key):
            bl=dicti[pt.group(1)]
        else:
            dicti[pt.group(1)]=bl
    if (bl==(0,0)):
        regex_cords=r"(\(([-+]?\d+),.*?([-+]?\d+)\))"
        matchiter_cord=re.finditer(regex_cords, strn)
        for cord in matchiter_cord:
            bl=(float(cord.group(2)),float(cord.group(3)))
            break
    tl=(bl[0], bl[1]+leng)
    tr=(bl[0]+brea, bl[1]+leng)
    br=(bl[0]+brea, bl[1])
    x=0
    if(sub=='rect4'):
        matchiter_pts=re.finditer(regpt, strn)
        for pt in matchiter_pts:
            if(x==0):
                dicti[pt.group(1)]=bl
            if(x==1):
                dicti[pt.group(1)]=tl
            if(x==2):
                dicti[pt.group(1)]=tr
            if(x==3):
                dicti[pt.group(1)]=br
            x+=1
    ptlst.append(bl)
    ptlst.append(tl)
    ptlst.append(tr)
    ptlst.append(br)
    return (ptlst, dicti) 