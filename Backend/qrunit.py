import os
import json
from pymongo import MongoClient
from pprint import pprint

print("Computation Engine 2")
client = MongoClient('mongodb://127.0.0.1:27017/')
db=client.admin
wd=os.getcwd()
if(not wd.endswith('Backend')):
    os.chdir(wd+'/Backend')
def runner():
    while True:
        while True:
            user = db.users.find_one({'processed':True})
            if(user == None):
                continue
            ids = []
            ids.append(str(user['_id']))
            if(len(ids)!=0):
                user['processed']=False
                db.users.update_one({'_id' : user['_id']}, {'$set' : {'processed' : False}})
                break
        print("Processing at Backend....")
        fname="python3 questionparser.py "+ids[0]
        os.system(fname)
try:
    runner()
except:
    runner()