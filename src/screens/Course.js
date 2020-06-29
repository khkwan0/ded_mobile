import React from 'react'
import {View} from 'react-native'
import {useSelector} from 'react-redux'
import Lesson from '../components/Lesson'
import Quiz from '../components/Quiz'

export default Course = ({navigation}) => {

  const user = useSelector(_state=>_state.userData.user)

  const [state, doSetState] = React.useState({
    showLesson: true,
    showQuiz: false,
    unit: 0,
  })

  const setState = newState => doSetState({...state, ...newState})

  React.useEffect(() => {
    if (typeof user !== 'undefined' && typeof user.progress !== 'undefined') {
      setState({unit: user.progress.current_unit, showLesson: true})
    }
  }, [])

  const showQuiz = () => {
    setState({showLesson: false, showQuiz: true})
  }

  const advanceUnit = () => {
    const unit = state.unit + 1
    if (unit < 10) {
      setState({showQuiz: false, unit:unit, showLesson: true})
    } else {

    }
  }

  return(
    <View>
      {state.showLesson &&
        <Lesson unit={state.unit} navigation={navigation} showQuiz={showQuiz} />
      }
      {state.showQuiz &&
        <Quiz unit={state.unit} advanceUnit={advanceUnit}/>
      }
    </View>
  )
}