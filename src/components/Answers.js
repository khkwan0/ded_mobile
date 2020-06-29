import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {RadioButton, Text} from 'react-native-paper'

export default Answers = props => {
  return(
    <View style={{width:'70%'}}>
      <RadioButton.Group onValueChange={value=>props.handleAnswer(value-1)} value={props.answer+1}>
        {props.answers.map((answer, idx) => {
          return (
            <View key={idx} style={{display:'flex', flexDirection:'row'}}>
              <View><RadioButton uncheckedColor="rgba(255,255,255,1)" color="rgba(255,255,255,1)" value={idx+1} /></View>
              <TouchableOpacity onPress={()=>props.handleAnswer(idx)} style={{paddingLeft: 20}}><Text style={props.style}>{answer.answer}</Text></TouchableOpacity>
            </View>
          )
          })}
      </RadioButton.Group>
    </View>
  )
}