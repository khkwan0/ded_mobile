import {Provider as PaperProvider} from 'react-native-paper'
import React from 'react'
import Main from './src/Main'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'
import reducers from './src/redux/reducers'

export default App = () => {

  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
  return(
    <Provider store={store}>
      <PaperProvider>
        <Main />
      </PaperProvider>
    </Provider>
  )
}