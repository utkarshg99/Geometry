import os
if(os.name=='nt'):
    os.system('start "Backend : Computational Engine" python3 ./Backend/runit.py')
    os.system('start "Backend : Computational Engine 2" python3 ./Backend/qrunit.py')
    os.system('start "Middleware : Transfer Server" node ./Middleware/strserve.js')
    os.system('start "Frontend : User Interface" ./Frontend/UI.html')
if(os.name=='posix'):
    os.system('python3 ./Backend/runit.py &')
    os.system('python3 ./Backend/qrunit.py &')
    os.system('node ./Middleware/strserve.js &')
    # os.system('w3m ./Frontend/UI.html &')