import React from 'react'
import {View, ImageBackground, TouchableOpacity} from 'react-native'

export default MainMenu = props => {
  return(
    <View>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={()=>props.showCourse(true)}>
          <View style={[{flexGrow: 1}]}>
            <ImageBackground source={require('../assets/imgs/main_background.jpg')} style={{resizeMode:'cover', flex: 1}}>
              <View style={[styles.pane, styles.lessonPane]}>
                <Text style={[styles.paneText]}>Lesson</Text>
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <View style={{flexGrow: 1}}>
          <ImageBackground source={require('../assets/imgs/main_background.jpg')} style={{resizeMode:'cover', flex: 1}}>
            <View style={[styles.pane, styles.statusPane]}>
              <Status />
              <Text style={[styles.paneText]}>Status</Text>
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