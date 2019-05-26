import re
import json
from helpers import getdict as gt
from jobgenerator import ljob
from jobgenerator import cjob
from jobgenerator import poljob
from decider import decide
from get_data import make_circle
from get_data import make_line
from get_data import make_poly_gen
from get_data import make_poly_reg
from get_data import make_quads

class flaskcom():

    dicti={}
    lj=[]
    cj=[]
    pj=[]

    commandlist={'clear stack':'reset point stack','status':'show all queued jobs','clear all':'reset application status','pop [_point(s)_]':'remove specified points from stack'}

    fly=open('./results/command.txt','a')
    mkd=open('./results/resuting.txt','a')
    lists=open('./results/lists.txt','a')
    dic=open('./results/dictionaries.txt','a')

    def inp(self, strn):
        fly=self.fly
        mkd=self.mkd
        lists=self.lists
        dic=self.dic
        commandlist=self.commandlist
        dicti=self.dicti
        lj=self.lj
        cj=self.cj
        pj=self.pj

        if(strn=='show'):
            for k, v in commandlist.items():
                print('{:<16s}{:^5s}{:<20s}'.format(k,':',v))
            return
        if(strn=='clear stack'):
            dicti={}
            return
        if(strn=='status'):
            print("Dictionary : ")
            print(dicti)
            print("Current Line Jobs : ")
            print(lj)
            print("Current Circle Jobs : ")
            print(cj)
            print("Current Polygon Jobs : ")
            print(pj)
            return
        if(strn=='clear all'):
            dicti={}
            lj=[]
            cj=[]
            pj=[]
            return
        if(strn.startswith('pop')):
            reg=r'([A-Z])+.*?'
            matchiter=re.finditer(reg, strn)
            for tr in matchiter:
                dicti.pop(tr.group(1))
            return
        fly.write(strn+'\n')
        if(len(strn)==0):
            fly.close()
            mkd.write('\n')
            mkd.close()
            lists.write('\n')
            lists.close()
            dic.write('\n')
            dic.close()
            return

        dicti = gt(strn, dicti)
        (ftype, subtype)=decide(strn)
        if(ftype == 'line'):
            slope=0
            (ptA, ptB, lent, lst, slope)=make_line(strn, dicti)
            (lj, dicti)=ljob(lj, slope, lent, ptA, ptB, lst, dicti)
            print('line job update')
            print((lj, dicti))
            lists.write(str(lj)+'\n')
            mkd.write('line job update\n')
            dic.write(json.dumps(dicti)+'\n')
        elif(ftype == 'circle'):
            (cen, rad, lst)=make_circle(strn, dicti)
            (cj, dicti)=cjob(cj, rad, cen, lst, dicti)
            print('circle job update')
            print((cj, dicti))
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
            print((pj, dicti))
            lists.write(str(pj)+'\n')
            mkd.write('polygon job update, multiple line generating... : Sub-type : '+subtype+'\n')
            dic.write(json.dumps(dicti)+'\n')
        else:
            print("Undealt Currently")
    
    