# -*- coding: utf-8 -*-
"""
Created on Fri Jan 24 19:54:35 2020

@author: Surendran Nambiar
"""

import pandas as pd
import numpy as np
import json
import random
from Environment import env
from Agent import Agent



df = pd.read_csv("https://raw.githubusercontent.com/geohacker/bmtc/master/data/bmtc_dump.csv")

def get_sec(time_str):
    """Get Seconds from time."""
    h, m, s = time_str.split(':')
    return int(h) * 3600 + int(m) * 60 + int(s)

#universal crowd set
crowd_new={}#universal crowd holder
time_duration=(15)*60#seconds

def generate_crowd(stops,time):
    crowd={}
    for i in range(len(stops)):
            #lowerlimit to accomodate peak hour demand
        lowerlimit=1
            #handling peak hour crowd
        if (time>=28800 and time<=36000) or (time>=64800 and time<=72000):
            lowerlimit=50
        numberofpeople=random.randrange(lowerlimit,200)
        people=[]
            #generating random crowd just like ticket data
        for j in range(numberofpeople):
            destination={}
            destination['destination']=stops[random.randrange(i,len(stops))]
            people.append(destination)
        crowd[stops[i]['busstop']]=people
    return crowd

def one_route_crowd(spec):
  end_time=82800
  current_time=14400
  _temp=df.loc[spec]['map_json_content']
  _temp=json.loads(_temp)
  
  # _temp=json.loads(_temp)
  while current_time<=end_time:
    temp_crowd=generate_crowd(_temp,current_time)
    #                 for k in temp_crowd:
                    #adding it per timing
    crowd_new[current_time] = temp_crowd
    #                 print(temp_crowd)
    current_time+=time_duration

def scheduler(rid):
    one_route_crowd(5)
    dfirst=df.loc[rid]['departure_from_origin'].split(",")[0]
    afirst=df.loc[rid]['arrival_at_destination'].split(',')[0]
    dsec=get_sec(dfirst+":00")
    asec=get_sec(afirst+":00")
    print(dsec,asec)
    dif=(asec-dsec)/len(json.loads(df.loc[5]['map_json_content']))
    timetable=[]
    timetable.append(dsec)
    for i in range(len(json.loads(df.loc[5]['map_json_content']))-2):
        timetable.append(dsec+((i+1)*dif))
    timetable.append(asec)
    enviro = env(crowd_new)
    agent = Agent(enviro.stops,timetable)
    for i in range(20000):
      while True:
        action = agent.decide_action(enviro.state)
    # print(len(agent.passengers))
        (done,nextState,(noppl,pass1))=enviro.step(action,agent.capacity,agent.passengers)
        agent.descending(nextState-1)
        # print(len(pass1))
        agent.update_reward(action,nextState-1,noppl)
        if done:
          print("done "+str(i))
          break
    return agent.time
 
def return_vague_info():
    result=[]
    for i in range(len(df)):
        temp_dict = {}
        temp_data=df.loc[i]
        temp_dict["id"]=i
        temp_dict["distance"]=temp_data['distance']
        temp_dict["origin"]=temp_data['origin']
        temp_dict["destination"] = temp_data["destination"]
        temp_dict["route_no"] = temp_data["route_no"]
        result.append(temp_dict)
    return result

def return_full_info(rid):
    temp_data = df.loc[rid]
    temp_dict={}
    temp_dict["id"]=rid
    temp_dict["distance"]=temp_data['distance']
    temp_dict["origin"]=temp_data['origin']
    temp_dict["destination"] = temp_data["destination"]
    temp_dict["route_no"] = temp_data["route_no"]
    temp_dict["departure_from_origin"] = temp_data["departure_from_origin"].split(",")
    temp_dict["departure_from_destination"] = temp_data["departure_from_destination"].split(",")
    temp_dict["arrival_at_origin"] = temp_data["arrival_at_origin"].split(",")
    temp_dict["arrival_at_destination"] = temp_data["arrival_at_destination"].split(",")
    temp_dict["stops"] = json.loads(temp_data["map_json_content"])
    return temp_dict
