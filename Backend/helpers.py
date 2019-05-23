import re
import math
# import itertools
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

# print(getdict("nigga RHINO  hdsihfihdho (90,500) , A (150,89) \ D (646465,3468461315648515)",{}))