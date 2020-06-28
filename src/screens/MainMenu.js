import React from 'react'
import {View, ImageBackground, TouchableOpacity, Text} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from '../assets/styles/Styles'
import Status from '../components/Status'

export default MainMenu = ({navigation}) => {
  return(
    <View style={{height:'100%'}}>
      <View style={{flex: 1}}>
          <View style={[{flexGrow: 1}]}>
            <ImageBackground source={require('../assets/imgs/main_background.jpg')} style={{resizeMode:'cover', flex: 1}}>
              <TouchableOpacity onPress={()=>navigation.navigate("Course")}>
                <View style={[styles.pane, styles.lessonPane]}>
                  <Text style={[styles.paneText]}>Lesson</Text>
                </View>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        <View style={{flexGrow: 1}}>
          <ImageBackground source={require('../assets/imgs/main_background.jpg')} style={{resizeMode:'cover', flex: 1}}>
            <View style={[styles.pane, styles.statusPane]}>
              <Status />
            </View>
          </ImageBackground>
        </View>
        <View style={{flexGrow: 1}}>
          <ImageBackground source={require('../assets/imgs/main_background.jpg')} style={{resizeMode:'cover', flex: 1}}>
            <View style={[styles.pane, styles.thirdPane]}>
              <Text style={[styles.paneText]}>SOmething</Text>
            </View>
          </ImageBackground>
        </View>
      </View>
    </View>
  )
}