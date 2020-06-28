import React from 'react'
import {View, Text, ImageBackground, StyleSheet, DrawerLayoutAndroid} from 'react-native'
import Styles from '../assets/styles/Styles'
import Color from '../assets/styles/Color'
import Course from './Course'
import Graduate from './Graduate'
import MainMenu from './MainMenu'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'

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
const Drawer = createDrawerNavigator()

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
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="MainMenu" edgeWidth={0}>
        <Drawer.Screen name="MainMenu" component={MainMenu} />
        <Drawer.Screen name="Course" component={Course} />
        <Drawer.Screen name="Graduate" component={Graduate} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}