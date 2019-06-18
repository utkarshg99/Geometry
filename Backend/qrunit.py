import os
import json
wd=os.getcwd()
if(not wd.endswith('Backend')):
    os.chdir(wd+'\Backend')
def runner():
    while True:
        name=[]
        while True:
            fl=open('../Middleware/userlist2.json','r')
            dicti=json.load(fl)
            if(len(dicti['awaiting-question'])!=0):
                name.append(dicti['awaiting-question'].pop())
                fl.close()
                fl=open('../Middleware/userlist2.json','w')
                fl.write(json.dumps(dicti))
                fl.close()
                break
            fl.close()
        print("Processing at Backend....")
        fname="python3 questionparser.py "+name[0]
        os.system(fname)
try:
    runner()
except:
    runner()