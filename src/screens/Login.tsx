import { StyleSheet, View,TouchableOpacity,Image,ImageBackground,KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { TextInput, useTheme,Text,Button,Snackbar } from 'react-native-paper'
import {RootStackParamList} from '../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { trigger } from "react-native-haptic-feedback";
import { RootState } from '../store';
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { clearError } from '../reducers/authReducer'
import { loginUser,loadUser } from '../actions/auth'

type LoginProps = NativeStackScreenProps<RootStackParamList,'Login'>

export default function Login({navigation}: LoginProps) {
  const theme = useTheme()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [visible, setVisible] = React.useState(false);
  const [snackbarMsg,setSnackbarMsg] = React.useState('')

  const dispatch = useDispatch();
  
  const {isAuthenticated,isLoading,error} = useSelector((state: RootState) => state.auth)

  // const checkJWTToken = async() =>{
  //   await loadUser(dispatch)
  // }

  React.useEffect(()=>{
    // checkJWTToken()
    loadUser(dispatch)
  },[])

  React.useEffect(()=>{
    if(isAuthenticated)
      navigation.navigate("Main")
  },[isAuthenticated])

  React.useEffect(()=>{
    if(snackbarMsg !== ''){
      setVisible(true)
    }
    if(error !== ''){
      setSnackbarMsg(error)
      setVisible(true)
    }
  },[error,snackbarMsg])
  

  const handleLogin = async() =>{
    trigger('impactHeavy')
    if(!email || !password){
      setSnackbarMsg("Empty fields")
      return
    }
    loginUser(dispatch,email,password);
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
              onDismiss={()=>{setVisible(false);setSnackbarMsg("");dispatch(clearError())}}
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