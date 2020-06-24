import React from 'react'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'

export default Main = props => {
  const [state, doSetState] = React.useState({
    loggedIn: false
  })

  const setState = newState => doSetState({...state, ...newState})

  const setLoggedIn = flag => {
    setState({loggedIn: flag})
  }

  return(
    <>
      {state.loggedIn?<HomeScreen setLoggedIn={setLoggedIn} />:<LoginScreen setLoggedIn={setLoggedIn} />}
    </>
  )
}