from helpers import getdict as gt
from endpoint_extractor import extract as ex
from jobgenerator import ljob
from jobgenerator import cjob
from decider import decide
from get_data import make_circle
from get_data import make_line
dicti={}
lj=[]
cj=[]
fly=open('command.txt','a')
mkd=open('resuting.txt','a')
while True:
    strn=input('Enter the command -> (Leave it empty to end excution) <- :')
    fly.write(strn+'\n')
    if(len(strn)==0):
        fly.close()
        mkd.close()
        break
    dicti = gt(strn, dicti)
    (ftype, subtype)=decide(strn)
    if(ftype == 'line'):
        (ptA, ptB, lent, lst)=make_line(strn, dicti)
        (lj, dicti)=ljob(lj, lent, ptA, ptB, lst, dicti)
        print('line job update')
        print((lj, dicti))
        mkd.write('line job update\n')
    elif(ftype == 'circle'):
        (cen, rad, lst)=make_circle(strn, dicti)
        (cj, dicti)=cjob(cj, rad, cen, lst, dicti)
        print('circle job update')
        print((cj, dicti))
        mkd.write('circle job update\n')
    else:
        print('polygon job update, multiple line generating... : Sub-type : '+subtype)
        mkd.write('polygon job update, multiple line generating... : Sub-type : '+subtype)