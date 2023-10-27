import argparse
from subprocess import Popen, PIPE, STDOUT
import os
import json
from statistics import mean, median
import re
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import plotly.express as px


def parse_data(merged_output):
    #parsed_data_dict = {}
    result = []
    lines = merged_output.strip().split('\n')
    for line in lines:
            words = line.split()
            try:
                hop_number = int(words[0])
                host = f"[{words[1]} {words[2]}]"
                time_values = []
                for word in words[3:]:
                    if word == "*":
                        time_values.append(0)
                    elif word.replace('.', '', 1).isdigit():
                        time_values.append(float(word))
                    
                avg_time = mean(time_values) if time_values else 0
                max_time = max(time_values) if time_values else 0
                min_time = min(time_values) if time_values else 0
                med_time = median(time_values) if time_values else 0

                hop_data = {
                    'avg': round(avg_time, 3),
                    'hop': hop_number,
                    'hosts': [host],
                    'max': round(max_time, 3),
                    'med': round(med_time, 3),
                    'min': round(min_time, 3)
                    }

                result.append(hop_data) 
            except ValueError:
                continue
    return result

    # Add all your datasets here

   
def outputClean(concat_data):
    merged_output = '\n'.join(concat_data).split('\n')
    #lines = merged_output.split('\n')
    # Use regular expressions to remove unwanted lines
    filtered_lines = [line for line in merged_output if not re.match(r'^traceroute to .+', line) and line.strip()]
    # Join the filtered lines into a single string with each line separated by a newline
    filtered_tr = '\n'.join(filtered_lines)
    return filtered_tr
    
def statistical_graph(json_data):
    data = json.loads(json_data)
    df = pd.DataFrame(data)
    # Melt the DataFrame to have 'variable' and 'value' columns for box plotting
    df_melted = pd.melt(df, id_vars=['hop'], value_vars=['avg', 'max', 'med', 'min'])

    # Create a box plot using Plotly Express with different colors for each hop
    fig = px.box(
        df_melted,
        x='hop',
        y='value',
        color='hop',
        labels={'value': 'Latency (ms)'},
        title='Latency Statistics per Hop'
    )
    # Rotate the x-axis labels vertically
    fig.update_xaxes(
    tickvals=df['hop'].unique(),
    ticktext=[f'hop{i}' for i in range(1, len(df['hop'].unique()) + 1)],
    tickangle=0
    )
    # Show the plot
    output_dir = 'TEST_DIR'
    if not os.path.exists(output_dir):
      os.makedirs(output_dir)
    pdf_file_path = os.path.join(output_dir, 'graph_stat.pdf')
    fig.write_image(pdf_file_path, format='pdf')
    #fig.savefig(pdf_file_path, format='pdf')
    #fig.show()


def add_argument(parser, arg, arg_text,arg_type, default, help_text,):
    parser.add_argument(arg, dest= arg_text, default=default, type=arg_type, help = help_text)

def main():
    parser = argparse.ArgumentParser(description="Running traceroute with command line parameters")
    #add_argument(parser, '-h, --help',  str, None,     'Show this help message and exit')
    add_argument(parser, '-n','NUM_RUNS',     int, 5,    'Number of times traceroute will run')
    add_argument(parser, '-d','RUN_DELAY',    float, 1.0,  'Number of seconds to wait between two consecutive runs')
    add_argument(parser, '-m','MAX_HOP',     int, 30,    'Number of Hops traceroute will run')
    add_argument(parser, '-o',  'OUTPUT',   str,  None,      'Path and name of output JSON file containing the stats')
    add_argument(parser, '-g',  'GRAPH',   str,  None,   'Path and name of output PDF file containing stats graph')
    add_argument(parser, '-t',  'TARGET',  str,  None,     'A target domain name or IP address (required if --test is absent')

    parser.add_argument('--test', action='store_true', help='Directory containing num_runs text files, each of which\n contains the output of a traceroute run. If present, this\n will override all other options')
   

    try:    
        #args = parser.parse_args()
        args, remaining_args = parser.parse_known_args()

        if args.TARGET is None:
            print("You cannot run this script without a Target domain name: See help below:\n")
            parser.print_help()
        elif args.test:
            all_hop_data = []
            N = args.NUM_RUNS
            output_dir = 'TEST_DIR'
            if not os.path.exists(output_dir):
                    os.makedirs(output_dir)
            print("Traceroute runs ",N,"x from txt stored in", output_dir, "\n")        
            for i in range(1, N+1): 
                #read output data from the output_dir and use it to compute statistics 
                with open(f'{output_dir}/output{i}.txt', 'r') as input_file:
                    tr_output = input_file.read()
                all_hop_data.append(tr_output)
                
            concat_data = outputClean(all_hop_data) 
            #print (concat_data)   
            parsed_data= parse_data(concat_data)
            stat_json_path = os.path.join(output_dir, 'offline_Json_stat.json')
            print("Json file created from the offline traceroute run and stored in", output_dir, "\n")
            json_data = json.dumps(parsed_data, indent=4)
            with open(stat_json_path, 'w') as json_file:
                json_file.write(json_data)

            #Call the Statistical_graph function to plot the graph and write it's output to graph directory
            print("Statistical graph created and stored in", output_dir, "\n")
            statistical_graph(json_data)
        else:
            all_hop_data = []
            for run in range(args.NUM_RUNS):
                print (f"Traceroute result - Run {run + 1}: \n")
                result = Popen(['traceroute','-m', str(args.MAX_HOP), args.TARGET], text=True, stdout=PIPE,stdin=PIPE, stderr=STDOUT)
                tr_output, _ = result.communicate()
                output_dir = 'TEST_DIR'
                if not os.path.exists(output_dir):
                    os.makedirs(output_dir)
                ## Write the TraceRoute run as outputted txtfiles and put in a directory
                output_tr = os.path.join(output_dir,f'output{run + 1}.txt')
                with open(output_tr, 'w') as output_file:
                    output_file.write(tr_output)
                all_hop_data.append(tr_output)

            ## Merge each traceroute runs into a single file for stripping and analysis and put in a directorty 
            concat_data = outputClean(all_hop_data)     
            filtered_tr = concat_data

            #Parse the data for statistical manipulations  
            parsed_data= parse_data(filtered_tr)

            #Json file path in the directory
            print("Creating Json file from ", args.NUM_RUNS,"Tracerout runs and file saved in ", output_dir, "\n" )
            stat_json_path = os.path.join(output_dir, 'online_Json_stat.json')
            json_data = json.dumps(parsed_data, indent=4)
            with open(stat_json_path, 'w') as json_file:
                json_file.write(json_data)

            #Call the Statistical_graph function to plot the graph and write it's output to graph directory
            print("Statistical graph created and stored from online Traceroute run and stored in ", output_dir, "\n")
            statistical_graph(json_data)
           
            #print(f"Merged traceroute output.txt, Json file and graph pdf saved to '{output_dir}'")
    except argparse.ArgumentError:                      
        parser.print_help()

if __name__ == "__main__":
    main()
