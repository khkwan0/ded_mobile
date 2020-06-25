import React, { useReducer } from 'react'
import {View, Text, Dimensions, TouchableOpacity, ProgressViewIOSComponent, PickerIOSComponent, ColorPropType} from 'react-native'
import HTML from 'react-native-render-html'
import net from '../assets/net'
import {useDispatch} from 'react-redux'
import Swiper from 'react-native-swiper'
import UpdateProgress from '../redux/actions/authActions'
import Color from '../assets/styles/Color'


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

  const renderPagination = (index, total, context) => {
    return(
      <View style={{height:20, width:20}}>
        <Text>{index+1}/{total}</Text>
      </View>
    )
  }

  return(
    <View>
    <View style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
      <View style={{marginTop:30, height: height, width:'100%', backgroundColor:Color.dark(1), color:Color.secondary(1)}}>
      {state.lesson.length > 0 &&
      <Swiper showsPagination={false} bounces={true} loop={false} loadMinimal={true} loadMinimalSize={1} renderPagination={()=>renderPagination()}>
        {state.lesson.map((lesson,idx)=> <View key={idx} style={{display:'flex', justifyContent:'center', alignItems:'center'}}><HTML
          baseFontStyle={{color:Color.secondary(1), fontSize:24}}
          containerStyle={{paddingLeft:20, paddingRight: 20,color: Color.secondary(1)}}
          tagsStyles={{p: {color: Color.secondary(1)}},{h1:{color:Color.secondary(1)}}}
          html={lesson.lesson} />
        </View>)}
      </Swiper>
      }
      </View>
    </View>
    </View>
  )
}