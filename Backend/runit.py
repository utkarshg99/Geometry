import os
import json
wd=os.getcwd()
if(not wd.endswith('Backend')):
    os.chdir(wd+'\Backend')
def runner():
    while True:
        name=[]
        while True:
            fl=open('../Middleware/userlist.json','r')
            dicti=json.load(fl)
            if(len(dicti['awaiting-solve'])!=0):
                name.append(dicti['awaiting-solve'].pop())
                fl.close()
                fl=open('../Middleware/userlist.json','w')
                fl.write(json.dumps(dicti))
                fl.close()
                break
            fl.close()
        print("Processing at Backend....")
        fname="python3 runner.py "+name[0]
        os.system(fname)
try:
    runner()
except:
    runner()