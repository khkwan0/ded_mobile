import React, { useReducer } from 'react'
import {View, Text, Dimensions, TouchableOpacity, ProgressViewIOSComponent, PickerIOSComponent} from 'react-native'
import {WebView} from 'react-native-webview'
import net from '../assets/net'
import {useDispatch} from 'react-redux'
import UpdateProgress from '../redux/actions/authActions'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default Lesson = props => {

  const dispatch = useDispatch()
  const [state, doSetState] = React.useState({
    lesson: [],
    slide: 0,
  })

  const setState = newState => doSetState({...state, ...newState})

  const slideRef = React.useRef(state.slide)

  React.useEffect(() => {
    GetLesson()
  }, [])

  const GetLesson = async () => {
    try {
      const res = await net.GetFromServer('/lesson/' + props.unit)
      if (typeof props.user.progress !== 'undefined' && typeof props.user.progress.current_slide !== 'undefined' && !props.user.passed) {
        slideRef.current = user.progress.current_slide
      } else {
        slideRef.current = 0
      }
      if (res.err === 0) {
        setState({lesson: res.msg, slide: props.slide})
      }
    } catch(e) {
      console.log('GetLesson', e)
    }
  }

  console.log(state.lesson[state.slide])
  return(
    <View style={{height: height, width: width}}>
      {state.lesson.length > 0 &&
      <WebView style={{height:300, width:300}} originWhitelist={['*']} source={{html:state.lesson[state.slide].lesson}} renderError={()=>console.log('rendererr')} />
      }
    </View>
  )
}