import { StyleSheet, View,TouchableOpacity,Image,ImageBackground,KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { TextInput, useTheme,Text,Button,Snackbar,ActivityIndicator } from 'react-native-paper'
import {RootStackParamList} from '../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { trigger } from "react-native-haptic-feedback";
import axios,{isAxiosError} from "axios";
import { RootState } from '../store';
import { useDispatch,useSelector } from 'react-redux'
import '../axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginRequest,loginSuccess,loginFailure, loadUserSuccess, loadUserRequest, loadUserFailure } from '../reducers/authReducer';
import Loader from '../components/Loader'

type LoginProps = NativeStackScreenProps<RootStackParamList,'Login'>

export default function Login({navigation}: LoginProps) {
  const theme = useTheme()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [visible, setVisible] = React.useState(false);
  const [snackbarMsg,setSnackbarMsg] = React.useState('')

  const dispatch = useDispatch();
  
  const {isAuthenticated,isLoading,error} = useSelector((state: RootState) => state.auth)

  const checkJWTToken = async() =>{
    try{
      const token = await AsyncStorage.getItem("token")
      if(!token)
        throw new Error()
      dispatch(loadUserRequest())
      const {data} = await axios.get("/auth/load")
      console.log(data)
      dispatch(loadUserSuccess())
    }catch(error){
      dispatch(loadUserFailure())
      setSnackbarMsg("JWT token missing/expired , please login")
      setVisible(!visible)
      // backend throws error if you send expired token with any request, so remove it
      AsyncStorage.removeItem("token")
    }
  }

  React.useEffect(()=>{
    checkJWTToken()
  },[])

  React.useEffect(()=>{
    if(isAuthenticated)
      navigation.navigate("Main")
  },[isAuthenticated])
  

  const handleLogin = async() =>{
    trigger('impactHeavy')
    if(!email || !password){
      setVisible(!visible)
      setSnackbarMsg("Empty fields")
      return
    }
    dispatch(loginRequest())
    try{
      const { data } = await axios.post(`/auth/login`, {email,password})
      AsyncStorage.setItem("token",data.token)
      dispatch(loginSuccess())
      
    }catch(error){
      if(isAxiosError(error)){
        if(error.response?.data.message){
          dispatch(loginFailure(error.response?.data.message))
          setSnackbarMsg(error.response?.data.message)
          setVisible(!visible)
        }
        else
          dispatch(loginFailure(error.message))
        console.log(error.message)
      }
    }
  }

  return (
    <ImageBackground
      source={require('../assets/background_dot.png')}
      resizeMode="repeat"
      style={[styles.background,{backgroundColor: theme.colors.surface,}]}
    >
      {
        isLoading ? <Loader loading={isLoading}/> : 
        <KeyboardAvoidingView style={styles.container} behavior="padding"> 
          <Image source={require('../assets/logo.png')} style={styles.image} />
            <Text variant='displaySmall' style={[styles.header,{color:theme.colors.primary}]}>Wealth Track</Text>
            
            <View style={styles.inputCont}>
                <TextInput
                  style={{backgroundColor: theme.colors.surface}}
                  selectionColor={theme.colors.primary}
                  underlineColor="transparent"
                  mode="outlined"
                  label="Email"
                  returnKeyType="next"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  autoCapitalize="none"
                  textContentType="emailAddress"
                  keyboardType="email-address"
              />
            </View>
            
            <View style={styles.inputCont}>
                <TextInput
                  style={{backgroundColor: theme.colors.surface}}
                  selectionColor={theme.colors.primary}
                  underlineColor="transparent"
                  mode="outlined"
                  label="Password"
                  returnKeyType="done"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry
                  
              />
            </View>

            <View style={styles.forgotPassword}>
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate('ResetPasswordScreen')
                }}
              >
                <Text variant='labelLarge' style={[styles.forgot,{color:theme.colors.secondary}]}>Forgot your password?</Text>
              </TouchableOpacity>
            </View>
            <Button style={styles.button} labelStyle={styles.btntext} mode='contained' onPress={handleLogin}>Login</Button>
            <View style={styles.row}>
              <Text variant='bodyLarge'>Don’t have an account? </Text>
              <TouchableOpacity onPress={() => {
                navigation.navigate('Register')
              }}>
                <Text variant='bodyLarge' style={[styles.link,{color:theme.colors.primary}]}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
      }
      {/* Snackbar */}
      <Snackbar
              visible={visible}
              onDismiss={()=>setVisible(false)}
              action={{
                label: 'Cancel',
                onPress: () => {
                  // Do something
                },
              }}>
              {snackbarMsg}
      </Snackbar>
  </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    paddingVertical: 12,
  },
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  btntext: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 26,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 8,
  },
  forgot: {
    // fontSize: 18,
  },
  link: {
    fontWeight: 'bold',
  },
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
  inputCont: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    
  },
})