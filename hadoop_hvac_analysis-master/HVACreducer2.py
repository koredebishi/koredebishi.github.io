#!/usr/bin/env python

from operator import itemgetter
import sys
import datetime

current_building = None
current_heat = 0
build_count = 0
building = None
build_array = []
heat_array =[]

AM = datetime.datetime.strptime("09:00:00", '%H:%M:%S')
PM = datetime.datetime.strptime("17:00:00", '%H:%M:%S')
AM = AM.time().isoformat()
PM = PM.time().isoformat()

# input comes from STDIN
for line in sys.stdin:
    # remove leading and trailing whitespace
    line = line.strip()

    # parse the input we got from mapper.py
    building, str_time, a_temp, date = line.split(' ')

    # convert temperature and time (currently a string) to int and datetime respectively
    try:
        time = datetime.datetime.strptime(str_time, '%H:%M:%S')
        time = time.time().isoformat()
        a_temp = int(a_temp)
    except ValueError:
        # count was not a number, so silently
        # ignore/discard this line
        continue

    # this IF-switch only works because Hadoop sorts map output
    # by key (here: word) before it is passed to the reducer

    #print time + " " + str(a_temp)
    if (AM <= time <= PM):
        if current_building == building:
            current_heat += a_temp
            build_count += 1
        else:
            if current_building:
                # write result to STDOUT
                current_heat = float(current_heat)/float(build_count)
                heat_array.append(current_heat)
                build_array.append(current_building)
                print '%s %s' % (current_building, current_heat)
            current_building = building
            current_heat = 0
            build_count = 1

# do not forget to output the last word if needed!
if current_building == building:
    print '%s %s' % (current_building, current_heat)
print "_ _ _ _ _ _ _"

print sorted(zip(heat_array, build_array), reverse=True)[:3]
