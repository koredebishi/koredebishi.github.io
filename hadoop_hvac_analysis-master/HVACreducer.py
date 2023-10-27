#!/usr/bin/env python

from operator import itemgetter
import sys

current_system = None
current_diff = 0
system = None
sys_count = 0
temp_array = []
sys_array = []

# input comes from STDIN
for line in sys.stdin:
    # remove leading and trailing whitespace
    line = line.strip()

    # parse the input we got from mapper.py
    system, t_temp, a_temp = line.split(' ')

    # convert count (currently a string) to int
    try:
        t_temp = int(t_temp)
        a_temp = int(a_temp)
    except ValueError:
        # count was not a number, so silently
        # ignore/discard this line
        continue

    # this IF-switch only works because Hadoop sorts map output
    # by key (here: word) before it is passed to the reducer
    
    if current_system == system:
        sys_count += 1
        current_diff += (abs(float(t_temp) - float(a_temp)))
    else:
        if current_system:
            # write result to STDOUT
            current_diff = current_diff/sys_count
            temp_array.append(current_diff)
            sys_array.append(current_system)
            print '%s %s' % (current_system, current_diff)
        current_diff += (abs(float(t_temp) - float(a_temp)))
        sys_count = 1 
        current_system = system



# do not forget to output the last word if needed!
if current_system == system:
    print '%s %s' % (current_system, current_diff)

print "_ _ _ _ _ _ _"
print sorted(zip(temp_array, sys_array), reverse=True)[:3]
