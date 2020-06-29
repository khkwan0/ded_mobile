import React from 'react'
import {View, Dimensions, ScrollView} from 'react-native'
import net from '../assets/net'
import {Snackbar, Button, Text} from 'react-native-paper'
import Styles from '../assets/styles/Styles'
import Color from '../assets/styles/Color'
import Question from './Question'
import Answers from './Answers'
import LinearGradient from 'react-native-linear-gradient'

export default Quiz = props => {

  const [state, doSetState] = React.useState({
    questions: [],
    currentQuestion: 0,
    userAnswers: [],
    numCorrect: 0,
    message: '',
    showSnack: false,
    snackSeverity: 'error'
  })

  const setState = newState => doSetState({...state, ...newState})

  React.useEffect(() => {
    GetQuiz()
  }, [props.unit])

  const GetQuiz = async () => {
    let unit = props.unit
    if (unit === 10) {
      unit = 69
    }
    const _quiz = await net.GetFromServer('/quiz/' + unit)
    setState({questions: _quiz.msg, currentQuestion: 0})
  }

  const advanceQuestion = () => {
    const answer = state.userAnswers[state.currentQuestion]
    if (typeof answer !== 'undefined' && typeof answer.answer !== 'undefined' && answer.answer > -1) {
      const _question = state.currentQuestion + 1
      if (_question < state.questions.length) {
        setState({currentQuestion: _question})
      } else {
        CheckAnswers()
      }
    }
  }

  const CheckAnswers = async () => {
    try {
      console.log(state.userAnswers)
      const res = await net.PostToServer('/answers/' + props.unit, {answers: state.userAnswers})
      console.log(res)
      console.log(state.questions.length, state.numCorrect)
      const _numCorrect = state.questions.length - res.msg.length + state.numCorrect
      console.log(_numCorrect)
      let message = ''
      let severity = 'error'
      if (res.msg.length === 0) {
        message = 'You answered all ' + _numCorrect + ' questions correctly!'
        severity = 'success'

      } else {
        message = 'You only scored ' + _numCorrect + '/' + (_numCorrect + res.msg.length) + '.  Keep trying'
      }
      console.log(message, severity)
      setState({
        message: message,
        userAnswers: [], 
        numCorrect:_numCorrect, 
        showSnack:true, 
        snackSeverity:severity,
        questions:res.msg, 
        currentQuestion: 0
      })
    } catch(e) {
      console.log(e)
    }
  }

  const handleAnswer = (answer) => {
    const _userAnswers = [...state.userAnswers]
    _userAnswers[state.currentQuestion] = {
      answer: answer,
      question_id: state.questions[state.currentQuestion].question_id
    }
    setState({userAnswers: _userAnswers})
  }

  const QuizHeader = (myProps) => {
    if (props.unit < 10) {
      return (<H2 style={myProps.style}>Unit {props.unit + 1}</H2>)
    } else {
      return (<H2 style={myProps.style}>Final Exam</H2>)
    }
  }

  /*
  const Notifications = myProps => {
    let message = ''
    let button = <></>
    if (state.alertMsg) {
      message = state.alertMsg
    }
    if (state.alertSuccess) {
      message = state.alertSuccess
      button = <Button onPress={()=>props.advanceUnit()}>{props.unit<10?'Continue to unit' + props.unit+2:'Graduate!'}</Button>
    }
    console.log(message)
    let notification = <View></View>
    if (message) {
        notification = (
          <View style={{flex: 1, display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Snackbar visible={state.showSnack} onDismiss={()=>setState({showSnack: false})}>{state.message}</Snackbar>
            {button}
          </View>
        )
    }
    return notification
  }
  */

  const H2 = myProps => {
    return (<Text style={[Styles.h2, myProps.style]}>{myProps.children}</Text>)
  }
  const H3 = myProps => {
    return (<Text style={[Styles.h3, myProps.style]}>{myProps.children}</Text>)
  }

  const ContinueButton = myProps => {
    let message = "Continue on to UNIT " + (props.unit + 2)
    if (props.unit === 10) {
      message = "CONGRATULATIONS!  GRADUATE"
    }
    return (<Button mode="contained" onPress={props.advanceUnit}>{message}</Button>)
  }

  return(
    <LinearGradient colors={[Color.greenish(1), Color.dark(0.8), Color.greenish(1)]} style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width}}>
      {state.questions.length > 0 &&
      <View style={{flex: 1, display:'flex', justifyContent:'center', alignItems:'center'}}>
        <QuizHeader style={{color: Color.primary(1)}} />
      </View>
      }
      {state.questions.length === 0 && state.snackSeverity === 'success' &&
        <View style={{flex:1, display:'flex', justifyContent:'center', alignItems:'center'}}>
          <ContinueButton />
        </View>
      }
      {state.snackSeverity === 'success' && 
        <View>
          <Snackbar style={{display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'green'}} visible={state.showSnack} onDismiss={()=>setState({showSnack: false})}>{state.message}</Snackbar>
        </View>
      }
      {state.snackSeverity === 'error' && 
        <View>
          <Snackbar style={{display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'red'}} visible={state.showSnack} onDismiss={()=>setState({showSnack: false})}>{state.message}</Snackbar>
        </View>
      }
      {state.questions.length > 0 &&
        <View style={{flex: 10, display:'flex', alignItems:'center'}}>
          <View style={{flex: 1}}>
            <H3 style={{paddingTop:20, color:Color.secondary(1)}}>{state.currentQuestion + 1} of {state.questions.length}</H3>
          </View>
          <View style={{flex:1, paddingLeft:10, paddingRight:10}}>
            <Question style={{color:Color.secondary(1), fontSize:24}}>
              {state.questions[state.currentQuestion].question}
            </Question>
          </View>
          <View style={{flex:2, paddingLeft:10, paddingRight:10}}>
          <Answers
            answers={state.questions[state.currentQuestion].answers}
            handleAnswer={handleAnswer}
            answer={typeof state.userAnswers[state.currentQuestion] !== 'undefined'?state.userAnswers[state.currentQuestion].answer:-1}
            style={{fontSize:20, color:Color.primary(1)}}
          />
          <Button mode="contained" onPress={advanceQuestion}>Next</Button>
          </View>
        </View>
      }
    </LinearGradient>
  )
}