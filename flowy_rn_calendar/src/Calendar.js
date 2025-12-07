import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Calendar(){
  const days=[...Array(30).keys()].map(i=>i+1);
  return(
    <View style={{padding:20}}>
      <Text style={{fontSize:24, marginBottom:20}}>Calendário Flowy</Text>
      <View style={{flexDirection:'row', flexWrap:'wrap'}}>
        {days.map(d=>(
          <TouchableOpacity key={d} style={{width:'14%', padding:10}}>
            <Text>{d}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
