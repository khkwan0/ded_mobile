import React from 'react'
import {View} from 'react-native'
import {useSelector} from 'react-redux'
import Lesson from '../components/Lesson'
import Quiz from '../components/Quiz'

export default Course = props => {

  const user = useSelector(_state=>_state.userData.user)

  const [state, doSetState] = React.useState({
    showLesson: false,
    showQuiz: false,
    unit: 0,
    slide: 0,
  })

  const setState = newState => doSetState({...state, ...newState})

  React.useEffect(() => {
    setState({unit: user.progress.current_unit, slide: user.progress.current_slide, showLesson: true})
  }, [])

  return(
    <View>
      {state.showLesson &&
        <Lesson unit={state.unit} slide={state.slide} user={user} />
      }
      {state.showQuiz &&
        <Quiz unit={state.unit} />
      }
    </View>
  )
}