import sys
import os
import re
import json
import math
from xtestprocessor import beginUnderstanding
from pymongo import MongoClient
from pprint import pprint
from bson import objectid

client = MongoClient('mongodb://127.0.0.1:27017/')
db=client.admin

uid=sys.argv[1]
uid=objectid.ObjectId(uid)
datln=[]
question={}
strn=''
data=[]
questions=db.quesdatas.find_one({'usersdinp' : uid})
questions=questions['questions'].split('\n')

for strn in questions:
    strn=strn.strip()
    if(strn=='&done&' or len(strn)==0):
        data=data
        db.quesrespdatas.update_one({'usersdresp' : uid}, {'$set' : {'data' : data}})
        break
    datln.append(strn)
    if(strn=='@end'):
        question=beginUnderstanding({}, datln)
        datln=[]
        data.append(question)