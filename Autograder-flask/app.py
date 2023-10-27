import os
import sys
import shlex, subprocess , json
from subprocess import Popen, PIPE, STDOUT
from flask import Flask, flash, request, redirect, send_from_directory, url_for, render_template,jsonify
from werkzeug.utils import secure_filename
app = Flask(__name__, template_folder='templates')

@app.route("/")
def index():
        title = "Korede Autograder"
        return render_template("index.html", title=title)


 #coming for you

UPLOAD_FOLDER = '/Users/mac/Desktop/Flask/compile'
ALLOWED_EXTENSIONS = {'cc'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':

        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            p =subprocess.run(['python3 compile.py'], shell=True, text=True, stdout=PIPE, stdin=PIPE, stderr=STDOUT)
            display = p.stdout
            return render_template('index.html',result=display)

@app.route('/compile/<filename>')
def download_file(filename):
     return send_from_directory(app.config["UPLOAD_FOLDER"], filename)  #buildonly comment

@app.route('/result')
def result():
      
      return render_template('result.html')



# @app.route('/', methods=['GET', 'POST'])
# def upload_file():
#     if request.method == 'POST':
#         # check if the post request has the file part
#         if 'file' not in request.files:
#             flash('No file part')
#             return redirect(request.url)
#         file = request.files['file']
#         # If the user does not select a file, the browser submits an
#         # empty file without a filename.
#         if file.filename == '':
#             flash('No selected file')
#             return redirect(request.url)
#         if file and allowed_file(file.filename):
#             filename = secure_filename(file.filename)
#             file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#             #display = Popen(['cat', filename], stdout=PIPE)
#             result =subprocess.call(['python compile.py'], shell=True) #, stdout=PIPE, stdin=PIPE, stdrr=STDOUT)
#             #result = display.communicate(input=(filename).encode())
#             return redirect(url_for('upload_file', name=filename))
#     return render_template('result.html', result)

#@app.route('/result', methods=['GET'])
#def retcode(filename):
    #title = "Korede Autograder"
    #send_from_directory(app.config['UPLOAD_FOLDER'],filename)
    #display = subprocess.Popen(['cat', filename], stdout=PIPE)
    #retcode = display.communicate()
    #display_2 =Popen(['python', 'compile.py', 'test.sh'], stdout=PIPE, stdin=PIPE, stdrr=STDOUT)
    #display_2 = display.communicate(input=(filename).encode())[0]
    #return render_template('result.html', retcode)


if __name__ == '__main__':
        app.run(host="0.0.0.0", port =5000, debug=True)


