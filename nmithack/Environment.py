# -*- coding: utf-8 -*-
"""
Created on Fri Jan 24 12:05:38 2020

@author: Surendran Nambiar

"""

import random
import numpy as np
import pandas as pd
import math

class env:
  def __init__(self,crowd):
    self.global_crowd = crowd
    self.current_crowd = crowd[14400]
    self.stops = self.listStops()
    self.state = 0
  def listStops(self):
    temp=[]
    for i in self.current_crowd:
      temp.append(i)
    return temp
  def step(self,time,space,passengers):
    if self.state+1==len(self.stops):
      # print("last state")
      self.state=0
      # print(self.state+1,len(self.stops))
      return (True,self.state,(100,[]))
    else:
      reward=0
      self.state = self.state+1
      reward=self.people_ascending_bus(self.stops[self.state],passengers,space)
      return (False,self.state,reward)
  def change_crowd(self,time):
    self.current_crowd = self.crowd[time]
  def people_ascending_bus(self,stop,passengers,capacity):
    # print(stop)
    choice=None
        #filtering based on route
    passengerstobe=[]
    for i in self.current_crowd[stop]:
        if i['destination']['busstop'] in self.current_crowd.keys():
            passengerstobe.append(i)
        #choosing passengers to board
    if capacity-len(passengers)>len(passengerstobe):
        choice=len(passengerstobe)
    else:
        choice=capacity-len(passengers)
    # print("another level")
    # print(choice,len(passengerstobe),len(passengers),capacity)
    tempP = random.sample(passengerstobe,choice)
    for i in tempP:
        passengers.append(i)
    return (len(tempP),passengers)