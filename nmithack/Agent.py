# -*- coding: utf-8 -*-
"""
Created on Fri Jan 24 20:01:25 2020

@author: Surendran Nambiar
"""
import random
import numpy as np
class Agent:
  def __init__(self,stops,time):
    self.name="Agent"
    self.stops = stops
    self.time = time
    self.passengers = []
    self.capacity = 70 
    self.reward = np.zeros(len(self.time))
  def decide_action(self,state):
    getting_down=[]
    #explore or #exploit
    #exploring
    _temp = random.randrange(0,2)
    if _temp==1:
      #exploring mode
      #print("exploration")
      temp_time=self.time[state]
      _temp2 = random.randrange(0,2)
      if _temp2==0:
        if state!=0:
          temp_time+=(self.time[state]-self.time[state-1])*(0.1)
      else:
        if state!=0:
          temp_time-=(self.time[state]-self.time[state-1])*(0.1)
      return temp_time
    else:
      temp_time=self.time[state]
      return temp_time    
  def ascending(self,passengers):
    # print(len(passengers),len(self.passengers))
    self.passengers+=passengers
    # print(len(self.passengers))
  def descending(self,state):
    new_list=[]
    for i in self.passengers:
        if i['destination']['busstop']!=self.stops[state]:
            new_list.append(i)
    self.passengers=new_list
  def update_reward(self,action,state,reward):
    dif = action-self.time[state]
    if reward>self.reward[state]:
      for i in range(state,len(self.time)):
        self.time[i]+=dif
      self.reward[state]=reward
    