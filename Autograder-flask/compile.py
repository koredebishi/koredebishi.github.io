#!/usr/bin/env python3
import os
import subprocess

subprocess.call("rm -f ./a.out", shell=True)



retcode = subprocess.call("/usr/bin/g++ compile/walk.cc", shell=True)
if retcode:
    print("failed to compile walk.cc")
    exit

d =subprocess.call("rm -f ./output", shell=True)

retcode = subprocess.call("./test.sh", shell=True)
d = subprocess.call("./test.sh", shell=True)

print ("Score: " + str(retcode+d) + " out of 2 correct.")

print("*************Original submission*************")
with open('compile/walk.cc','r') as fs:
     print(fs.read())
















# #!/usr /bin/env python3
# import os
# import subprocess


# subprocess.call("rm -f ./a.out ", shell=True)

# retcode = subprocess.call ("/usr/bin/g++ compile/walk.cc", shell= True)

# if retcode: 
#     print("failed to compile walk.cc")
#     exit

# subprocess.call("rm -f ./output", shell=True)
# retcode = subprocess.call ("./test.sh", shell= True)

# print("Score: " + str(retcode) + " out of 2 correct.")

# print("*************Original submission*************")

# with open('compile/walk.cc','r') as fs:
#     print(fs.read())

# retcode = subprocess.call("./test.sh", shell=True)
# here = os.path.dirname(os.path.realpath(__file__))
# subdir = "compile"
# filename = "name"
# filepath = os.path.join(here, subdir, filename)
# resultFile= open(filepath,"a")
# resultFile.write("Score: " + str(retcode) + " out of 2 correct.\n")
# resultFile.write("*************Original submission*************\n")

# resultFile.close()











