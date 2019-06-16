import re
import math
def ljob(lj=[], slope=0, lent=0, ptA=(0,0), ptB=(0,0), lst=[], dicti={}):
    angrad=math.atan(slope)
    if(ptA==(0,0) and ptB==(0,0)):
        if(len(lst)==2):
            for i in lst:
                dicti[i]=(0,0)
        if(len(lst)==1):
            dicti[lst[0]]=(lent*math.cos(angrad),lent*math.sin(angrad))
            ptB=dicti[lst[0]]
        if((len(lst)>2 or len(lst)==0) and lent==0):
            print("A line cannot have more than 2 end-points and it can't be made with 0 points.")
    if(ptB==(0,0)):
        if(len(lst)>0 and lent!=0):
            dicti[lst[0]]=(ptA[0]+lent*math.cos(angrad), ptA[1]+lent*math.sin(angrad))
            ptB=dicti[lst[0]]
        elif(len(lst)>=0 and lent==0):
            ptB=(0,0)
        else:
            ptB=(ptA[0]+lent*math.cos(angrad), ptA[1]+lent*math.sin(angrad))
    lj.append((ptA, ptB))
    return (lj,dicti)

def cjob(cj=[], rad=0, ptA=(0,0), lst=[], dicti={}):
    if(ptA==(0,0)):
        if(len(lst)>0):
            dicti[lst[0]]=ptA
    cj.append((ptA, rad))
    return (cj,dicti)

def genpol(strng, dicti, lj=[]):
    lj2=lj[:]
    p1=0
    p2=1
    regex=r".*?([A-Z]+)"
    strng=re.finditer(regex, strng)
    if (strng==None):
        return lj2
    for match in strng:
        strng=match.group(1)
        break
    ky=dicti.keys()
    if(len(strng)<2):
        return lj2
    for x in range(len(strng)-1):
        p1=x
        p2=p1+1
        if(strng[p1] in ky and strng[p2] in ky):
            lj=ljob(lj, 0, dicti[strng[p1]], dicti[strng[p2]])
        else:
            return lj2
    return lj

def poljob(strng, subtype, pj=[], dicti={}, ptlst=[]):
    if(ptlst!=[]):
        pj.append(tuple(ptlst))
    return (pj, dicti)