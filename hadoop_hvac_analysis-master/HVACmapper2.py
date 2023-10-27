#!/usr/bin/env python

import sys

# input comes from STDIN (standard input)
for line in sys.stdin:
    # remove leading and trailing whitespace
    line = line.strip()
    # split the line into words
    rows = line.split()
    # increase counters
    for row in rows:
        attr = row.split(',')
        date = attr[0]
        time = attr[1]
        a_temp = attr[3]
        building = attr[6]

        val = time + " " + a_temp + " " + date

        print '%s %s' % (building, val)
