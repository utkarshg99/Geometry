import os
import json
from pymongo import MongoClient
from pprint import pprint

client = MongoClient('mongodb://127.0.0.1:27017/')
db=client.admin
wd=os.getcwd()
if(not wd.endswith('Backend')):
    os.chdir(wd+'\Backend')
def runner():
    while True:
        while True:
            user = db.users.find_one({'status':True})
            if(user == None):
                continue
            ids = []
            ids.append(str(user['_id']))
            if(len(ids)!=0):
                user['status']=False
                db.users.update_one({'_id' : user['_id']}, {'$set' : {'status' : False}})
                break
        print("Processing at Backend....")
        fname="python3 runner.py "+ids[0]
        os.system(fname)
try:
    runner()
except:
    runner()