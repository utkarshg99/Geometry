import os
os.system("npm i node-watch")
if(os.name=='nt'):
    os.system('start "" python ./Backend/runit.py')
    os.system('start "" node ./Middleware/strserve.js')
    os.system('start "" ./Frontend/UI.html')
if(os.name=='posix'):
    os.system('python ./Backend/runit.py &')
    os.system('node ./Middleware/strserve.js &')
    os.system('./Frontend/UI.html &')