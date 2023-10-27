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
        t_temp = attr[2]
        a_temp = attr[3]

        val = t_temp + " " + a_temp
        system = attr[4]

        print '%s %s' % (system, val)
