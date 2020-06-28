import React from 'react'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import AsyncStorage from '@react-native-community/async-storage'
import {VerifyToken} from './redux/actions/authActions'
import {useDispatch} from 'react-redux'

export default Main = props => {

  const dispatch = useDispatch()

  const [state, doSetState] = React.useState({
    loggedIn: false,
    mounted: false
  })

  const setState = newState => doSetState({...state, ...newState})

  React.useEffect(() => {
    const _VerifyLogin = async () => {
      const res = await VerifyLogin()
      if (res) {
        setState({loggedIn: true, mounted: true})
      } else {
        setState({loggedIn: false, mounted: true})
      }
    }
    _VerifyLogin()
  }, [])

  const VerifyLogin = async () => {
    try {
      const res = await dispatch(VerifyToken())
      return res
    } catch(e) {
      console.log(e)
      return null
    }
  }

  const setLoggedIn = flag => {
    setState({loggedIn: flag})
  }

  if (state.mounted) {
    return(
      <>
        {state.loggedIn?<HomeScreen setLoggedIn={setLoggedIn} />:<LoginScreen setLoggedIn={setLoggedIn} />}
      </>
    )
  } else {
    return(<></>)
  }
}