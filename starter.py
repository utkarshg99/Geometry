import os
# os.system("npm i node-watch")
if(os.name=='nt'):
    os.system('start "Backend : Computational Engine" python ./Backend/runit.py')
    os.system('start "Middleware : Transfer Server" node ./Middleware/strserve.js')
    os.system('start "Frontend : User Interface" ./Frontend/UI.html')
if(os.name=='posix'):
    os.system('python ./Backend/runit.py &')
    os.system('node ./Middleware/strserve.js &')
    os.system('./Frontend/UI.html &')