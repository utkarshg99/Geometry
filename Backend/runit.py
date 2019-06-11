import os
wd=os.getcwd()
if(not wd.endswith('Backend')):
    os.chdir(wd+'\Backend')
while True:
    while True:
        fl=open('../Middleware/status.uk','r')
        st=fl.readline()
        if(st=='Wait'):
            fl.close()
            break
        fl.close()
    print("Processing at Backend....")
    os.system("python3 runner.py")