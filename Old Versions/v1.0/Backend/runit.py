import os
wd=os.getcwd()
if(not wd.endswith('Backend')):
    os.chdir(wd+'\Backend')
while True:
    flag=0
    while True:
        fl=open('../Middleware/status.uk','r')
        gl=open('../Middleware/qstatus.uk','r')
        st=fl.readline()
        ts=gl.readline()
        if(st=='Wait'):
            fl.close()
            flag=1
            break
        if(ts=='Wait'):
            flag=2
            gl.close()
            break
        gl.close()
        fl.close()
    print("Processing at Backend....")
    if(flag==1):
        os.system("python3 runner.py")
    elif(flag==2):
        os.system("python3 questionparser.py")