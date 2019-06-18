import sys
import re
import json
from helpers import getdict as gt
from helpers import eu_dist
from jobgenerator import ljob
from jobgenerator import cjob
from jobgenerator import poljob
from decider import decide
from get_data import make_circle
from get_data import make_line
from get_data import make_poly_gen
from get_data import make_poly_reg
from get_data import make_quads

dicti={}
lj=[]
cj=[]
pj=[]
name=sys.argv[1]
linejobs='../UserData/'+name+'/linejobs.uk'
circlejobs='../UserData/'+name+'/circlejobs.uk'
polyjobs='../UserData/'+name+'/polyjobs.uk'
cmds='../UserData/'+name+'/commands.uk'
status='../UserData/'+name+'/status.uk'

commandlist={'clear stack':'reset point stack','status':'show all queued jobs','clear all':'reset application status','pop [_point(s)_]':'remove specified points from stack'}
fly=open('./results/command.txt','a')
mkd=open('./results/resuting.txt','a')
lists=open('./results/lists.txt','a')
dic=open('./results/dictionaries.txt','a')
linejobs=open(linejobs,'w')
circlejobs=open(circlejobs,'w')
polyjobs=open(polyjobs,'w')
cmds=open(cmds,'r')
status=open(status,'w')

while True:
    # strn=input('Enter the command -> (Leave it empty to end excution) <- : ')
    strn=cmds.readline()
    if(strn=='show'):
        for k, v in commandlist.items():
            print('{:<16s}{:^5s}{:<20s}'.format(k,':',v))
        continue
    if(strn.startswith('get length') or strn.startswith('get distance') or strn.startswith('find length') or strn.startswith('calculate distance') or strn.startswith('calculate length') or strn.startswith('find distance')):
        dicti=gt(strn,dicti)
        regpt=r'([A-Z])'
        regex_cords=r"(\(([-+]?\d+),.*?([-+]?\d+)\))"
        matchiter=re.finditer(regpt, strn)
        key=dicti.keys()
        ptA=(0, 0)
        ptB=(0, 0)
        for tr in matchiter:
            if(tr.group(1) in key):
                ptA=dicti[tr.group(1)]
            break
        for tr in matchiter:
            if(tr.group(1) in key):
                ptB=dicti[tr.group(1)]
            break
        if(ptA==(0,0) and ptB==(0,0)):
            matchiter=re.finditer(regex_cords, strn)
            for tr in matchiter:
                ptA=(float(tr.group(2)),float(tr.group(3)))
                break
            for tr in matchiter:
                ptB=(float(tr.group(2)),float(tr.group(3)))
                break
        dist=eu_dist(ptA, ptB)
        print("Distance between the given Points is : "+str(dist))
        continue
    if(strn=='clear stack'):
        dicti={}
        continue
    if(strn=='status'):
        print("Dictionary : ")
        print(dicti)
        print("Current Line Jobs : ")
        print(lj)
        print("Current Circle Jobs : ")
        print(cj)
        print("Current Polygon Jobs : ")
        print(pj)
        continue
    if(strn=='clear all'):
        dicti={}
        lj=[]
        cj=[]
        pj=[]
        continue
    if(strn.startswith('pop')):
        reg=r'([A-Z])+.*?'
        matchiter=re.finditer(reg, strn)
        for tr in matchiter:
            dicti.pop(tr.group(1))
        continue
    fly.write(strn+'\n')
    if(len(strn)==0 or strn=='end'):
        fly.close()
        mkd.write('\n')
        mkd.close()
        lists.write('\n')
        lists.close()
        dic.write('\n')
        dic.close()
        linejobs.write(str(lj))
        linejobs.close()
        circlejobs.write(str(cj))
        circlejobs.close()
        for x in pj:
            polyjobs.write(str(x)+'\n')
        polyjobs.close()
        status.write("Go")
        status.close()
        break

    dicti = gt(strn, dicti)
    (ftype, subtype)=decide(strn)
    if(ftype == 'line'):
        slope=0
        (ptA, ptB, lent, lst, slope)=make_line(strn, dicti)
        (lj, dicti)=ljob(lj, slope, lent, ptA, ptB, lst, dicti)
        print('line job update')
        # print((lj, dicti))
        lists.write(str(lj)+'\n')
        mkd.write('line job update\n')
        dic.write(json.dumps(dicti)+'\n')
    elif(ftype == 'circle'):
        (cen, rad, lst)=make_circle(strn, dicti)
        (cj, dicti)=cjob(cj, rad, cen, lst, dicti)
        print('circle job update')
        # print((cj, dicti))
        lists.write(str(cj)+'\n')
        mkd.write('circle job update\n')
        dic.write(json.dumps(dicti)+'\n')
    elif(ftype == 'poly'):
        print('polygon job update, multiple line generating... : Sub-type : '+subtype)
        if(subtype!='' and subtype!='sq' and subtype!='rect'):
            ptlst=make_poly_gen(strn, dicti)
        if(subtype[len(subtype)-1]=='r'):
            (ptlst, dicti)=make_poly_reg(strn, dicti, subtype[:len(subtype)-1])
        if(subtype=='sq' or subtype=='sq4' or subtype=='rect' or subtype=='rect4'):
            (ptlst, dicti)=make_quads(strn, subtype, dicti)
        (pj, dicti)=poljob(strn, subtype, pj, dicti, ptlst)
        # print((pj, dicti))
        lists.write(str(pj)+'\n')
        mkd.write('polygon job update, multiple line generating... : Sub-type : '+subtype+'\n')
        dic.write(json.dumps(dicti)+'\n')
    else:
        print("Undealt Currently")