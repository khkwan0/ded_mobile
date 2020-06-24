import * as TYPES from './types'
import net from '../../assets/net'
import config from '../../assets/config'
import {decode as atob, encode as btoa} from 'base-64'
import AsyncStorage from '@react-native-community/async-storage'

const localStorage = AsyncStorage

export const DoLogin= (email, password) => {
  return async dispatch => {
    try {
      const res = await net.PostToServer('/login', {email: email, password: password})
      if (res.err === 0) {
        const key = config.storage.key_prefix + 'user'
        const value = btoa(JSON.stringify({email: email, token: res.msg.token, uid: res.msg.uid}))
        await localStorage.setItem(key, value)
        dispatch({
          type: TYPES.SET_USER,
          payload:res.msg 
        })
        return res.msg
      } else {
        return null
      }
    } catch(e) {
      console.log(e)
      return null
    }
  }
}

export const DoLogout = () => {
  return async dispatch => {
    dispatch({
      type: TYPES.SET_USER,
      payload: {}
    })
    const key = config.storage.key_prefix + 'user'
    await localStorage.removeItem(key)
  }
}

export const SetLoggedIn = (flag) => {
  return dispatch => {
    try {
      dispatch({
        type: TYPES.SET_LOGGEDIN_STATE,
        payload: flag
      })
    } catch(e) {
      throw new Error(e)
    }
  }
}

export const SetUser = (user) => {
  return async dispatch => {
    console.log(user)
    if (typeof user.token !== 'undefined') {
      try {
        const res = await net.PostToServer('/user', {user:user})
        dispatch({
          type: TYPES.SET_USER,
          payload: user
        })
      } catch(e) {
        throw new Error(e)
      }
    }
  }
}

export const UpdateUserProgress = (progress, token) => {
  return async dispatch => {
    if (token) {
      try {
        const res = await net.PostToServer('/progress', {progress: progress, token: token})
        dispatch({
          type: TYPES.SET_USER,
          payload: {progress: progress}
        })
      } catch(e) {
        throw new Error(e)
      }
    }
  }
}

export const verifyToken = () => {
  return async dispatch => {
    try {
      const user = JSON.parse(atob(localStorage.getItem(config.storage.key_prefix + 'user')))
        console.log(user)
      if (typeof user.email !== 'undefined' && typeof user.token !== 'undefined') {
        const res = await net.PostToServer('/verify', {email: user.email, token: user.token})
        if (res.err === 0) {
          dispatch({
            type: TYPES.SET_USER,
            payload:res.msg 
          })
          return res.msg
        } else {
          return null
        }
      } else {
        return null 
      }
    } catch(e) {
      console.log(e)
      return null
    }
  }
}