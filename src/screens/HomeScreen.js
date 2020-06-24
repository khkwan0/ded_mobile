import React from 'react'
import {View, Text, ImageBackground, StyleSheet} from 'react-native'
import Styles from '../assets/styles/Styles'
import Color from '../assets/styles/Color'
import Course from './Course'
import Graduate from './Graduate'
import MainMenu from './MainMenu'

const styles = StyleSheet.create({
  pane: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  lessonPane: {
    backgroundColor: Color.greenish(0.95)
  },
  statusPane: {
    backgroundColor: Color.dark(0.95)
  },
  paneText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: Color.secondary(1.0)
  },
  thirdPane: {
    backgroundColor: Color.black(0.95)
  }
})

export default HomeScreen = props => {

  const [state, doSetState] = React.useState({
    showCourse: false,
    showGraduate: false
  })

  const setState = newState => doSetState({...state, ...newState})

  const showCourse = flag => {
    const showGraduate = flag?false:state.showGraduate
    setState({showCourse: flag, showGraduate: showGraduate})
  }

  const showGraduate = flag => {
    const showCourse = flag?false:state.showCourse
    setState({showCourse: showCourse, showGraduate: flag})
  }

  return(
    <View>
      {showCourse &&
        <Course />
      }
      {showGraduate &&
        <Graduate />
      }
      {!showGraduate && !showCourse &&
        <MainMenu showCourse={showCourse} showGraduate={showGraduate} />
      }
    </View>
  )
}