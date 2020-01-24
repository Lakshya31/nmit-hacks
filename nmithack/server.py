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

@app.route("/routes")
def getRoutes():
    data=hf.return_vague_info()
    return jsonify({"result":data})

@app.route("/route/<rid>")
def getRoute(rid):
    data=hf.return_full_info(int(rid))
    return jsonify({"result":data})

@app.route("/genData/<rid>")
def genData(rid):
    data=hf.one_route_crowd(int(rid))
    return jsonify({"result":data})

@app.route("/testData",methods=["POST"])
def testData():
    print (request.is_json)
    content = request.get_json()
    print (content)
    return None

@app.route("/initiateTraining/<rid>/<sid>")
def train(rid,sid):
    data=hf.scheduler(int(rid),int(sid))
    return jsonify({"result":data})
if __name__ == "__main__":
    app.run()