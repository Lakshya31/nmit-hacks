# -*- coding: utf-8 -*-
"""
Created on Fri Jan 24 14:38:04 2020

@author: Surendran Nambiar
"""


from flask import Flask
from flask import request
from flask_cors import CORS
from flask import jsonify
#import handling_functions as hf
import Helper_Functions as hf
import time
app = Flask(__name__)
CORS(app)

@app.route("/")
def chnage():
    return "Welcome!"

@app.route("/addData",methods=["POST"])
def addData():
    print (request.is_json)
    content = request.get_json()
    print (content)
    return None

@app.route("/id/<idnum>")
def main(idnum):
    return None

@app.route("/initiateTraining/<rid>")
def train(rid):
    data=hf.scheduler(int(rid))
    return jsonify({"result":data})
    
    return None
if __name__ == "__main__":
    app.run()