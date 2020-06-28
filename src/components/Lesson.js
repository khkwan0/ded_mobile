import React, { useReducer, useImperativeHandle } from 'react'
import {View, Text, Dimensions, TouchableOpacity, ScrollView} from 'react-native'
import HTML from 'react-native-render-html'
import net from '../assets/net'
import {useDispatch, useSelector} from 'react-redux'
import Swiper from 'react-native-swiper'
import {UpdateUserProgress} from '../redux/actions/authActions'
import Color from '../assets/styles/Color'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Video from 'react-native-video'


let timer = null

export default Lesson = props => {

  const dispatch = useDispatch()
  const user = useSelector(_state=>_state.userData.user)
  const [state, doSetState] = React.useState({
    lesson: [],
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    showVideo: false,
    source: '',
    slide: (typeof user !== 'undefined' && typeof user.progress !== 'undefiend' && typeof user.progress.current_slide !== 'undefined')?user.progress.current_slide:0
  })
  const lessonRef = React.useRef(state.lesson)
  const slideRef = React.useRef(state.slide)

  const setState = newState => doSetState({...state, ...newState})

  React.useEffect(() => {
    GetLesson()
    Dimensions.addEventListener('change', GetOrientation)
    return () => {
      clearTimeout(timer)
      Dimensions.removeEventListener('change', GetOrientation)
    }
  }, [])

  const GetOrientation = () => {
    setState({width: Dimensions.get('window').width, height: Dimensions.get('window').height, lesson:lessonRef.current, slide:slideRef.current})
  }

  const GetLesson = async () => {
    try {
      const res = await net.GetFromServer('/lesson/' + props.unit)
      if (res.err === 0) {
        lessonRef.current = res.msg
        setState({lesson: res.msg})
      }
    } catch(e) {
      console.log('GetLesson', e)
    }
  }

  const renderPagination = (index, total, context) => {
    return(
      <View style={{backgroundColor:Color.dark(1)}}>
        <View style={{width:state.width}}>
          <Text style={{color:Color.primary(1)}}>{index+1}/{total}</Text>
        </View>
      </View>
    )
  }

  const ToggleDrawer = () => {
    props.navigation.openDrawer()
  }

  const handleSlideChange = slide => {
    clearTimeout(timer)
    slideRef.current = slide
    timer = setTimeout(() => updateProgress(slide), 2000)
  }

  const updateProgress = async (slide) => {
    if (typeof user !== 'undefined' && user.progress !== 'undefined') {
      user.progress.current_slide = slide
      if (slide > user.progress.slide && user.progress.unit === props.unit) {
        user.progress.slide = slide
      }
    } else {
      user.progress = {
        unit: props.unit,
        slide: slide,
        current_unit: props.unit,
        current_slide: slide
      }
    }
    try {
      await dispatch(UpdateUserProgress(user.progress, user.token))
    } catch(e) {
      console.log(e)
    }
  }

  const BeginDrag = () => {
  }

  const DoQuiz = () => {
    props.showQuiz()
  }

  const ShowVideo = source => {
    setState({source: source, showVideo: true})
  }

  if (state.showVideo) {
    return(
      <View style={{display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:Color.dark(1), height:state.height}}>
        {state.loadingVideo &&
          <View>
            <Text style={{color: Color.secondary(1), fontSize:28}}>Loading...</Text>
          </View> 
        }
          <View>
            <Video
              style={{width:state.width, height:state.height*0.8}}
              source={{uri: state.source}}
              controls={true}
              fullscreenOrientation={"landscape"}
              volume={0.5}
              paused={false}
              ignoreSilentSwitch="obey"
              id="video"
              resizeMode="contain"
              onError={(err)=>{console.log(err)}}
              onLoadStart={()=>setState({loadingVideo: true})}
              onLoad={()=>setState({loadingVideo: false})}
            />
            <View style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
              <TouchableOpacity onPress={()=>setState({showVideo: false})} disabled={state.loadingVideo?true:false}>
                <Text style={{color:Color.secondary(1), fontSize:26}}>Close Video</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
    )
  } else {
    return (
      <View style={{disply:'flex', height:state.height, width:state.width}}>
        <View style={{flex:1, display:'flex', justifyContent:'center', alignItems:'flex-start', backgroundColor:Color.greenish(0.8)}}>
          <TouchableOpacity onPress={()=>ToggleDrawer()}>
            <Icon name="menu" size={40} color={Color.primary(1)} />
          </TouchableOpacity>
        </View>
        <View style={{flex:15, display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:Color.dark(1)}}>
          {state.lesson.length > 0 &&
              <Swiper
                showsPagination={true}
                bounces={true}
                loop={false}
                loadMinimalSize={15}
                renderPagination={renderPagination} 
                showsButtons={true}
                onIndexChanged={handleSlideChange}
                index={state.slide}
                onScrollBeginDrag={BeginDrag}
              >
                {state.lesson.map((lesson,idx)=> {
                  if (lesson.lesson.indexOf('video') > -1 && lesson.lesson.indexOf('mp4') > -1) {
                    const start = lesson.lesson.indexOf("https")
                    const end = lesson.lesson.indexOf("mp4") + 3
                    const source = lesson.lesson.substring(start, end)
                    return(
                      <View key={idx} style={{display:'flex', alignItems:'center', justifyContent:'center', height: state.height}}>
                        <View style={{flex: 1, display:'flex', justifyContent:'center'}}>
                          <TouchableOpacity onPress={() => {ShowVideo(source)}}>
                            <Text style={{color:Color.secondary(1), fontSize:26}}>VIDEO - PUSH TO START</Text>
                          </TouchableOpacity>
                        </View>
                        {(idx === state.lesson.length-1) &&
                          <View style={{backgroundColor: Color.dark(1), flex: 1, display:'flex', justifyContent:'center'}}>
                            <TouchableOpacity onPress={() => DoQuiz()}>
                              <Text style={{color:Color.secondary(1), fontSize:28}}>Take the QUIZ for unit: {props.unit+1}</Text>
                            </TouchableOpacity>
                          </View>
                        }
                      </View>
                    )
                  } else {
                    return(
                      <ScrollView 
                        key={idx}
                        contentContainerStyle={{display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:Color.secondary(1)}}
                      >
                        <HTML
                          baseFontStyle={{color:Color.secondary(1), fontSize:24}}
                          containerStyle={{paddingLeft:'20%', paddingRight:'20%', backgroundColor:Color.dark(1), paddingBottom:100}}
                          tagsStyles={{p: {color: Color.secondary(1)}},{h1:{color:Color.secondary(1)}}}
                          html={lesson.lesson}
                        />
                        {idx === state.lesson.length &&
                          <View style={{backgroundColor: Color.dark(1)}}>
                            <TouchableOpacity onPress={() => DoQuiz()}>
                              <Text style={{color:Color.secondary(1), fontSize:28}}>Take the QUIZ for unit: {props.unit+1}</Text>
                            </TouchableOpacity>
                          </View>
                        }
                      </ScrollView>
                    )
                  }
                })}
              </Swiper>
            }
        </View>
      </View>
    )
  }
}