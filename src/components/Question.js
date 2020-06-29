import React from 'react'
import {View, Text} from 'react-native'

export default Question = props => {
  return(
    <Text style={props.style}>{props.children}</Text>
  )
}