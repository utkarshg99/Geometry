import sys
import os
import re
import json
import math
from xtestprocessor import beginUnderstanding


name=sys.argv[1]
rques='../UserData/'+name+'/rawques.uk'
ques='../UserData/'+name+'/questions.json'
status='../UserData/'+name+'/qstatus.uk'

rques=open(rques,'r')
ques=open(ques,'w')
status=open(status,'w')

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