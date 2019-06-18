import os
import json
wd=os.getcwd()
if(not wd.endswith('Backend')):
    os.chdir(wd+'\Backend')
while True:
    while True:
        gl=open('../Middleware/qstatus.uk','r')
        ts=gl.readline()
        if(ts=='Wait'):
            gl.close()
            break
        gl.close()
    print("Processing at Backend....")
    os.system("python3 questionparser.py")