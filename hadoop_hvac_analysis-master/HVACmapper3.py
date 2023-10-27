#!/usr/bin/env python

import sys

# input comes from STDIN (standard input)
for line in sys.stdin:
    # remove leading and trailing whitespace
    line = line.strip()
    # split the line into rows
    rows = line.split()
    # get the variables we need
    for row in rows:
        # split rows into individual attributes
        attr = row.split(',')
        time = attr[1]
        a_temp = attr[3]
        building = attr[6]

        # save attribues as values
        if (building == "2" or building == "19" or building == "12"):
            val = time + " " + a_temp
            print '%s %s' % (building, val)
