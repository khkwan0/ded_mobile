import React from 'react'
import {View, Text, TextInput, Button, StyleSheet,ImageBackground, TouchableOpacity, Dimensions} from 'react-native'
import config from '../assets/config'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {useDispatch} from 'react-redux'
import {DoLogin} from '../redux/actions/authActions'
import Color from '../assets/styles/Color'
import LinearGradient from 'react-native-linear-gradient'

const styles = StyleSheet.create({
  password: {
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
  },
  title: {
    display:'flex',
    justifyContent: 'center',
    alignItems:'center',
  }
})


export default LoginScreen = props => {
  
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height

  const dispatch = useDispatch()

  const [state, doSetState] = React.useState({ 
    email: '',
    password: '',
    showRegister: false,
    showPassword: false
  })

  setState = newState => doSetState({...state, ...newState})

  const handleChangeText = (name, text) => {
    setState({[name]: text})
  }

  const handleLogin = async () => {
    try {
      const res = await dispatch(DoLogin(state.email, state.password))
      if (res) {
        props.setLoggedIn(true)
      }
    } catch(e) {
      console.log(e)
    }

  }

  return(
    <ImageBackground source={require('../assets/imgs/main_background.jpg')} style={{resizeMode:'cover', flex:1}}>
      <LinearGradient colors={[Color.primary(0.5), Color.dark(1), Color.greenish(1)]} style={{flex: 1}}>
        <View style={{flex: 1, justifyContent:'center'}}>
            <View style={[styles.title]}>
              <Text style={{color: Color.secondary(1), fontSize:50, fontWeight:'bold', letterSpacing: -5}}>{config.application.name.toUpperCase()}</Text>
            </View>
            <View style={{display:'flex', alignItems:'center', marginTop:'50%'}}>
              <View style={{width:'70%'}}>
                <View style={styles.password}>
                  <TextInput
                    style={{backgroundColor: Color.secondary(1), width:'90%', borderRadius: 5}}
                    placeholder="Email"
                    value={state.email}
                    autoCapitalize="none"
                    onChangeText={text => handleChangeText('email', text)}
                  />
                </View>
                <View style={[styles.password], {marginTop:10, flexDirection: 'row', alignItems:'center'}}>
                  <TextInput
                    style={{flexGrow: 1, backgroundColor:Color.secondary(0.5), width: '90%', borderRadius: 5}}
                    secureTextEntry={!state.showPassword}
                    placeholder="Password"
                    type="password"
                    autoCapitalize="none"
                    value={state.password}
                    onChangeText={text => handleChangeText('password', text)}
                  />
                  <TouchableOpacity onPress={() => setState({showPassword: !state.showPassword})} style={{marginLeft: 10}}>
                    {state.showPassword?<Icon name="eye-off" size={30} style={{color: Color.secondary(0.7)}} />:<Icon name="eye" size={30} style={{color:Color.secondary(0.7)}} />}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{marginTop: '10%'}}>
              <Button title="Login" onPress={()=>handleLogin()} />
            </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  )
}