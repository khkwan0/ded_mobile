import * as TYPES from '../actions/types'

const INITIAL_STATE = {
  user: {
  },
  logged_in: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.SET_USER:
      return {
        ...state,
        user: {...state.user, ...action.payload}
      }
    case TYPES.SET_LOGGEDIN_STATE:
      console.log(action.payload)
      return {
        ...state,
        logged_in: action.payload
      }
    default: return state
  }
}