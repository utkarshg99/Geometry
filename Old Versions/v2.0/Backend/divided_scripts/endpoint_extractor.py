import re
from helpers import getdict
def extract(string, dicti={}):
    dicti = getdict(string, dicti)
    regex=r".*?([A-Z])+?"
    matchiter=re.finditer(regex, string)
    for match in matchiter:
        val = match.group(1)
        if(val in dicti):
            print ("Point labelled "+val+" is "+str(dicti[val]))
        else:
            print ("Point labelled "+val+" not found.")
    return dicti