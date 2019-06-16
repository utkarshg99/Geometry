import os
import re
import json
from helpers import beginUnderstanding

rques=open("../Middleware/rawques.uk",'r')
ques=open("../Middleware/questions.json",'w')
status=open("../Middleware/qstatus.uk",'w')

datln=[]
question={}
strn=''
data=[]

while True:
    strn=rques.readline()
    strn=strn.strip()
    if(strn=='&done&' or len(strn)==0):
        ques.write(json.dumps(data))
        ques.close()
        rques.close()
        status.write("Go")
        status.close()
        break
    datln.append(strn)
    if(strn=='@end'):
        question=beginUnderstanding({}, datln)
        datln=[]
        data.append(question)